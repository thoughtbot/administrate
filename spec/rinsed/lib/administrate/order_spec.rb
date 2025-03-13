require "active_record"
require "administrate/order"

describe Administrate::Order do
  describe "#apply" do
    context "when `order` argument is valid" do
      context "when relation has a string primary key" do
        it "adds a secondary sort by primary key desc" do
          order = Administrate::Order.new(:name, :asc)
          relation = relation_with_column_and_string_primary_key(:name)
          allow(relation).to receive(:reorder).and_return(relation)

          ordered = order.apply(relation)

          expect(relation).to have_received(:reorder).with([
            Arel.sql("table_name.name asc"),
            { "id" => :desc }
          ])
          expect(ordered).to eq(relation)
        end
      end

      context "when relation has no primary key" do
        it "orders only by the specified column" do
          order = Administrate::Order.new(:name, :asc)
          relation = relation_with_column_and_no_primary_key(:name)
          allow(relation).to receive(:reorder).and_return(relation)

          ordered = order.apply(relation)

          expect(relation).to have_received(:reorder).with(Arel.sql("table_name.name asc"))
          expect(ordered).to eq(relation)
        end
      end

      context "when relation has a non-string primary key" do
        it "orders only by the specified column" do
          order = Administrate::Order.new(:name, :asc)
          relation = relation_with_column_and_non_string_primary_key(:name)
          allow(relation).to receive(:reorder).and_return(relation)

          ordered = order.apply(relation)

          expect(relation).to have_received(:reorder).with(Arel.sql("table_name.name asc"))
          expect(ordered).to eq(relation)
        end
      end
    end
  end

  def relation_with_column_and_string_primary_key(column)
    double(
      klass: double(reflect_on_association: nil),
      columns_hash: { column.to_s => :column_info, "id" => :column_info },
      table_name: "table_name",
      primary_key: "id"
    )
  end

  def relation_with_column_and_no_primary_key(column)
    double(
      klass: double(reflect_on_association: nil),
      columns_hash: { column.to_s => :column_info },
      table_name: "table_name",
      primary_key: nil
    )
  end

  def relation_with_column_and_non_string_primary_key(column)
    double(
      klass: double(reflect_on_association: nil),
      columns_hash: { column.to_s => :column_info },
      table_name: "table_name",
      primary_key: [:id1, :id2]
    )
  end
end
