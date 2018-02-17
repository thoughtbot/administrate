require "administrate/order"

describe Administrate::Order do
  describe "#apply" do
    context "when `order` argument is nil" do
      it "doesn't sort the resources" do
        order = Administrate::Order.new(nil, :desc)
        relation = relation_with_column(:id)
        allow(relation).to receive(:reorder).and_return(relation)

        ordered = order.apply(relation)

        expect(relation).not_to have_received(:reorder)
        expect(ordered).to eq(relation)
      end
    end

    context "when `order` argument isn't a valid column" do
      it "ignores the order" do
        order = Administrate::Order.new(:foo)
        relation = relation_with_column(:id)
        allow(relation).to receive(:reorder).and_return(relation)

        ordered = order.apply(relation)

        expect(relation).not_to have_received(:reorder)
        expect(ordered).to eq(relation)
      end
    end

    context "when `order` argument is valid" do
      it "orders by the column" do
        order = Administrate::Order.new(:name, :asc)
        relation = relation_with_column(:name)
        allow(relation).to receive(:reorder).and_return(relation)

        ordered = order.apply(relation)

        expect(relation).to have_received(:reorder).with("name asc")
        expect(ordered).to eq(relation)
      end

      it "honors the `direction` argument" do
        order = Administrate::Order.new(:name, :desc)
        relation = relation_with_column(:name)
        allow(relation).to receive(:reorder).and_return(relation)

        ordered = order.apply(relation)

        expect(relation).to have_received(:reorder).with("name desc")
        expect(ordered).to eq(relation)
      end
    end

    context "when relation has_many association" do
      it "orders the column by count" do
        order = Administrate::Order.new(:name)
        relation = relation_with_association(:has_many)
        allow(relation).to receive(:reorder).and_return(relation)
        allow(relation).to receive(:left_joins).and_return(relation)
        allow(relation).to receive(:group).and_return(relation)

        ordered = order.apply(relation)

        expect(relation).to have_received(:left_joins).with(:name)
        expect(relation).to have_received(:group).with(:id)
        expect(relation).to have_received(:reorder).with("COUNT(name.id) asc")
        expect(ordered).to eq(relation)
      end
    end

    context "when relation has belongs_to association" do
      it "orders by id" do
        order = Administrate::Order.new(:name)
        relation = relation_with_association(:belongs_to)
        allow(relation).to receive(:reorder).and_return(relation)

        ordered = order.apply(relation)

        expect(relation).to have_received(:reorder).with("name_id asc")
        expect(ordered).to eq(relation)
      end
    end
  end

  describe "#ordered_by?" do
    it "returns true if the order is by the given attribute" do
      order = Administrate::Order.new(:name, :desc)

      expect(order).to be_ordered_by("name")
    end

    it "returns false if the order is not by the given attribute" do
      order = Administrate::Order.new(:email, :desc)

      expect(order).not_to be_ordered_by(:name)
    end

    it "returns false if there is no order" do
      order = Administrate::Order.new(nil, :desc)

      expect(order).not_to be_ordered_by(:name)
    end
  end

  describe "#order_params_for" do
    context "when there is no order" do
      it "returns the attribute" do
        order = Administrate::Order.new(nil)

        params = order.order_params_for(:name)

        expect(params[:order]).to eq(:name)
      end

      it "does not sort descending" do
        order = Administrate::Order.new(nil)

        params = order.order_params_for(:name)

        expect(params[:direction]).to eq(:asc)
      end
    end

    context "when the order is by a different attribute" do
      it "returns the attribute" do
        order = Administrate::Order.new(:email)

        params = order.order_params_for(:name)

        expect(params[:order]).to eq(:name)
      end

      it "sorts ascending" do
        order = Administrate::Order.new(:email)

        params = order.order_params_for(:name)

        expect(params[:direction]).to eq(:asc)
      end
    end

    context "when the data is already ordered by the given attribute" do
      it "returns the attribute" do
        order = Administrate::Order.new(:name)

        params = order.order_params_for(:name)

        expect(params[:order]).to eq(:name)
      end

      it "orders the data descending if it's not already" do
        order = Administrate::Order.new("name")

        params = order.order_params_for(:name)

        expect(params[:direction]).to eq(:desc)
      end

      it "sets direction ascending if the data is already descending" do
        order = Administrate::Order.new(:name, "desc")

        params = order.order_params_for(:name)

        expect(params[:direction]).to eq(:asc)
      end
    end
  end

  def relation_with_column(column)
    double(
      klass: double(reflect_on_association: nil),
      columns_hash: { column.to_s => :column_info },
    )
  end

  def relation_with_association(association)
    double(
      klass: double(reflect_on_association: double(macro: association)),
    )
  end
end
