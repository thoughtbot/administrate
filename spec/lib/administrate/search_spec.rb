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
        scope = double(all: nil)
        resolver = double(resource_class: User, dashboard_class: MockDashboard,
                          resource_scope: scope)
        search = Administrate::Search.new(resolver, nil)
        expect(scope).to receive(:all)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "returns all records when search is empty" do
      begin
        class User; end
        scope = double(all: nil)
        resolver = double(resource_class: User, dashboard_class: MockDashboard,
                          resource_scope: scope)
        search = Administrate::Search.new(resolver, "   ")
        expect(scope).to receive(:all)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "searches using lower() + LIKE for all searchable fields" do
      begin
        class User < ActiveRecord::Base; end
        scope = double(where: nil)
        resolver = double(resource_class: User, dashboard_class: MockDashboard,
                          resource_scope: scope)
        search = Administrate::Search.new(resolver, "test")
        expected_query = [
          "lower(\"users\".\"name\") LIKE ?"\
          " OR lower(\"users\".\"email\") LIKE ?",
          "%test%",
          "%test%",
        ]
        expect(scope).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "converts search term lower case for latin and cyrillic strings" do
      begin
        class User < ActiveRecord::Base; end
        scope = double(where: nil)
        resolver = double(resource_class: User, dashboard_class: MockDashboard,
                          resource_scope: scope)
        search = Administrate::Search.new(resolver, "Тест Test")
        expected_query = [
          "lower(\"users\".\"name\") LIKE ?"\
          " OR lower(\"users\".\"email\") LIKE ?",
          "%тест test%",
          "%тест test%",
        ]
        expect(scope).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end
    end

    it "respects Dashboard#resource_scope when defined" do
      begin
        class MockScope
        end
        class User < ActiveRecord::Base
          scope :my_scope, -> { MockScope }
        end
        class UserDashboard < Administrate::BaseDashboard
          def resource_scope
            User.my_scope 
          end
        end
        resolver = Administrate::ResourceResolver.new("admin/users")
        search = Administrate::Search.new(resolver, nil)
        expect(MockScope).to receive(:all)
        search.run
      ensure
        remove_constants :User, :UserDashboard, :MockScope
      end
    end
  end

end
