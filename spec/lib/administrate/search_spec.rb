require "rails_helper"
require "administrate/field/belongs_to"
require "administrate/field/date_time"
require "administrate/field/email"
require "administrate/field/has_many"
require "administrate/field/has_one"
require "administrate/field/number"
require "administrate/field/string"
require "administrate/search"

class SearchableNumberField < Administrate::Field::Number
  def self.search_query(table_field, value)
    ["#{table_field} = ?", value.to_i]
  end
end

class MockDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: SearchableNumberField,
  }.freeze
end

class MockDashboardWithAssociation
  ATTRIBUTE_TYPES = {
    role: Administrate::Field::BelongsTo.with_options(
      searchable: true,
      searchable_field: "name",
    ),
    address: Administrate::Field::HasOne.with_options(
      searchable: true,
      searchable_field: "street",
    ),
  }.freeze
end

class MockNoSearchDashboard
  ATTRIBUTE_TYPES = {
    phone: Administrate::Field::Number,
  }.freeze
end

describe Administrate::Search do
  describe "#run" do
    it "returns all records when no search term" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          nil)
        expect(scoped_object).to receive(:all)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "returns all records when search is empty" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "   ")
        expect(scoped_object).to receive(:all)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "searches using LOWER + LIKE for all searchable fields" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "test")
        expected_query = [
          'LOWER(CAST("users"."name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("users"."email" AS CHAR(256))) LIKE ?'\
          " OR \"users\".\"phone\" = ?",
          "%test%",
          "%test%",
          0,
        ]
        expect(scoped_object).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "converts search term LOWER case for latin and cyrillic strings" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "Тест Test")
        expected_query = [
          'LOWER(CAST("users"."name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("users"."email" AS CHAR(256))) LIKE ?'\
          " OR \"users\".\"phone\" = ?",
          "%тест test%",
          "%тест test%",
          0,
        ]
        expect(scoped_object).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    context "when searching through associations" do
      let(:scoped_object) { double(:scoped_object) }

      let(:search) do
        Administrate::Search.new(
          scoped_object,
          MockDashboardWithAssociation,
          "Тест Test",
        )
      end

      let(:expected_query) do
        [
          'LOWER(CAST("roles"."name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("addresses"."street" AS CHAR(256))) LIKE ?',
          "%тест test%",
          "%тест test%",
        ]
      end

      it "joins with the correct association table to query" do
        allow(scoped_object).to receive(:where)

        expect(scoped_object).to receive(:joins).with(%i(role address)).
          and_return(scoped_object)

        search.run
      end

      it "builds the 'where' clause using the joined tables" do
        allow(scoped_object).to receive(:joins).with(%i(role address)).
          and_return(scoped_object)

        expect(scoped_object).to receive(:where).with(*expected_query)

        search.run
      end
    end
  end

  describe "#available?" do
    it "returns true when there are searchable fields" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          nil)

        expect(search).to be_available
      ensure
        remove_constants :User
      end
    end

    it "returns false when there are no searchable fields" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockNoSearchDashboard,
                                          nil)

        expect(search).to_not be_available
      ensure
        remove_constants :User
      end
    end
  end
end
