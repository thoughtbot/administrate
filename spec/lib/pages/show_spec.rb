require "administrate/page/show"

describe Administrate::Page::Show do
  describe "#page_title" do
    it "is the stringified resource" do
      customer = double(name: "Worf")
      page = Administrate::Page::Show.new(CustomerDashboard.new, customer)

      expect(page.page_title).to eq("Worf")
    end
  end
end
