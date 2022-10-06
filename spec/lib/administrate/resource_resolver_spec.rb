require "rails_helper"

describe Administrate::ResourceResolver do
  describe "#dashboard_class" do
    it "handles global-namepsace models" do
      class UserDashboard; end
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.dashboard_class).to eq(UserDashboard)
    ensure
      remove_constants :UserDashboard
    end

    it "handles namespaced models" do
      module Library; class BookDashboard; end; end
      resolver = Administrate::ResourceResolver.new("admin/library/books")

      expect(resolver.dashboard_class).to eq(Library::BookDashboard)
    ensure
      remove_constants :Library
    end

    it "handles plural namespaced models" do
      module Libraries; class BookDashboard; end; end
      resolver = Administrate::ResourceResolver.new("admin/libraries/books")

      expect(resolver.dashboard_class).to eq(Libraries::BookDashboard)
    ensure
      remove_constants :Libraries
    end
  end

  describe "#namespace" do
    it "returns the top-level namespace" do
      resolver = Administrate::ResourceResolver.new("foobar/user")

      expect(resolver.namespace).to eq(:foobar)
    end
  end

  describe "#resource_class" do
    it "handles global-namepsace models" do
      class User; end
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.resource_class).to eq(User)
    ensure
      remove_constants :User
    end

    it "handles namespaced models" do
      module Library; class Book; end; end
      resolver = Administrate::ResourceResolver.new("admin/library/books")

      expect(resolver.resource_class).to eq(Library::Book)
    ensure
      remove_constants :Library
    end
  end

  describe "#resource_title" do
    it "handles global-namepsace models" do
      class User < ApplicationRecord; self.abstract_class = true; end
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.resource_title).to eq("User")
    ensure
      remove_constants :User
    end

    it "handles namespaced models" do
      module Library
        class Book < ApplicationRecord; self.abstract_class = true; end
      end
      resolver = Administrate::ResourceResolver.new("admin/library/books")

      expect(resolver.resource_title).to eq("Book")

      translations = {
        activerecord: {
          models: {
            "library/book": "Library Book",
          },
        },
      }

      with_translations(:en, translations) do
        expect(resolver.resource_title).to eq("Library Book")
      end
    ensure
      remove_constants :Library
    end
  end

  describe "#resource_name" do
    it "handles global-namepsace models" do
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.resource_name).to eq(:user)
    end

    it "handles namespaced models" do
      resolver = Administrate::ResourceResolver.new("admin/library/books")

      expect(resolver.resource_name).to eq(:library__book)
    end
  end
end
