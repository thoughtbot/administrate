require "rails_helper"

describe Admin::Blog::PostsController, type: :controller do
  describe "GET index" do
    it "passes all posts to the view" do
      blog_post = create(:blog_post)

      locals = capture_view_locals { get :index }
      expect(locals[:resources]).to eq([blog_post])
    end

    it "passes the search term to the view" do
      locals = capture_view_locals do
        get :index, search: "foo"
      end

      expect(locals[:search_term]).to eq("foo")
    end

    it "passes the page object to the view" do
      locals = capture_view_locals { get :index }

      expect(locals[:page]).to be_instance_of(Administrate::Page::Collection)
    end
  end

  describe "GET show" do
    it "passes a page object to the view" do
      blog_post = create(:blog_post)

      locals = capture_view_locals do
        get :show, id: blog_post.to_param
      end

      page = locals[:page]
      expect(page).to be_instance_of(Administrate::Page::Show)
      expect(page.resource).to eq(blog_post)
    end
  end

  describe "GET new" do
    it "passes a new form page object to the view" do
      locals = capture_view_locals { get :new }

      expect(locals[:page]).to be_instance_of(Administrate::Page::Form)
    end
  end

  describe "GET edit" do
    it "passes the page object to the view" do
      blog_post = create(:blog_post)

      locals = capture_view_locals do
        get :edit, id: blog_post.to_param
      end

      page = locals[:page]
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

      it "passes a form page object to the view" do
        invalid_attributes = { title: "" }

        locals = capture_view_locals do
          post :create, blog_post: invalid_attributes
        end

        page = locals[:page]
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to be_a_new(Blog::Post)
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

      it "passes a form page object to the view" do
        blog_post = create(:blog_post)
        invalid_attributes = { title: "" }

        locals = capture_view_locals do
          put :update, id: blog_post.to_param, blog_post: invalid_attributes
        end

        page = locals[:page]
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
