require "spec_helper"
require "active_support/core_ext/string/inflections"
require "support/constant_helpers"
require "administrate/resource_resolver"

describe Administrate::ResourceResolver do
  describe "#dashboard_class" do
    it "handles global-namepsace models" do
      begin
        class UserDashboard; end
        resolver = Administrate::ResourceResolver.new("admin/users")

        expect(resolver.dashboard_class).to eq(UserDashboard)
      ensure
        remove_constants :UserDashboard
      end
    end

    it "handles namespaced models" do
      begin
        module Blog; class PostDashboard; end; end
        resolver = Administrate::ResourceResolver.new("admin/blog/posts")

        expect(resolver.dashboard_class).to eq(Blog::PostDashboard)
      ensure
        remove_constants :Blog
      end
    end
  end

  describe "#namespace" do
    it "returns the top-level namespace" do
      resolver = Administrate::ResourceResolver.new("foobar/user")

      expect(resolver.namespace).to eq("foobar")
    end
  end

  describe "#resource_class" do
    it "handles global-namepsace models" do
      begin
        class User; end
        resolver = Administrate::ResourceResolver.new("admin/users")

        expect(resolver.resource_class).to eq(User)
      ensure
        remove_constants :User
      end
    end

    it "handles namespaced models" do
      begin
        module Blog; class Post; end; end
        resolver = Administrate::ResourceResolver.new("admin/blog/posts")

        expect(resolver.resource_class).to eq(Blog::Post)
      ensure
        remove_constants :Blog
      end
    end
  end

  describe '#resource_scope' do
    it 'defaults to model default scope when no override defined' do
      begin
        class Post
          def self.default_scoped
            'default scope'
          end
        end
        class PostDashboard; end
        resolver = Administrate::ResourceResolver.new("admin/posts")
        expect(resolver.resource_scope).to eq('default scope')
      ensure
        remove_constants :PostDashboard, :Post
      end
    end

    it 'uses defined scope when present' do
      begin
        class Post; end
        class PostDashboard
          def resource_scope
            'a resource scope'
          end
        end
        resolver = Administrate::ResourceResolver.new("admin/posts")
        expect(resolver.resource_scope).to eq('a resource scope')
      ensure
        remove_constants :PostDashboard, :Post
      end
    end
  end

  describe "#resource_title" do
    it "handles global-namepsace models" do
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.resource_title).to eq("User")
    end

    it "handles namespaced models" do
      resolver = Administrate::ResourceResolver.new("admin/blog/posts")

      expect(resolver.resource_title).to eq("Blog Post")
    end
  end

  describe "#resource_name" do
    it "handles global-namepsace models" do
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.resource_name).to eq(:user)
    end

    it "handles namespaced models" do
      resolver = Administrate::ResourceResolver.new("admin/blog/posts")

      expect(resolver.resource_name).to eq(:blog__post)
    end
  end
end
