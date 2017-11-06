require "rails_helper"
require "support/constant_helpers"
require "administrate/field/string"
require "administrate/field/email"
require "administrate/field/number"
require "administrate/field/date_time"
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

    it "searches using lower() + LIKE for all searchable fields" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "test")
        expected_query = [
          "lower(\"users\".\"name\") LIKE ?"\
          " OR lower(\"users\".\"email\") LIKE ?"\
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

    it "converts search term lower case for latin and cyrillic strings" do
      begin
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "Тест Test")
        expected_query = [
          "lower(\"users\".\"name\") LIKE ?"\
          " OR lower(\"users\".\"email\") LIKE ?"\
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
