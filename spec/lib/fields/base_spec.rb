require "administrate/field/url"
require "active_record"

describe Administrate::Field::Base do
  let(:field_class) { Class.new(Administrate::Field::Base) }

  describe "#partial_prefixes" do
    it "returns the partial prefixes based on the field class" do
      field = field_class.new(:attribute, nil, :show)
      allow(field_class).to receive(:to_s).and_return("Administrate::Field::String")

      prefixes = field.partial_prefixes

      expect(prefixes).to eq([
        "fields/string/looks/default", "fields/string",
        "fields/base/looks/default", "fields/base"
      ])
    end

    context "when given the look option" do
      context "when the look option is a symbol" do
        it "returns the partial prefixes based on the look option" do
          field = field_class.new(:attribute, nil, :show, look: :custom)
          allow(field_class).to receive(:to_s).and_return("Administrate::Field::String")

          prefixes = field.partial_prefixes

          expect(prefixes).to eq([
            "fields/string/looks/custom", "fields/string/looks/default", "fields/string",
            "fields/base/looks/custom", "fields/base/looks/default", "fields/base"
          ])
        end
      end

      context "when the look option is a string" do
        it "returns the partial prefixes based on the look option" do
          field = field_class.new(:attribute, nil, :show, look: "custom")
          allow(field_class).to receive(:to_s).and_return("Administrate::Field::String")

          prefixes = field.partial_prefixes

          expect(prefixes).to eq([
            "fields/string/looks/custom", "fields/string/looks/default", "fields/string",
            "fields/base/looks/custom", "fields/base/looks/default", "fields/base"
          ])
        end
      end

      context "when the look option is explicitly default" do
        it "returns the partial prefixes based on the field class" do
          field = field_class.new(:attribute, nil, :show, look: :default)
          allow(field_class).to receive(:to_s).and_return("Administrate::Field::String")

          prefixes = field.partial_prefixes

          expect(prefixes).to eq([
            "fields/string/looks/default", "fields/string",
            "fields/base/looks/default", "fields/base"
          ])
        end
      end

      context "when the look option is explicitly nil" do
        it "returns the partial prefixes based on the field class" do
          field = field_class.new(:attribute, nil, :show, look: nil)
          allow(field_class).to receive(:to_s).and_return("Administrate::Field::String")

          prefixes = field.partial_prefixes

          expect(prefixes).to eq([
            "fields/string/looks/default", "fields/string",
            "fields/base/looks/default", "fields/base"
          ])
        end
      end

      context "when the field class is multiply inherited" do
        it "returns the partial prefixes based on the field class" do
          second_level_field_class = Class.new(field_class)
          allow(field_class).to receive(:to_s).and_return("Administrate::Field::String")

          field = second_level_field_class.new(:attribute, nil, :show, look: :custom)
          allow(second_level_field_class).to receive(:to_s).and_return("Administrate::Field::CustomString")

          prefixes = field.partial_prefixes

          expect(prefixes).to eq([
            "fields/custom_string/looks/custom", "fields/custom_string/looks/default", "fields/custom_string",
            "fields/string/looks/custom", "fields/string/looks/default", "fields/string",
            "fields/base/looks/custom", "fields/base/looks/default", "fields/base"
          ])
        end
      end
    end
  end

  describe "required?" do
    it "is false by default" do
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: []
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(false)
    end

    it "is true on an unconditional requirement for a value" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        options: {}
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(true)
    end

    it "is false on a conditional requirement for a value (with :if)" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        if: -> { true }
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(false)
    end

    it "is false on a conditional requirement for a value (with :unless)" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        unless: -> { true }
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(false)
    end

    it "is true for an unpersisted record in only required on create" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        on: :create
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class,
        persisted?: false
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(true)
    end

    it "is false for a persisted record if only required on create" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        on: :create
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class,
        persisted?: true
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(false)
    end

    it "is true for a persisted record in only required on update" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        on: :update
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class,
        persisted?: true
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(true)
    end

    it "is false for a persisted record in only required on update" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        on: :update
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class,
        persisted?: false
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(false)
    end

    it "is false when required only on unstandard situations" do
      validator = ActiveRecord::Validations::PresenceValidator.new(
        attributes: [:foo],
        on: :some_situation_or_the_other
      )
      resource_class = class_double(
        "ActiveRecord::Base",
        validators_on: [validator]
      )
      resource = instance_double(
        "ActiveRecord::Base",
        class: resource_class
      )
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.required?).to eq(false)
    end
  end

  describe "#data" do
    context "when given nil data" do
      it "reads the value from the resource" do
        resource = double(attribute: "resource value")
        field = field_class.new(:attribute, nil, :page, resource: resource)

        expect(field.data).to eq("resource value")
      end
    end

    context "when given non-nil data" do
      it "uses the given data" do
        resource = double(attribute: "resource value")
        field = field_class.new(:attribute, "given value", :page, resource: resource)

        expect(field.data).to eq("given value")
      end
    end

    context "when given a :getter value" do
      it "reads the attribute with the name of the value" do
        resource = double(custom_getter: "custom value")
        field = field_class.new(:attribute, :date, :page, resource: resource, getter: :custom_getter)

        expect(field.data).to eq("custom value")
      end
    end

    context "when given a :getter block" do
      it "uses it to produce a value" do
        resource = double("Model", custom_getter: "custom value")
        field = field_class.new(:attribute, :date, :page, resource: resource, getter: ->(f) { f.resource.custom_getter + " from block" })

        expect(field.data).to eq("custom value from block")
      end

      it "returns nil if the resource is nil" do
        field = field_class.new(:attribute, nil, :page, resource: nil)

        expect(field.data).to eq(nil)
      end
    end
  end
end
