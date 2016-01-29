require "spec_helper"
require "support/constant_helpers"
require "administrate/page/collection"
require "administrate/search"

describe Administrate::Page::Collection do
  # Constants defined in spec_helper.rb
  let(:scopes_array) { DashboardWithAnArrayOfScopes::COLLECTION_SCOPES }
  let(:scopes_hash) { DashboardWithAHashOfScopes::COLLECTION_SCOPES }
  let(:dashboard_wo_scopes) { MockDashboard.new }
  let(:dashboard_w_scopes_array) { DashboardWithAnArrayOfScopes.new }
  let(:dashboard_w_scopes_hash) { DashboardWithAHashOfScopes.new }

  # #scope_groups creates the concept of "group of scopes" to manage scopes
  # always grouped reading Dashboard#collection_scopes (COLLECTION_SCOPES).
  describe "#scope_groups" do
    describe "with no scopes defined" do
      it "returns an empty array" do
        page = Administrate::Page::Collection.new(dashboard_wo_scopes)
        expect(page.scope_groups).to eq([])
      end
    end

    describe "with an Array of scopes" do
      it "returns an array with the :scopes symbol inside ([:scopes])" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_array)
        expect(page.scope_groups).to eq([:scopes])
      end
    end

    describe "with a Hash grouping the scopes" do
      it "returns the hash's keys" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_hash)
        expect(page.scope_groups).to eq(scopes_hash.keys)
      end
    end
  end

  # #scope_names([group]) returns an array with *scope names*. A *scope name*
  # can be a symbol or a string that matchs with an scope defined in the
  # dashboard's model including the scope's argument when needed (e.g.
  # ["valid", "awesome_since(2004)"]).
  describe "#scope_names([group])" do
    describe "with no scopes defined" do
      it "returns an empty array (and ignores group passed as argument)" do
        page = Administrate::Page::Collection.new(dashboard_wo_scopes)
        expect(page.scope_names).to eq([])
        expect(page.scope_names(:scopes)).to eq([])
      end
    end

    describe "with an Array of scopes" do
      let(:array_of_strings) { scopes_array.map(&:to_s) }

      it "returns that array (and ignores group passed as argument)" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_array)
        expect(page.scope_names).to eq(array_of_strings)
        expect(page.scope_names(:scopes)).to eq(array_of_strings)
      end
    end

    describe "with a Hash grouping the scopes" do
      let(:scopes_strigified_without_wildcarded) do
        scopes_hash[:status].map(&:to_s).reject { |s| s[-2..-1] == ":*" }
      end

      it "returns the stringified scopes of the group rejecting wildcarded" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_hash)
        expect(page.scope_names(:status)).
          to eq(scopes_strigified_without_wildcarded)
      end
    end
  end

  # #scope_group(scope) receives an scope declared in the dashboard's
  # collection_scopes and returns the group of the array in which is found.
  describe "#scope_group(scope)" do
    describe "with no scopes defined" do
      it "returns nil" do
        page = Administrate::Page::Collection.new(dashboard_wo_scopes)
        expect(page.scope_group(:anything)).to eq(nil)
      end
    end

    describe "with an Array of scopes returns the default key (:scopes)" do
      let(:string_scope) { scopes_array.detect{|s| s.is_a? String } }
      let(:symbol_scope) { scopes_array.detect{|s| s.is_a? Symbol } }

      it "if the scope is into that array" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_array)
        expect(page.scope_group(string_scope)).to eq(:scopes)
      end

      it "if the param is a symbol and the scope is defined with a string" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_array)
        expect(page.scope_group(string_scope)).to eq(:scopes)
      end

      it "if the param is a string and the scope is defined with a symbol" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_array)
        expect(page.scope_group(symbol_scope)).to eq(:scopes)
      end

      it "returns nil if the scope is not defined in the array" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_array)
        expect(page.scope_group("nonexistent")).to eq(nil)
      end
    end
  end

  # #scoped_groups returns an array with the COLLECTION_SCOPES' keys (i.e.
  # group name) which array contains a scope that is used in the current
  # search.
  describe "#scoped_groups" do
    let(:search) { Administrate::Search.new(nil, "searched words") }

    describe "with no scopes defined" do
      it "returns an empty array" do
        page = Administrate::Page::Collection.new(dashboard_wo_scopes,
                                                  search: search)
        expect(page.scoped_groups).to eq([])
      end
    end

    describe "with an Array of scopes" do
      it "returns an empty array if the query has no scopes" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_array,
                                                  search: search)
        expect(page.scoped_groups).to eq([])
      end

      it "returns an array with the default key (:scopes) if the query has a valid scope" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:old")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_array,
                                                    search: search_with_scope)
          expect(page.scoped_groups).to eq([:scopes])
        ensure
          remove_constants :User
        end
      end

      # same as above, but with "new" instead of "old" which is not valid
      it "returns an empty array if that array doesn't include the scope" do
        begin
          class User
            def self.new; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAHashOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:new")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_array,
                                                    search: search_with_scope)
          expect(page.scoped_groups).to eq([])
        ensure
          remove_constants :User
        end
      end
    end

    describe "with a Hash of scopes" do
      it "returns an empty array if the query has no scopes" do
        page = Administrate::Page::Collection.new(dashboard_w_scopes_hash,
                                                  search: search)
        expect(page.scoped_groups).to eq([])
      end

      it "returns an array with the key of the array that includes the scope" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAHashOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:old")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_hash,
                                                    search: search_with_scope)
          expect(page.scoped_groups).to eq([:other])
        ensure
          remove_constants :User
        end
      end

      # same as above, but with "new" instead of "old" which is not valid
      it "returns an empty array if the scope isn't included in any array" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAHashOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:new")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_hash,
                                                    search: search_with_scope)
          expect(page.scoped_groups).to eq([])
        ensure
          remove_constants :User
        end
      end
    end
  end

  # #current_scope_of(group) receives a key (*group*) of the
  # collection_scopes hash (i.e. COLLECTION_SCOPES) and returns the scope
  # used in the current search that is into its array, or nil if none.
  describe "#current_scope_of(group)" do
    let(:search) { Administrate::Search.new(nil, "searched words") }

    describe "with no scopes defined" do
      it "returns nil" do
        page = Administrate::Page::Collection.new(dashboard_wo_scopes,
                                                  search: search)
        expect(page.current_scope_of(:scopes)).to eq(nil)
      end
    end

    describe "with an Array of scopes" do
      # scopes will be grouped with the :scopes key in Search#collection_scopes
      it "returns the scope if is into the specified group (:scopes)" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:old")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_array,
                                                    search: search_with_scope)
          expect(page.current_scope_of(:scopes)).to eq("old")
        ensure
          remove_constants :User
        end
      end

      it "returns nil if the scope isn't into the specified group (:scopes)" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:new")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_array,
                                                    search: search_with_scope)
          expect(page.current_scope_of(:scopes)).to eq(nil)
        ensure
          remove_constants :User
        end
      end
    end

    describe "with a Hash of scopes" do
      it "returns the scope if is into the specified group" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:old")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_hash,
                                                    search: search_with_scope)
          # the :old scope is defined in the :other group (see spec_helper.rb).
          expect(page.current_scope_of(:other)).to eq("old")
        ensure
          remove_constants :User
        end
      end

      it "returns nil if is into another group" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search_with_scope = Administrate::Search.new(resolver, "scope:old")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_hash,
                                                    search: search_with_scope)
          # the :old scope is defined in the :other group (see spec_helper.rb).
          expect(page.current_scope_of(:status)).to eq(nil)
        ensure
          remove_constants :User
        end
      end
    end
  end

  # #term_using_scope(scope) receives an scope and adds it to the current
  # search avoiding duplication and collision with another scope of the
  # same group (assuming that together will give no results).
  describe "#term_using_scope(scope)" do
    describe "with no scopes defined" do
      it "returns the term with the scope" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search = Administrate::Search.new(resolver, "")

          page = Administrate::Page::Collection.new(dashboard_wo_scopes,
                                                    search: search)
          expect(page.term_using_scope("old")).to eq("scope:old")
        ensure
          remove_constants :User
        end
      end

      it "doesn't duplicate the scope if its already" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search = Administrate::Search.new(resolver, "scope:old")

          page = Administrate::Page::Collection.new(dashboard_wo_scopes,
                                                    search: search)
          expect(page.term_using_scope("old")).to eq("scope:old")
        ensure
          remove_constants :User
        end
      end
    end

    describe "with an array of scopes defined" do
      it "replaces the current scope with the new one" do
        begin
          class User
            def self.old; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAnArrayOfScopes)
          search = Administrate::Search.new(resolver, "scope:old")

          page = Administrate::Page::Collection.new(dashboard_w_scopes_array,
                                                    search: search)
          expect(page.term_using_scope("active")).to eq("scope:active")
        ensure
          remove_constants :User
        end
      end
    end

    describe "with a hash of scopes" do
      it "replaces the current scope with the new one" do
        begin
          class User
            def self.active; end

            def self.inactive; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAHashOfScopes)
          search = Administrate::Search.new(resolver, "scope:inactive")
          page = Administrate::Page::Collection.new(dashboard_w_scopes_hash,
                                                    search: search)
          expect(page.term_using_scope("active")).to eq("scope:active")
        ensure
          remove_constants :User
        end
      end

      it "adds the scope if is included in other group" do
        begin
          class User
            def self.old; end

            def self.active; end
          end
          resolver = double(resource_class: User,
                            dashboard_class: DashboardWithAHashOfScopes)
          search = Administrate::Search.new(resolver, "scope:old")
          page = Administrate::Page::Collection.new(dashboard_w_scopes_hash,
                                                    search: search)
          expect(page.term_using_scope("active")).to eq("scope:old scope:active")
        ensure
          remove_constants :User
        end
      end
    end
  end
end
