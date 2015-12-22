require "spec_helper"
require "support/constant_helpers"
require "administrate/fields/string"
require "administrate/fields/email"
require "administrate/fields/number"
require "administrate/search"

class MockDashboard
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: Administrate::Field::Number,
  }
end

class DashboardWithDefinedScopes
  ATTRIBUTE_TYPES = {
    name: Administrate::Field::String
  }

  COLLECTION_SCOPES = [:active]
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

  describe "#scope" do
    let(:scope) { "active" }
    let(:resolver) do
      double(resource_class: User, dashboard_class: MockDashboard)
    end

    describe "the query is only the scope" do
      let(:query) { "#{scope}:" }

      it "returns nil if the model does not respond to the possible scope" do
        begin
          class User; end
          search = Administrate::Search.new(resolver, query)
          expect(search.scope).to eq(nil)
        ensure
          remove_constants :User
        end
      end

      it "returns the scope if the model responds to it" do
        begin
          class User
            def self.active; end
          end
          search = Administrate::Search.new(resolver, query)
          expect(search.scope).to eq(scope)
        ensure
          remove_constants :User
        end
      end

      it "returns nil if the name of the scope looks suspicious" do
        begin
          class User
            def self.destroy_all; end
          end

          Administrate::Search::BLACKLISTED_WORDS.each do |word|
            search = Administrate::Search.new(resolver, "#{word}_all:")
            expect(search.scope).to eq(nil)
          end
        ensure
          remove_constants :User
        end
      end

      it "returns nil if the name of the scope ends with an exclamation mark" do
        begin
          class User
            def self.bang!; end
          end

          search = Administrate::Search.new(resolver, "bang!:")
          expect(search.scope).to eq(nil)
        ensure
          remove_constants :User
        end
      end

      describe "with COLLECTION_SCOPES defined" do
        let(:resolver) do
          double(resource_class: User, dashboard_class: DashboardWithDefinedScopes)
        end

        it "ignores the scope if it isn't included" do
          begin
            class User
              def self.closed; end
              def self.active; end
            end

            search = Administrate::Search.new(resolver, 'closed:')
            expect(search.scope).to eq(nil)
          ensure
            remove_constants :User
          end
        end

        it "returns the scope if it is included into COLLECION_SCOPES" do
          begin
            class User
              def self.closed; end
              def self.active; end
            end

            search = Administrate::Search.new(resolver, 'active:')
            expect(search.scope).to eq("active")
          ensure
            remove_constants :User
          end
        end
      end
    end

    describe "the query is the scope followed by the term" do
      let(:term) { "foobar" }
      let(:query) { "#{scope}: #{term}" }

      it "returns the scope and the term" do
        begin
          class User
            def self.active; end
          end

          search = Administrate::Search.new(resolver, query)
          expect(search.scope).to eq(scope)
          expect(search.term).to eq(term)
        ensure
          remove_constants :User
        end
      end
    end
  end
end
