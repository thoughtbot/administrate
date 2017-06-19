require "spec_helper"
require "support/constant_helpers"
require "administrate/field/string"
require "administrate/field/email"
require "administrate/field/number"
require "administrate/field/date_time"
require "administrate/search"

class MockUppercaseSearch
  def query(table_name, attr_name)
    "upper(#{table_name}.#{attr_name}) LIKE ?"
  end

  def search_term(term)
    "%#{term.upcase}%"
  end
end

class MockNumberSearch
  def query(table_name, attr_name)
    "#{table_name}.#{attr_name} >= ?"
  end

  def search_term(term)
    term.scan(/\d+/).first.to_i
  end
end

class MockDateTimeSearch
  def query(table_name, attr_name)
    "(#{table_name}.#{attr_name}::DATE BETWEEN "\
      "(date_trunc('day', now()::date - interval '? day')) "\
      "AND (date_trunc('day', now()::date + interval '? day')))"
  end

  def query(table_name, attr_name)
    "(#{table_name}.#{attr_name}::DATE BETWEEN days_ago(?) AND days_from(?))"
  end

  def search_term(term)
    [term.scan(/\d+/).first.to_i] * 2
  end
end

class MockDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: Administrate::Field::Number,
  }
end

class MockDashboardWithCustomSearches
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email.with_options(searchable: MockUppercaseSearch.new),
    age: Administrate::Field::Number.with_options(searchable: MockNumberSearch.new),
    a_date: Administrate::Field::DateTime.with_options(searchable: MockDateTimeSearch.new),
  }
end

describe Administrate::Search do
  describe "#run" do
    it "returns all records when no search term" do
      begin
        class User; end
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
        class User; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "   ")
        expect(User).to receive(:all)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "searches using lower() + LIKE for all searchable fields" do
      begin
        class User < ActiveRecord::Base; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "test")
        expected_query = [
          "lower(\"users\".\"name\") LIKE ?"\
          " OR lower(\"users\".\"email\") LIKE ?",
          "%test%",
          "%test%",
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "converts search term lower case for latin and cyrillic strings" do
      begin
        class User < ActiveRecord::Base; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "Тест Test")
        expected_query = [
          "lower(\"users\".\"name\") LIKE ?"\
          " OR lower(\"users\".\"email\") LIKE ?",
          "%тест test%",
          "%тест test%",
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    context 'with custom searchable definitions', custom_search: true do
      let(:date_search_lower) { "days_ago(?)" }
      let(:date_search_upper) { "days_from(?)" }

      it "searches default and custom search implementations" do
        begin
          class User < ActiveRecord::Base; end
          resolver = double(resource_class: User, dashboard_class: MockDashboardWithCustomSearches)
          search = Administrate::Search.new(resolver, "Test")
          expected_query = [
            "lower(\"users\".\"name\") LIKE ?"\
            " OR upper(\"users\".\"email\") LIKE ?"\
            " OR \"users\".\"age\" >= ?"\
            " OR (\"users\".\"a_date\"::DATE BETWEEN #{date_search_lower} AND #{date_search_upper})",
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

      it "converts search terms in default and custom searches" do
        begin
          class User < ActiveRecord::Base; end
          resolver = double(resource_class: User, dashboard_class: MockDashboardWithCustomSearches)
          search = Administrate::Search.new(resolver, "4 Бэта Test")
          expected_query = [
            "lower(\"users\".\"name\") LIKE ?"\
            " OR upper(\"users\".\"email\") LIKE ?"\
            " OR \"users\".\"age\" >= ?"\
            " OR (\"users\".\"a_date\"::DATE BETWEEN #{date_search_lower} AND #{date_search_upper})",
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
    end
  end
end
