require "active_support/core_ext/module"
require "administrate/page/collection"

describe Administrate::Page::Collection do
  let(:scopes_hash) do
    {
      :symbol_key => [ :active, :inactive, "active_since(1992)" ],
      "string_key" => [ "funny", :sad ]
    }
  end

  # #scope_groups creates the concept of "group of scopes" to manage scopes
  # always grouped reading Dashboard#collection_scopes (COLLECTION_SCOPES).
  describe "#scope_groups" do
    let(:scope) { :mellow }
    let(:array_of_scopes) { [ scope ] }

    describe "with no scopes defined" do
      let(:dashboard) { double(collection_scopes: []) }

      it "returns an empty array" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_groups).to eq([])
      end
    end

    describe "with an Array of scopes" do
      let(:dashboard) { double(collection_scopes: array_of_scopes) }

      it "returns an array with the :scopes symbol inside ([:scopes])" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_groups).to eq([:scopes])
      end
    end

    describe "with a Hash grouping the scopes" do
      let(:dashboard) { double(collection_scopes: scopes_hash) }

      it "returns the hash's keys" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_groups).to eq(scopes_hash.keys)
      end
    end
  end

  # #scope_names([group]) returns an array with *scope names*. A *scope name*
  # can be a symbol or a string that matchs with an scope defined in the
  # dashboard's model including the scope's argument when needed (e.g.
  # ["valid", "awesome_since(2004)"]).
  describe "#scope_names([group])" do
    let(:scope_symbol) { :mellow }
    let(:array_of_symbols) { [ scope_symbol ] }
    let(:scope_string) { "immature" }
    let(:array_of_strings) { [ scope_string ] }

    describe "with no scopes defined" do
      let(:dashboard) { double(collection_scopes: []) }

      it "returns an empty array (and ignores group passed as argument)" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_names).to eq([])
        expect(page.scope_names(:scopes)).to eq([])
      end
    end

    describe "with an Array of scope strings" do
      let(:dashboard) { double(collection_scopes: array_of_strings) }

      it "returns that array (and ignores group passed as argument)" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_names).to eq(array_of_strings)
        expect(page.scope_names(:scopes)).to eq(array_of_strings)
      end
    end

    describe "with an Array of scope symbols" do
      let(:dashboard) { double(collection_scopes: array_of_symbols) }

      it "returns that array stringified" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_names).to eq(array_of_symbols.map(&:to_s))
      end
    end

    describe "with a Hash grouping the scopes" do
      let(:dashboard) { double(collection_scopes: scopes_hash) }

      it "returns the stringified scopes of the group passed as param" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_names(:symbol_key)).to eq(scopes_hash[:symbol_key].map(&:to_s))
      end
    end
  end

  describe "#scope_group(scope)" do
    let(:scope) { :mellow }
    let(:scope_string) { "active_since(1992)" }
    let(:array_of_symbols) { [ scope ] }
    let(:array_of_strings) { [ scope_string ] }

    describe "with no scopes defined" do
      let(:dashboard) { double(collection_scopes: []) }

      it "returns nil" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(:anything)).to eq(nil)
      end
    end

    describe "with an Array of scope strings" do
      let(:dashboard) { double(collection_scopes: array_of_strings) }

      it "returns the default key (:scopes) if the scope is into that array" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(scope_string)).to eq(:scopes)
      end

      it "returns the default key even if the scope is passed as symbol" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(scope_string.to_sym)).to eq(:scopes)
      end

      it "returns nil if the scope is not defined in the array" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group("anything")).to eq(nil)
      end
    end

    describe "with an Array of scope symbols" do
      let(:dashboard) { double(collection_scopes: array_of_symbols) }

      it "returns the default key (:scopes) if the scope is into that array" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(scope)).to eq(:scopes)
      end

      it "returns the default key even if the scope is passed as string" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(scope.to_s)).to eq(:scopes)
      end

      it "returns nil if the scope is not defined in the array" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(:anything)).to eq(nil)
      end
    end

    describe "with a Hash grouping the scopes" do
      let(:dashboard) { double(collection_scopes: scopes_hash) }

      it "returns nil if the scope is not defined in the hash" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(:nonexistent)).to eq(nil)
      end

      it "returns the key of the array that contains the scope" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group(:inactive)).to eq(:symbol_key)
      end

      it "returns the key if the param is a string while defined as a symbol" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group("inactive")).to eq(:symbol_key)
      end

      it "returns the key if the param is a symbol while defined as a string" do
        page = Administrate::Page::Collection.new(dashboard, nil)
        expect(page.scope_group("funny")).to eq("string_key")
      end
    end
  end
end
