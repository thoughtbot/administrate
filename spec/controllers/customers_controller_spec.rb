require 'rails_helper'

RSpec.describe CustomersController, type: :controller do

  describe "GET index" do
    it "assigns all customers as @resources" do
      customer = create(:customer)

      get :index

      expect(assigns(:resources)).to eq([customer])
    end
  end

  describe "GET show" do
    it "assigns the requested customer as @customer" do
      customer = create(:customer)

      get :show, {id: customer.to_param}

      expect(assigns(:customer)).to eq(customer)
    end
  end

  describe "GET new" do
    it "assigns a new customer as @customer" do
      get :new

      expect(assigns(:customer)).to be_a_new(Customer)
    end
  end

  describe "GET edit" do
    it "assigns the requested customer as @customer" do
      customer = create(:customer)

      get :edit, {id: customer.to_param}

      expect(assigns(:customer)).to eq(customer)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "creates a new Customer" do
        expect {
          post :create, {customer: attributes_for(:customer)}
        }.to change(Customer, :count).by(1)
      end

      it "assigns a newly created customer as @customer" do
        post :create, {customer: attributes_for(:customer)}

        expect(assigns(:customer)).to be_a(Customer)
        expect(assigns(:customer)).to be_persisted
      end

      it "redirects to the created customer" do
        post :create, {customer: attributes_for(:customer)}

        expect(response).to redirect_to(Customer.last)
      end
    end

    describe "with invalid params" do
      it "assigns a newly created but unsaved customer as @customer" do
        invalid_attributes = { name: '' }

        post :create, {customer: invalid_attributes}

        expect(assigns(:customer)).to be_a_new(Customer)
      end

      it "re-renders the 'new' template" do
        invalid_attributes = { name: '' }

        post :create, {customer: invalid_attributes}

        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested customer" do
        customer = create(:customer)
        new_name = "new name"
        new_attributes = { name: new_name }

        put :update, {id: customer.to_param, customer: new_attributes}

        customer.reload
        expect(customer.name).to eq new_name
      end

      it "assigns the requested customer as @customer" do
        customer = create(:customer)
        valid_attributes = attributes_for(:customer)

        put :update, {id: customer.to_param, customer: valid_attributes}

        expect(assigns(:customer)).to eq(customer)
      end

      it "redirects to the customer" do
        customer = create(:customer)
        valid_attributes = attributes_for(:customer)

        put :update, {id: customer.to_param, customer: valid_attributes}

        expect(response).to redirect_to(customer)
      end
    end

    describe "with invalid params" do
      it "assigns the customer as @customer" do
        customer = create(:customer)
        invalid_attributes = { name: '' }

        put :update, {id: customer.to_param, customer: invalid_attributes}

        expect(assigns(:customer)).to eq(customer)
      end

      it "re-renders the 'edit' template" do
        customer = create(:customer)
        invalid_attributes = { name: '' }

        put :update, {id: customer.to_param, customer: invalid_attributes}

        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE destroy" do
    it "destroys the requested customer" do
      customer = create(:customer)

      expect {
        delete :destroy, {id: customer.to_param}
      }.to change(Customer, :count).by(-1)
    end

    it "redirects to the customers list" do
      customer = create(:customer)

      delete :destroy, {id: customer.to_param}

      expect(response).to redirect_to(customers_url)
    end
  end
end
