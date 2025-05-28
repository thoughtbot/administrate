require "rails_helper"
require "administrate/field/deferred"
require "administrate/field/belongs_to"
require "administrate/field/has_many"
require "administrate/field/string"

describe Administrate::Field::Deferred do
  describe "#permitted_attribute" do
    it "delegates to the backing class" do
      deferred = Administrate::Field::Deferred.new(
        Administrate::Field::String
      )
      allow(Administrate::Field::String).to receive(:permitted_attribute)

      deferred.permitted_attribute(:foo, resource_class: LineItem)

      expect(Administrate::Field::String).to(
        have_received(:permitted_attribute)
          .with(:foo, resource_class: LineItem)
      )
    end

    context "when given a `class_name` option" do
      it "passes it on to deferred classes" do
        field = double
        allow(field).to receive(:permitted_attribute)
        deferred = Administrate::Field::Deferred.new(
          field,
          class_name: "Foo::Bar"
        )

        deferred.permitted_attribute(:bars)

        expect(field).to(
          have_received(:permitted_attribute)
            .with(:bars, class_name: "Foo::Bar")
        )
      end
    end
  end

  describe "#searchable?" do
    context "when given a `searchable` option" do
      it "returns the value given" do
        searchable_deferred = Administrate::Field::Deferred.new(
          double(searchable?: false),
          searchable: true
        )
        unsearchable_deferred = Administrate::Field::Deferred.new(
          double(searchable?: true),
          searchable: false
        )

        expect(searchable_deferred.searchable?).to eq(true)
        expect(unsearchable_deferred.searchable?).to eq(false)
      end
    end

    context "when not given a `searchable` option" do
      it "falls back to the default of the deferred class" do
        searchable_deferred = Administrate::Field::Deferred.new(
          double(searchable?: true)
        )
        unsearchable_deferred = Administrate::Field::Deferred.new(
          double(searchable?: false)
        )

        expect(searchable_deferred.searchable?).to eq(true)
        expect(unsearchable_deferred.searchable?).to eq(false)
      end
    end
  end

  describe "#sortable?" do
    context "when given a `sortable` option" do
      it "returns the value given" do
        sortable_deferred = Administrate::Field::Deferred.new(
          double(sortable?: false),
          sortable: true
        )
        unsortable_deferred = Administrate::Field::Deferred.new(
          double(sortable?: true),
          sortable: false
        )

        expect(sortable_deferred.sortable?).to eq(true)
        expect(unsortable_deferred.sortable?).to eq(false)
      end
    end

    context "when not given a `sortable` option" do
      it "falls back to the default of the deferred class" do
        sortable_deferred = Administrate::Field::Deferred.new(
          double(sortable?: true)
        )
        unsortable_deferred = Administrate::Field::Deferred.new(
          double(sortable?: false)
        )

        expect(sortable_deferred.sortable?).to eq(true)
        expect(unsortable_deferred.sortable?).to eq(false)
      end
    end
  end

  describe "#==" do
    it "returns false for different deferred classes" do
      one = Administrate::Field::Deferred.new(String)
      two = Administrate::Field::Deferred.new(Integer)

      expect(one).not_to eq(two)
    end

    it "returns false for different options" do
      one = Administrate::Field::Deferred.new(String, a: 12)
      two = Administrate::Field::Deferred.new(String, a: :b)

      expect(one).not_to eq(two)
    end

    it "returns true if deferred class and options are equal" do
      one = Administrate::Field::Deferred.new(String, a: :b)
      two = Administrate::Field::Deferred.new(String, a: :b)

      expect(one).to eq(two)
    end
  end
end
