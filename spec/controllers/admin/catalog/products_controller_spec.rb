require "rails_helper"

describe Admin::Catalog::ProductsController, type: :controller do
  describe "GET index" do
    it "passes all products to the view" do
      product = create(:product)

      locals = capture_view_locals { get :index }
      expect(locals[:resources]).to eq([product])
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
      product = create(:product)

      locals = capture_view_locals do
        get :show, id: product.to_param
      end

      page = locals[:page]
      expect(page).to be_instance_of(Administrate::Page::Show)
      expect(page.resource).to eq(product)
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
      product = create(:product)

      locals = capture_view_locals do
        get :edit, id: product.to_param
      end

      page = locals[:page]
      expect(page).to be_instance_of(Administrate::Page::Form)
      expect(page.resource).to eq(product)
    end
  end

  describe "POST create" do
    context "with valid params" do
      it "creates a new Product" do
        expect {
          post :create, catalog_product: attributes_for(:product)
        }.to change(Catalog::Product, :count).by(1)
      end

      it "redirects to the created product" do
        post :create, catalog_product: attributes_for(:product)

        expect(response).to redirect_to([:admin, Catalog::Product.last])
      end
    end

    context "with invalid params" do
      it "passes a form page object to the view" do
        invalid_attributes = { name: "" }

        locals = capture_view_locals do
          post :create, catalog_product: invalid_attributes
        end

        page = locals[:page]
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to be_a_new(Catalog::Product)
      end

      it "re-renders the 'new' template" do
        invalid_attributes = { name: "" }

        post :create, catalog_product: invalid_attributes

        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT update" do
    context "with valid params" do
      it "updates the requested product" do
        product = create(:product)
        new_name = "new name"
        new_attributes = { name: new_name }

        put :update, id: product.to_param, catalog_product: new_attributes

        product.reload
        expect(product.name).to eq new_name
      end

      it "redirects to the product" do
        product = create(:product)
        valid_attributes = attributes_for(:product)

        put :update, id: product.to_param, catalog_product: valid_attributes
        product.reload

        expect(response).to redirect_to([:admin, product])
      end
    end

    context "with invalid params" do
      it "re-renders the 'edit' template" do
        product = create(:product)
        invalid_attributes = { name: "" }

        put :update, id: product.to_param, catalog_product: invalid_attributes

        expect(response).to render_template("edit")
      end

      it "passes a form page object to the view" do
        product = create(:product)
        invalid_attributes = { name: "" }

        locals = capture_view_locals do
          put :update, id: product.to_param, catalog_product: invalid_attributes
        end

        page = locals[:page]
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to eq(product)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested product" do
      product = create(:product)

      expect do
        delete :destroy, id: product.to_param
      end.to change(Catalog::Product, :count).by(-1)
    end

    it "redirects to the product list" do
      product = create(:product)

      delete :destroy, id: product.to_param

      expect(response).to redirect_to(admin_catalog_products_path)
    end
  end
end
