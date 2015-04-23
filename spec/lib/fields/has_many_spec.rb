require "spec_helper"
require "fields/has_many"

describe Field::HasMany do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      items = double
      field = Field::HasMany.new(:items, items, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/#{page}/has_many")
    end
  end

  describe "#associated_table" do
    it "returns an index page for the dashboard of the associated attribute" do
      orders = []
      field = Field::HasMany.new(:orders, orders, :show)

      page = field.associated_table

      expect(page).to be_instance_of(Page::Table)
    end
  end
end
