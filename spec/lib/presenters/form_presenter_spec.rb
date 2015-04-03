require "rails_helper"
require "presenters/form_presenter"

RSpec.describe FormPresenter do
  describe "#page_title" do
    it "is the value of the resource's key attribute" do
      customer = build(:customer, name: "Worf")
      presenter = FormPresenter.new(CustomerDashboard.new, customer)

      expect(presenter.page_title).to eq("Worf")
    end
  end

  describe "#attribute_names" do
    it "returns attributes defined by the dashboard" do
      customer = build(:customer, name: "Worf")
      presenter = FormPresenter.new(CustomerDashboard.new, customer)

      expect(presenter.attribute_names).to eq([
        :name,
        :email,
      ])
    end
  end

  describe "#index_path" do
    it "returns the index path" do
      customer = Customer.new
      presenter = FormPresenter.new(CustomerDashboard.new, customer)

      expect(presenter.index_path).to eq("/customers")
    end
  end
end
