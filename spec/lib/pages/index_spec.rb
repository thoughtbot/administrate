require "pages/index"

describe Page::Index do
  describe "#edit_path" do
    it "returns the edit path for a resource" do
      customer = double(to_param: "1")
      page = Page::Index.new(CustomerDashboard.new)

      edit_path = page.edit_path(customer)

      expect(edit_path).to eq("/customers/#{customer.to_param}/edit")
    end
  end

  describe "#new_path" do
    it "returns the new path for a model" do
      page = Page::Index.new(CustomerDashboard.new)

      expect(page.new_path).to eq("/customers/new")
    end
  end
end
