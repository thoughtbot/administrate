require "support/constant_helpers"
require "active_support/core_ext/module"
require "administrate/search"
require "administrate/resource_resolver"

describe Administrate::Search do
  describe "#scope" do
    let(:controller_path) { "admin/users" }
    let(:resource_resolver) do
      Administrate::ResourceResolver.new(controller_path)
    end
    let(:scope) { "active" }

    before do
      class User; end
    end

    after do
      remove_constants :User
    end

    describe "the query is only the scope" do
      let(:query) { "#{scope}:" }

      it "returns nil if the model does not respond to the possible scope" do
        search = Administrate::Search.new(resource_resolver, query)
        expect(search.scope).to eq(nil)
      end

      it "returns the scope if the model responds to it" do
        class User
          def self.active; end
        end

        search = Administrate::Search.new(resource_resolver, query)
        expect(search.scope).to eq(scope)
      end

      it "returns nil if the name of the scope looks suspicious" do
        class User
          def self.destroy_all; end
        end

        Administrate::Search::BLACKLISTED_WORDS.each do |word|
          search = Administrate::Search.new(resource_resolver, "#{word}_all:")
          expect(search.scope).to eq(nil)
        end
      end

      it "returns nil if the name of the scope ends with an exclamation mark" do
        class User
          def self.bang!; end
        end

        search = Administrate::Search.new(resource_resolver, "bang!:")
        expect(search.scope).to eq(nil)
      end
    end

    describe "the query is the scope followed by the term" do
      let(:term) { "foobar" }
      let(:query) { "#{scope}: #{term}" }

      it "returns the scope and the term" do
        class User
          def self.active; end
        end
        search = Administrate::Search.new(resource_resolver, query)
        expect(search.scope).to eq(scope)
        expect(search.term).to eq(term)
      end
    end
  end
end
