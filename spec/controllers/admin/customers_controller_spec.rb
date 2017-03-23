require "rails_helper"

describe Admin::CustomersController, type: :controller do
  describe "GET index" do
    it "passes all customers to the view" do
      customer = create(:customer)

      locals = capture_view_locals { get :index }
      expect(locals[:resources]).to eq([customer])
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

    it "shows the search bar" do
      customer = create(:customer)

      locals = capture_view_locals { get :index }
      expect(locals[:show_search_bar]).to be_truthy
    end
  end

  describe "GET show" do
    it "passes a page object to the view" do
      customer = create(:customer)

      locals = capture_view_locals do
        get :show, id: customer.to_param
      end

      page = locals[:page]
      expect(page).to be_instance_of(Administrate::Page::Show)
      expect(page.resource).to eq(customer)
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
      customer = create(:customer)

      locals = capture_view_locals do
        get :edit, id: customer.to_param
      end

      page = locals[:page]
      expect(page).to be_instance_of(Administrate::Page::Form)
      expect(page.resource).to eq(customer)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Customer" do
        expect {
          post :create, customer: attributes_for(:customer)
        }.to change(Customer, :count).by(1)
      end

      it "redirects to the created customer" do
        post :create, customer: attributes_for(:customer)

        expect(response).to redirect_to([:admin, Customer.last])
      end
    end

    describe "with invalid params" do
      it "passes a form page object to the view" do
        invalid_attributes = { name: "" }

        locals = capture_view_locals do
          post :create, customer: invalid_attributes
        end

        page = locals[:page]
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to be_a_new(Customer)
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested customer" do
        customer = create(:customer)
        new_name = "new name"
        new_attributes = { name: new_name }

        put :update, id: customer.to_param, customer: new_attributes

        customer.reload
        expect(customer.name).to eq new_name
      end

      it "redirects to the customer" do
        customer = create(:customer)
        valid_attributes = attributes_for(:customer)

        put :update, id: customer.to_param, customer: valid_attributes

        expect(response).to redirect_to([:admin, customer])
      end
    end

    describe "with invalid params" do
      it "passes a form page object to the view" do
        customer = create(:customer)
        invalid_attributes = { name: "" }

        locals = capture_view_locals do
          put :update, id: customer.to_param, customer: invalid_attributes
        end

        page = locals[:page]
        expect(page).to be_instance_of(Administrate::Page::Form)
        expect(page.resource).to eq(customer)
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested customer" do
      customer = create(:customer)

      expect do
        delete :destroy, id: customer.to_param
      end.to change(Customer, :count).by(-1)
    end

    it "redirects to the customers list" do
      customer = create(:customer)

      delete :destroy, id: customer.to_param

      expect(response).to redirect_to(admin_customers_url)
    end
  end
end
