require "spec_helper"
require "support/constant_helpers"
require "administrate/search"

describe Administrate::Search do
  describe "#new(resolver, query)" do
    let(:symbol) { :amazing }
    let(:between_whitespaces) { " \t\v #{symbol}\f \r\n" }

    it "accepts the query as a symbol" do
      search = Administrate::Search.new(nil, symbol)
      expect(search.term).to eq(symbol.to_s)
    end

    it "removes whitespaces from the query" do
      search = Administrate::Search.new(nil, between_whitespaces)
      expect(search.term).to eq(symbol.to_s)
    end
  end

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

      describe "with COLLECTION_SCOPES defined as an array" do
        let(:resolver) do
          double(resource_class: User,
                 dashboard_class: DashboardWithAnArrayOfScopes)
        end

        it "ignores the scope if it isn't included in COLLECTION_SCOPES" do
          begin
            class User
              def self.closed; end
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
              def self.active; end
            end
            search = Administrate::Search.new(resolver, "scope:active")
            expect(search.scope).to eq("active")
          ensure
            remove_constants :User
          end
        end

        # The following should match with what is declared by COLLECTION_SCOPES
        # up within the DashboardWithAnArrayOfScopes class.
        let(:scope) { "with_argument" }
        let(:argument) { "3" }
        let(:scope_with_argument) { "#{scope}(#{argument})" }
        it "returns the scope even if its key has an argument" do
          begin
            class User
              def self.with_argument(argument); argument; end
            end
            search = Administrate::Search.new(resolver,
                                              "scope:#{scope_with_argument}")
            expect(search.scope).to eq(scope)
            expect(search.scopes).to eq([scope])
            expect(search.arguments).to eq([argument])
          ensure
            remove_constants :User
          end
        end
      end

      # Folloing are the same previous specs using a Hash instead of an array.
      describe "with COLLECTION_SCOPES defined as a hash of arrays w/ scopes" do
        let(:resolver) do
          double(resource_class: User,
                 dashboard_class: DashboardWithAHashOfScopes)
        end

        it "ignores the scope if it isn't included in COLLECTION_SCOPES keys" do
          begin
            class User
              def self.closed; end
            end
            search = Administrate::Search.new(resolver, "scope:closed")
            expect(search.scope).to eq(nil)
          ensure
            remove_constants :User
          end
        end

        it "returns the scope if it's included into COLLECION_SCOPES keys" do
          begin
            class User
              def self.active; end
            end
            search = Administrate::Search.new(resolver, "scope:active")
            expect(search.scope).to eq("active")
          ensure
            remove_constants :User
          end
        end

        # The following should match with what is declared by COLLECTION_SCOPES
        # up within the DashboardWithAHashOfScopes class.
        let(:scope) { "with_argument" }
        let(:argument) { "3" }
        let(:scope_with_argument) { "#{scope}(#{argument})" }
        it "returns the scope even if its key has an argument" do
          begin
            class User
              def self.with_argument(argument); argument; end
            end
            search = Administrate::Search.new(resolver,
                                              "scope:#{scope_with_argument}")
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
            def self.name_starts_with(_letter); end
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
        let(:scope_with_argument) { "#{scope}(#{argument})" }
        let(:query) { "scope:#{scope_with_argument} #{word}" }

        it "returns [scope], #arguments [argument] and #words [word]" do
          begin
            class User
              def self.name_starts_with(_letter); end
            end
            search = Administrate::Search.new(resolver, query)
            expect(search.words).to eq([word])
            expect(search.scopes).to eq([scope])
            expect(search.arguments).to eq([argument])
            expect(search.scopes_with_arguments).to eq([scope_with_argument])
          ensure
            remove_constants :User
          end
        end
      end
    end
  end
end
