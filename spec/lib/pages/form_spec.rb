require "rails_helper"

describe Administrate::Page::Form do
  describe "#page_title" do
    it "is the value of the resource's key attribute" do
      customer = double(name: "Worf")
      page = Administrate::Page::Form.new(CustomerDashboard.new, customer)

      expect(page.page_title).to eq("Worf")
    end
  end

  describe "#attributes" do
    let(:line_item) { build(:line_item) }
    let(:page) { described_class.new(LineItemDashboard.new, line_item) }
    let(:attributes) do
      page.attributes(action).transform_values do |attributes|
        attributes.map(&:attribute)
      end
    end

    context "for a new action" do
      let(:action) { "new" }

      it "returns the attributes from FORM_ATTRIBUTES_NEW" do
        expect(attributes).to match(
          "" => %i[
            order
            product
          ],
        )
      end
    end

    context "for a create action" do
      let(:action) { "create" }

      it "returns the attributes from FORM_ATTRIBUTES_NEW" do
        expect(attributes).to match(
          "" => %i[
            order
            product
          ],
        )
      end
    end

    context "for an update action" do
      let(:action) { "update" }

      it "returns the attributes from FORM_ATTRIBUTES_EDIT" do
        expect(attributes).to match(
          "" => %i[
            order
            product
            quantity
          ],
        )
      end
    end
  end
end
