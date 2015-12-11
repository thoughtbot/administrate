require "spec_helper"
require "support/constant_helpers"
require "administrate/fields/string"
require "administrate/fields/email"
require "administrate/fields/number"
require "administrate/fields/enum"
require "administrate/search"

class MockDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: Administrate::Field::Number,
    status: Administrate::Field::Enum.with_options(
      enum: {
        "pending" => 0, "confirmed" => 1
      }),
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
        class User; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "confirmed")
        expected_query = [
          "lower(name) LIKE ? OR lower(email) LIKE ? OR status = ?",
          "%confirmed%",
          "%confirmed%",
          1,
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "omits enum fields from search if no matching enum value" do
      begin
        class User; end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "test")
        expected_query = [
          "lower(name) LIKE ? OR lower(email) LIKE ?",
          "%test%",
          "%test%",
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end
  end
end
