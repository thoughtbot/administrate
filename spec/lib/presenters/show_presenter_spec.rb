require "rails_helper"
require "presenters/show_presenter"

RSpec.describe ShowPresenter do
  describe "#page_title" do
    it "is the stringified resource" do
      customer = build(:customer)
      allow(customer).to receive(:to_s).and_return("Worf")
      presenter = ShowPresenter.new(CustomerDashboard.new, customer)

      expect(presenter.page_title).to eq("Worf")
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
