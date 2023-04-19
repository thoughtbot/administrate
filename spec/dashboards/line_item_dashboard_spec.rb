require "rails_helper"

describe LineItemDashboard do
  let(:dashboard) { described_class.new }

  describe "#form_attributes" do
    let(:attributes) { dashboard.form_attributes(action) }

    context "for nil action" do
      let(:action) { nil }

      it "returns the attributes from FORM_ATTRIBUTES" do
        expect(attributes).to match(
          %i[
            order
            product
            quantity
            unit_price
          ],
        )
      end
    end

    context "for a new action" do
      let(:action) { "new" }

      it "returns the attributes from FORM_ATTRIBUTES_NEW" do
        expect(attributes).to match(
          %i[
            order
            product
          ],
        )
      end
    end

    context "for an edit action" do
      let(:action) { "edit" }

      it "returns the attributes from FORM_ATTRIBUTES_EDIT" do
        expect(attributes).to match(
          %i[
            order
            product
            quantity
          ],
        )
      end
    end

    context "for an invalid action" do
      let(:action) { "invalid" }

      it "returns the attributes from FORM_ATTRIBUTES" do
        expect(attributes).to match(
          %i[
            order
            product
            quantity
            unit_price
          ],
        )
      end
    end
  end

  describe "#permitted_attributes" do
    it "returns the attribute name by default" do
      attributes = ["order_id", "product_id", :quantity, :unit_price]
      expect(dashboard.permitted_attributes).to eq(attributes)
    end

    it "returns the attribute name for new/create actions" do
      attributes = ["order_id", "product_id"]
      expect(dashboard.permitted_attributes("new")).to eq(attributes)
      expect(dashboard.permitted_attributes("create")).to eq(attributes)
    end

    it "returns the attribute name for edit/update actions" do
      attributes = ["order_id", "product_id", :quantity]
      expect(dashboard.permitted_attributes("edit")).to eq(attributes)
      expect(dashboard.permitted_attributes("update")).to eq(attributes)
    end
  end
end
