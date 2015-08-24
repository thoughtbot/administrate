require "spec_helper"
require "administrate/fields/has_many"

describe Administrate::Field::HasMany do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      items = double
      field = Administrate::Field::HasMany.new(:items, items, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/has_many/#{page}")
    end
  end

  describe "#associated_table" do
    it "returns an index page for the dashboard of the associated attribute" do
      orders = []
      field = Administrate::Field::HasMany.new(:orders, orders, :show)

      page = field.associated_table

      expect(page).to be_instance_of(Administrate::Page::Table)
    end
  end

  describe "class_name option" do
    it "determines what dashboard is used to present the association" do
      FooDashboard = Class.new
      dashboard_double = double(table_attributes: [])
      allow(FooDashboard).to receive(:new).and_return(dashboard_double)

      association = Administrate::Field::HasMany.with_options(class_name: "Foo")
      field = association.new(:customers, [], :show)
      table = field.associated_table
      attributes = table.attribute_names

      expect(dashboard_double).to have_received(:table_attributes)
      expect(attributes).to eq([])
    end
  end
end
