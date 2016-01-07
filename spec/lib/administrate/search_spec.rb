require "spec_helper"
require "support/constant_helpers"
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
        class User
          def self.connection
            ActiveRecord::Base.connection
          end
        end
        resolver = double(resource_class: User, dashboard_class: MockDashboard)
        search = Administrate::Search.new(resolver, "test")
        quoted_name = quote_attr(:name)
        quoted_email = quote_attr(:email)
        expected_query = [
          "lower(#{quoted_name}) LIKE ? OR lower(#{quoted_email}) LIKE ?",
          "%test%",
          "%test%",
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "searches in all fields defined by SEARCH_ATTRIBUTES" do
      begin
        class User
          def self.connection
            ActiveRecord::Base.connection
          end
        end

        class MockDashboardWithSearchAttributes
          SEARCH_ATTRIBUTES = [:foo, :bar]
        end

        resolver = double(resource_class: User,
                          dashboard_class: MockDashboardWithSearchAttributes)
        search = Administrate::Search.new(resolver, "test")
        quoted_foo = quote_attr(:foo)
        quoted_bar = quote_attr(:bar)
        expected_query = [
          "lower(#{quoted_foo}) LIKE ? OR lower(#{quoted_bar}) LIKE ?",
          "%test%",
          "%test%",
        ]
        expect(User).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User, :MockDashboardWithSearchAttributes
      end
    end

    def quote_attr(attr)
      ActiveRecord::Base.connection.quote_column_name(attr)
    end
  end
end
