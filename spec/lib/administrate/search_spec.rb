require "spec_helper"
require "support/constant_helpers"
require "administrate/field/string"
require "administrate/field/email"
require "administrate/field/number"
require "administrate/field/date_time"
require "administrate/search"
require "administrate/default_search"

class MockUppercaseSearch < Administrate::DefaultSearch
  def build_query(table_name, attr_name)
    "upper(#{table_name}.#{attr_name}) LIKE ?"
  end

  def build_search_value(term)
    "%#{term.upcase}%"
  end
end

class MockNumberSearch < Administrate::DefaultSearch
  def build_query(table_name, attr_name)
    "#{table_name}.#{attr_name} >= ?"
  end

  def build_search_value(term)
    term.scan(/\d+/).first.to_i
  end
end

class MockDateTimeSearch < Administrate::DefaultSearch
  def query(table_name, attr_name)
    "(#{table_name}.#{attr_name}::DATE BETWEEN days_ago(?) AND days_from(?))"
  end

  def search_term
    term = if !@term.is_a?(Array) || @term.size < 2
             [@term, @term].flatten
           else
             @term
           end
    term.map { |e| e.scan(/\d+/).first.to_i }
  end
end

class MockDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: Administrate::Field::Number,
  }.freeze
end

class MockDashboardWithCustomSearches
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email.with_options(
      searchable: MockUppercaseSearch,
    ),
    age: Administrate::Field::Number.with_options(searchable: MockNumberSearch),
    a_date: Administrate::Field::DateTime.with_options(
      searchable: MockDateTimeSearch,
    ),
  }.freeze
end

