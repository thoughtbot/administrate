require "rails_helper"
require "administrate/field/belongs_to"
require "administrate/field/polymorphic"
require "support/constant_helpers"
require "support/field_matchers"

describe Administrate::Field::Polymorphic do
  include FieldMatchers

  describe "#html_controller" do
    it "returns select" do
      page = :show
      field = Administrate::Field::Polymorphic.new(:foo, "hello", page)

      html_controller = field.html_controller

      expect(html_controller).to eq("select")
    end
  end

  describe "#_partial_prefixes" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Polymorphic.new(:foo, "hello", page)

      prefixes = field._partial_prefixes

      expect(prefixes).to eq(
        ["fields/polymorphic", "fields/belongs_to", "fields/associative"]
      )
    end
  end

  it do
    should_permit_param(
      {"foo" => %i[type value]},
      on_model: Customer,
      for_attribute: :foo
    )
  end

  describe "#display_associated_resource" do
    it "displays through the dashboard based on the polymorphic class name" do
      Thing = Class.new
      ThingDashboard = Class.new do
        def display_resource(*)
          :success
        end
      end

      field = Administrate::Field::Polymorphic.new(:foo, Thing.new, :show)
      display = field.display_associated_resource

      expect(display).to eq :success
    ensure
      remove_constants :Thing, :ThingDashboard
    end
  end

  describe "#selected_global_id" do
    it "returns the global ID of the data" do
      item = double("SomeModel", to_global_id: "gid://myapp/SomeModel/1")
      field = Administrate::Field::Polymorphic.new(:foo, item, :show)
      expect(field.selected_global_id).to eq(item.to_global_id)
    end

    it "returns nil for nil" do
      field = Administrate::Field::Polymorphic.new(:foo, nil, :show)
      expect(field.selected_global_id).to eq(nil)
    end
  end

  describe "#classes" do
    let(:field) { Administrate::Field::Polymorphic.new(:foo, "hello", :show) }

    context "not present in options" do
      it "returns an empty array" do
        allow(field).to receive(:options).and_return({})

        expect(field.send(:classes)).to eq([])
      end
    end

    context "present in options" do
      it "returns a present value" do
        classes = ["one", "two", "three"]
        allow(field).to receive(:options).and_return(classes: classes)

        expect(field.send(:classes)).to eq(classes)
      end
    end

    context "present in options as a call-able object" do
      it "returns the called value" do
        classes = -> { ["one", "two", "three"] }
        allow(field).to receive(:options).and_return(classes: classes)

        expect(field.send(:classes)).to eq(classes.call)
      end
    end
  end
end
