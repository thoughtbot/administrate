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
    name: Administrate::Field::String,
  }

  COLLECTION_SCOPES = [:active, "with_argument(3)"]
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

  describe "#scopes (and #scope as #scopes.first)" do
    let(:scope) { "active" }
    let(:resolver) do
      double(resource_class: User, dashboard_class: MockDashboard)
    end

    describe "the query is one scope" do
      let(:query) { "scope:#{scope}" }

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

      it "ignores the case of the 'scope:' prefix" do
        begin
          class User
            def self.active; end
          end
          search = Administrate::Search.new(resolver, "ScoPE:#{scope}")
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
            search = Administrate::Search.new(resolver, "scope:#{word}_all")
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

          search = Administrate::Search.new(resolver, "scope:bang!")
          expect(search.scope).to eq(nil)
        ensure
          remove_constants :User
        end
      end

      describe "with COLLECTION_SCOPES defined" do
        let(:resolver) do
          double(resource_class: User,
                 dashboard_class: DashboardWithDefinedScopes)
        end

        it "ignores the scope if it isn't included in COLLECTION_SCOPES" do
          begin
            class User
              def self.closed; end
              def self.active; end
            end
            search = Administrate::Search.new(resolver, "scope:closed")
            expect(search.scope).to eq(nil)
          ensure
            remove_constants :User
          end
        end

        it "returns the scope if it's included into COLLECION_SCOPES" do
          begin
            class User
              def self.closed; end
              def self.active; end
            end
            search = Administrate::Search.new(resolver, "scope:active")
            expect(search.scope).to eq("active")
          ensure
            remove_constants :User
          end
        end

        # The following should match with what is declared by COLLECTION_SCOPES
        # up within the DashboardWithDefinedScopes class.
        let(:scope) { "with_argument" }
        let(:argument) { "3" }
        let(:scope_with_argument) { "#{scope}(#{argument})" }
        it "returns the scope even if its key in COLLECTION_SCOPES has an argument" do
          begin
            class User
              def self.with_argument(argument); argument; end
            end
            search = Administrate::Search.new(resolver, "scope:#{scope_with_argument}")
            expect(search.scope).to eq(scope)
            expect(search.scopes).to eq([scope])
            expect(search.arguments).to eq([argument])
          ensure
            remove_constants :User
          end
        end
      end
    end

    describe "the query is a word and a scope" do
      let(:word) { "foobar" }

      it "returns the scope and #words the word" do
        begin
          class User
            def self.active; end
          end

          search = Administrate::Search.new(resolver, "scope:#{scope} #{word}")
          expect(search.scope).to eq(scope)
          expect(search.words).to eq([word])
        ensure
          remove_constants :User
        end
      end

      it "ignores the order" do
        begin
          class User
            def self.active; end
          end

          search = Administrate::Search.new(resolver, "#{word} scope:#{scope}")
          expect(search.scope).to eq(scope)
          expect(search.words).to eq([word])
        ensure
          remove_constants :User
        end
      end
    end

    describe "the query is a word and two scopes" do
      let(:word) { "foobar" }
      let(:other_scope) { "subscribed" }

      describe "in that order" do
        let(:query) { "#{word} scope:#{scope} scope:#{other_scope}" }

        it "returns the scopes and #words the word" do
          begin
            class User
              def self.active; end
              def self.subscribed; end
            end
 
            search = Administrate::Search.new(resolver, query)
            expect(search.scopes).to eq([scope, other_scope])
            expect(search.words).to eq([word])
          ensure
            remove_constants :User
          end
        end
      end

      describe "with the word between the two scopes" do
        let(:query) { "scope:#{scope} #{word} scope:#{other_scope}" }

        it "returns the scopes and #words the word" do
          begin
            class User
              def self.active; end
              def self.subscribed; end
            end
 
            search = Administrate::Search.new(resolver, query)
            expect(search.scopes).to eq([scope, other_scope])
            expect(search.words).to eq([word])
          ensure
            remove_constants :User
          end
        end
      end
    end

    describe "the query is one scope with an argument" do
      let(:scope) { "name_starts_with" }
      let(:argument) { "A" }
      let(:query) { "scope:#{scope}(#{argument})" }

      it "returns the [scope] and #arguments the [argument]" do
        begin
          class User
            def self.name_starts_with; end
          end
          search = Administrate::Search.new(resolver, query)
          expect(search.scopes).to eq([scope])
          expect(search.arguments).to eq([argument])
        ensure
          remove_constants :User
        end
      end

      describe "plus a word" do
        let(:word) { "foobar" }
        let(:query) { "scope:#{scope}(#{argument}) #{word}" }

        it "returns [scope], #arguments [argument] and #words [word]" do
          begin
            class User
              def self.name_starts_with; end
            end
            search = Administrate::Search.new(resolver, query)
            expect(search.words).to eq([word])
            expect(search.scopes).to eq([scope])
            expect(search.arguments).to eq([argument])
          ensure
            remove_constants :User
          end
        end
      end
    end
  end
end