describe Administrate::Search, searching: true do
  describe "#run" do
    it "returns all records when no search term" do
      begin
        class User < ActiveRecord::Base; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, nil)
        expect(User).to receive(:all)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "returns all records when search is empty" do
      begin
        class User < ActiveRecord::Base; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "   ")
        expect(User).to receive(:all)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "searches using LOWER() + LIKE for all searchable fields" do
      begin
        class User < ActiveRecord::Base; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "test")
        expected_query = [
          "LOWER(\"users\".\"name\") LIKE ?"\
          " OR LOWER(\"users\".\"email\") LIKE ?",
          "%test%",
          "%test%",
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "converts search term LOWER case for latin and cyrillic strings" do
      begin
        class User < ActiveRecord::Base; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "Тест Test")
        expected_query = [
          "LOWER(\"users\".\"name\") LIKE ?"\
          " OR LOWER(\"users\".\"email\") LIKE ?",
          "%тест test%",
          "%тест test%",
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    context "with custom searchable definitions", custom_search: true do
      let(:date_search_lower) { "days_ago(?)" }
      let(:date_search_upper) { "days_from(?)" }

      it "searches default and custom search implementations" do
        begin
          class User < ActiveRecord::Base; end
          resolver = double(
            resource_class: User,
            dashboard_class: MockDashboardWithCustomSearches,
          )
          search = Administrate::Search.new(resolver, "Test")
          expected_query = [
            "LOWER(\"users\".\"name\") LIKE ?"\
            " OR upper(\"users\".\"email\") LIKE ?"\
            " OR \"users\".\"age\" >= ?"\
            " OR (\"users\".\"a_date\"::DATE BETWEEN #{date_search_lower}"\
            " AND #{date_search_upper})",
            "%test%",
            "%TEST%",
            0,
            0,
            0,
          ]
          expect(User).to receive(:where).with(*expected_query)

          search.run
        ensure
          remove_constants :User
        end
      end

      it "converts multibyte search terms in default and custom searches" do
        begin
          class User < ActiveRecord::Base; end
          resolver = double(
            resource_class: User,
            dashboard_class: MockDashboardWithCustomSearches,
          )
          search = Administrate::Search.new(resolver, "4 Бэта Test")
          expected_query = [
            "LOWER(\"users\".\"name\") LIKE ?"\
            " OR upper(\"users\".\"email\") LIKE ?"\
            " OR \"users\".\"age\" >= ?"\
            " OR (\"users\".\"a_date\"::DATE BETWEEN #{date_search_lower}"\
            " AND #{date_search_upper})",
            "%4 бэта test%",
            "%4 БЭТА TEST%",
            4,
            4,
            4,
          ]
          expect(User).to receive(:where).with(*expected_query)

          search.run
        ensure
          remove_constants :User
        end
      end

      context "labeled searches" do
        it "searches for terms by their label" do
          begin
            class User < ActiveRecord::Base; end
            resolver = double(
              resource_class: User,
              dashboard_class: MockDashboardWithCustomSearches,
            )
            search = Administrate::Search.new(
              resolver,
              age: "4",
              email: "Бэта Test",
            )
            expected_query = [
              "upper(\"users\".\"email\") LIKE ?"\
              " OR \"users\".\"age\" >= ?",
              "%БЭТА TEST%",
              4,
            ]
            expect(User).to receive(:where).with(*expected_query)

            search.run
          ensure
            remove_constants :User
          end
        end

        it "overrides the default OR clause for labeled searches" do
          begin
            class User < ActiveRecord::Base; end
            resolver = double(
              resource_class: User,
              dashboard_class: MockDashboardWithCustomSearches,
            )
            search = Administrate::Search.new(
              resolver,
              op: "and",
              age: "4",
              email: "Бэта Test",
            )
            expected_query = [
              "upper(\"users\".\"email\") LIKE ?"\
              " AND \"users\".\"age\" >= ?",
              "%БЭТА TEST%",
              4,
            ]
            expect(User).to receive(:where).with(*expected_query)

            search.run
          ensure
            remove_constants :User
          end
        end

        it "supports the special 'all' label" do
          begin
            class User < ActiveRecord::Base; end
            resolver = double(
              resource_class: User,
              dashboard_class: MockDashboardWithCustomSearches,
            )
            search = Administrate::Search.new(resolver, all: "Бэта Test")
            expected_query = [
              "LOWER(\"users\".\"name\") LIKE ?"\
              " OR upper(\"users\".\"email\") LIKE ?"\
              " OR \"users\".\"age\" >= ?"\
              " OR (\"users\".\"a_date\"::DATE BETWEEN #{date_search_lower}"\
              " AND #{date_search_upper})",
              "%бэта test%",
              "%БЭТА TEST%",
              0,
              0,
              0,
            ]
            expect(User).to receive(:where).with(*expected_query)

            search.run
          ensure
            remove_constants :User
          end
        end

        it "uses a specific label instead of using the special 'all' label" do
          begin
            class User < ActiveRecord::Base; end
            resolver = double(
              resource_class: User,
              dashboard_class: MockDashboardWithCustomSearches,
            )
            search = Administrate::Search.new(
              resolver,
              all: "Бэта Test",
              age: "19",
            )
            expected_query = [
              "LOWER(\"users\".\"name\") LIKE ?"\
              " OR upper(\"users\".\"email\") LIKE ?"\
              " OR \"users\".\"age\" >= ?"\
              " OR (\"users\".\"a_date\"::DATE BETWEEN #{date_search_lower}"\
              " AND #{date_search_upper})",
              "%бэта test%",
              "%БЭТА TEST%",
              19,
              0,
              0,
            ]
            expect(User).to receive(:where).with(*expected_query)

            search.run
          ensure
            remove_constants :User
          end
        end

        it "supports multiple values per label" do
          begin
            class User < ActiveRecord::Base; end
            resolver = double(
              resource_class: User,
              dashboard_class: MockDashboardWithCustomSearches,
            )
            search = Administrate::Search.new(resolver, age: %w{3 7 11 13})
            expected_query = [
              "\"users\".\"age\" >= ?"\
              " OR \"users\".\"age\" >= ?"\
              " OR \"users\".\"age\" >= ?"\
              " OR \"users\".\"age\" >= ?",
              3,
              7,
              11,
              13,
            ]
            expect(User).to receive(:where).with(*expected_query)

            search.run
          ensure
            remove_constants :User
          end
        end

        it "handles complex cases" do
          begin
            class User < ActiveRecord::Base; end
            resolver = double(
              resource_class: User,
              dashboard_class: MockDashboardWithCustomSearches,
            )
            search = Administrate::Search.new(
              resolver,
              a_date: %w{10 20},
              all: "Бэта Test",
              age: %w{23 19},
            )
            expected_query = [
              "LOWER(\"users\".\"name\") LIKE ?"\
              " OR upper(\"users\".\"email\") LIKE ?"\
              " OR \"users\".\"age\" >= ?"\
              " OR \"users\".\"age\" >= ?"\
              " OR (\"users\".\"a_date\"::DATE BETWEEN #{date_search_lower}"\
              " AND #{date_search_upper})",
              "%бэта test%",
              "%БЭТА TEST%",
              23,
              19,
              10,
              20,
            ]
            expect(User).to receive(:where).with(*expected_query)

            search.run
          ensure
            remove_constants :User
          end
        end
      end
    end
  end
end
