require "rails_helper"
require "presenters/show_presenter"

RSpec.describe ShowPresenter do
  describe "#page_title" do
    it "is the resource's key attribute" do
      customer = build(:customer, name: "Worf")
      presenter = ShowPresenter.new(CustomerDashboard.new, customer)

      expect(presenter.page_title).to eq("Worf")
    end
  end

  describe "#attributes" do
    it "returns attributes defined by the dashboard" do
      customer = build(:customer, name: "Worf")
      allow(customer).to receive(:lifetime_value).and_return(10)
      presenter = ShowPresenter.new(CustomerDashboard.new, customer)

      expect(presenter.attributes).to eq(
        email: customer.email,
        lifetime_value: customer.lifetime_value,
      )
    end
  end

  describe "#render_attribute" do
    it "renders the attribute" do
      email = "worf@enterprise.uss"
      customer = build(:customer, email: email)
      presenter = ShowPresenter.new(CustomerDashboard.new, customer)

      rendered = presenter.render_attribute(:email)

      expect(rendered).to eq(email)
    end
  end

  describe "#edit_path" do
    it "returns the edit path for the displayed resource" do
      customer = create(:customer)
      presenter = ShowPresenter.new(CustomerDashboard.new, customer)

      edit_path = presenter.edit_path

      expect(edit_path).to eq("/customers/#{customer.id}/edit")
    end
  end
end
