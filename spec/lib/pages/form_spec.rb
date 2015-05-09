require "pages/form"

describe Page::Form do
  describe "#page_title" do
    it "is the value of the resource's key attribute" do
      customer = double(to_s: "Worf")
      page = Page::Form.new(CustomerDashboard.new, customer)

      expect(page.page_title).to eq("Worf")
    end
  end

  describe "#index_path" do
    it "returns the index path" do
      customer = Customer.new
      page = Page::Form.new(CustomerDashboard.new, customer)

      expect(page.index_path).to eq("/customers")
    end
  end
end
