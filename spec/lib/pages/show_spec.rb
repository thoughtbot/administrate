require "pages/show"

describe Page::Show do
  describe "#page_title" do
    it "is the stringified resource" do
      customer = double(to_s: "Worf")
      page = Page::Show.new(CustomerDashboard.new, customer)

      expect(page.page_title).to eq("Worf")
    end
  end
end
