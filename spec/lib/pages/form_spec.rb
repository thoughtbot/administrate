require "administrate/page/form"

describe Administrate::Page::Form do
  describe "#page_title" do
    it "is the value of the resource's key attribute" do
      customer = double(name: "Worf")
      page = Administrate::Page::Form.new(CustomerDashboard.new, customer)

      expect(page.page_title).to eq("Worf")
    end
  end
end
