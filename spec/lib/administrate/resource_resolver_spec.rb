require "spec_helper"
require "administrate/resource_resolver"

describe Administrate::ResourceResolver do
  # Fixture classes
  class UserDashboard
  end

  class User
  end

  module Blog
    class Post
    end

    class PostDashboard
    end
  end

  describe "#resource_class" do
    it "handles global-namepsace models" do
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.resource_class).to eq(User)
    end

    it "handles namespaced models" do
      resolver = Administrate::ResourceResolver.new("admin/blog/posts")

      expect(resolver.resource_class).to eq(Blog::Post)
    end
  end

  describe "#dashboard_class" do
    it "handles global-namepsace models" do
      resolver = Administrate::ResourceResolver.new("admin/users")

      expect(resolver.dashboard_class).to eq(UserDashboard)
    end

    it "handles namespaced models" do
      resolver = Administrate::ResourceResolver.new("admin/blog/posts")

      expect(resolver.dashboard_class).to eq(Blog::PostDashboard)
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
