require "rails_helper"

describe PaymentDashboard do
  describe "#permitted_attributes" do
    context "when there is foreign key that is not `id`" do
      it "interpolates in the correct column name" do
        dashboard = PaymentDashboard.new
        allow(dashboard).to receive(:attribute_types).and_return(
          id: Administrate::Field::Number,
          order: Administrate::Field::BelongsTo.with_options(
            primary_key: :code,
          ),
        )

        expect(dashboard.permitted_attributes).to include(:order_code)
      end
    end
  end
end
