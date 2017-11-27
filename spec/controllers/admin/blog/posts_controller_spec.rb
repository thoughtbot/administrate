require "rails_helper"

describe Admin::Blog::PostsController, type: :controller do
  describe "GET index" do
    it "assigns all posts as @resources" do
      blog_post = create(:blog_post)

      get :index

      expect(assigns(:resources)).to eq([blog_post])
    end

    it "assigns the search term as @search_term" do
      get :index, search: "foo"

      expect(assigns(:search_term)).to eq("foo")
    end

    it "assigns the page object as @page" do
      get :index

      expect(assigns(:page)).to be_instance_of(Administrate::Page::Collection)
    end
  end

  describe "GET show" do
    it "assigns a page object as @page" do
      blog_post = create(:blog_post)

      get :show, id: blog_post.to_param

      page = assigns(:page)
      expect(page).to be_instance_of(Administrate::Page::Show)
      expect(page.resource).to eq(blog_post)
    end
  end

  describe "GET new" do
    it "assigns a new form page object as @page" do
      get :new

      expect(assigns(:page)).to be_instance_of(Administrate::Page::Form)
    end
  end

  describe "GET edit" do
    it "assigns the page object as @page" do
      blog_post = create(:blog_post)

      get :edit, id: blog_post.to_param

      page = assigns(:page)
      expect(page).to be_instance_of(Administrate::Page::Form)
      expect(page.resource).to eq(blog_post)
    end
  end

  describe "POST create" do
    context "with valid params" do
      it "creates a new blog post" do
        expect do
          post :create, blog_post: attributes_for(:blog_post)
        end.to change(Blog::Post, :count).by(1)
      end

      it "redirects to the created blog post" do
        post :create, blog_post: attributes_for(:blog_post)

        expect(response).to redirect_to([:admin, Blog::Post.last])
      end
    end

    context "with invalid params" do
      render_views

      it "assigns a form page object as @page" do
        invalid_attributes = { title: "" }

        post :create, blog_post: invalid_attributes

        expect(assigns(:page)).to be_instance_of(Administrate::Page::Form)
        expect(assigns(:page).resource).to be_a_new(Blog::Post)
      end

      it "re-renders the 'new' template" do
        invalid_attributes = { title: "" }

        post :create, blog_post: invalid_attributes

        expect(page.find("h1")).to have_content "New Blog/Post"
      end
    end
  end

  describe "PUT update" do
    context "with valid params" do
      it "updates the requested blog post" do
        blog_post = create(:blog_post, title: "old title")
        new_attributes = { title: "new title" }

        put :update, id: blog_post.to_param, blog_post: new_attributes

        blog_post.reload
        expect(blog_post.title).to eq "new title"
      end

      it "redirects to the blog post" do
        blog_post = create(:blog_post)
        valid_attributes = attributes_for(:blog_post)

        put :update, id: blog_post.to_param, blog_post: valid_attributes
        blog_post.reload

        expect(response).to redirect_to([:admin, blog_post])
      end
    end

    context "with invalid params" do
      render_views

      it "re-renders the 'edit' template" do
        blog_post = create(:blog_post)
        invalid_attributes = { title: "" }

        put :update, id: blog_post.to_param, blog_post: invalid_attributes

        expect(page.find("h1")).to have_content "Edit"
      end

      it "assigns a form page object as @page" do
        blog_post = create(:blog_post)
        invalid_attributes = { title: "" }

        put :update, id: blog_post.to_param, blog_post: invalid_attributes

        page = assigns(:page)
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to eq(blog_post)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested blog post" do
      blog_post = create(:blog_post)

      expect do
        delete :destroy, id: blog_post.to_param
      end.to change(Blog::Post, :count).by(-1)
    end

    it "redirects to the blog posts list" do
      blog_post = create(:blog_post)

      delete :destroy, id: blog_post.to_param

      expect(response).to redirect_to(admin_blog_posts_path)
    end
  end

  private

  def page
    Capybara::Node::Simple.new(response.body)
  end
end
