require "pages/show"

describe Page::Show do
  describe "#page_title" do
    it "is the stringified resource" do
      customer = double(to_s: "Worf")
      page = Page::Show.new(CustomerDashboard.new, customer)

      expect(page.page_title).to eq("Worf")
    end
  end

  describe "#edit_path" do
    it "returns the edit path for the displayed resource" do
      customer = double(to_param: "1")
      page = Page::Show.new(CustomerDashboard.new, customer)

      edit_path = page.edit_path

      expect(edit_path).to eq("/customers/#{customer.to_param}/edit")
    end
  end
end
