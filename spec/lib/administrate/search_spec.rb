require "rails_helper"
require "administrate/field/string"
require "administrate/field/email"
require "administrate/field/number"
require "administrate/search"

class MockDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: Administrate::Field::Number,
  }
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
          "LOWER(TEXT(\"users\".\"name\")) LIKE ?"\
          " OR LOWER(TEXT(\"users\".\"email\")) LIKE ?",
          "%test%",
          "%test%",
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
          "LOWER(TEXT(\"users\".\"name\")) LIKE ?"\
          " OR LOWER(TEXT(\"users\".\"email\")) LIKE ?",
          "%тест test%",
          "%тест test%",
        ]
        expect(scoped_object).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end
  end
end
