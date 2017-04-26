require 'rails_helper'

describe LineItemDashboard do
  describe "#attribute_type_for" do
    context "attribute key is string and symbol attribute name is passed" do
      it "returns the attribute field event" do
        dashboard = LineItemDashboard.new
        field = dashboard.attribute_type_for(:quantity)
        expect(field).to eq Administrate::Field::Number
      end

      it "attributes names can be passed as strign" do
        dashboard = LineItemDashboard.new
        field = dashboard.attribute_type_for("quantity")
        expect(field).to eq Administrate::Field::Number
      end
    end
  end

  describe "#attribute_types_for" do
    context "attribute key is string and symbol attribute name is passed" do
      it "returns the attribute fields" do
        dashboard = LineItemDashboard.new
        fields = dashboard.attribute_types_for([:quantity, :"catalog/product"])
        expect(fields).to match(
          "quantity" => Administrate::Field::Number,
          "catalog/product" => Administrate::Field::BelongsTo,
        )
      end

      it "attributes names can be passed as strings" do
        dashboard = LineItemDashboard.new
        fields = dashboard.attribute_types_for(["quantity", "catalog/product"])
        expect(fields).to match(
          "quantity" => Administrate::Field::Number,
          "catalog/product" => Administrate::Field::BelongsTo,
        )
      end
    end
  end
end
