require "rails_helper"

describe Administrate::Page::Collection do
  describe "#selected_attribute_names" do
    it "returns the associated dashboard fields by default" do
      page = Administrate::Page::Collection.new(CustomerDashboard.new)
      expect(page.selected_attribute_names)
        .to eq(CustomerDashboard::COLLECTION_ATTRIBUTES)
    end

    it "allows those fields to be overriden by providing an option" do
      shown_fields = %i[name email country]
      page = Administrate::Page::Collection.new(
        CustomerDashboard.new,
        show: shown_fields
      )
      expect(page.selected_attribute_names).to eq(shown_fields)
    end
  end

  describe "#attribute_types" do
    it "respects your decision about which fields to display" do
      page = Administrate::Page::Collection.new(
        CustomerDashboard.new,
        show: %i[name]
      )
      expect(page.attribute_types).to eq(name: Administrate::Field::String)
    end
  end

  describe "#attributes_for" do
    it "respects your decision about which fields to display" do
      page = Administrate::Page::Collection.new(
        CustomerDashboard.new,
        show: %i[name]
      )

      attribute_types = page.attributes_for(Customer.new).map(&:class)

      expect(attribute_types).to eq([Administrate::Field::String])
    end
  end
end
