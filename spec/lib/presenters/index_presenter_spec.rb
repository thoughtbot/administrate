require "rails_helper"
require "presenters/index_presenter"

describe IndexPresenter, type: :controller do
  describe "#edit_path" do
    it "returns the edit path for a resource" do
      customer = create(:customer)
      presenter = IndexPresenter.new(CustomerDashboard.new, request)

      edit_path = presenter.edit_path(customer)

      expect(edit_path).to eq("/customers/#{customer.id}/edit")
    end
  end

  describe "#new_path" do
    it "returns the new path for a model" do
      presenter = IndexPresenter.new(CustomerDashboard.new, request)

      expect(presenter.new_path).to eq("/customers/new")
    end
  end
end
