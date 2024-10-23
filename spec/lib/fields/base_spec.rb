require "administrate/field/url"
require "active_record"

describe Administrate::Field::Base do
  let(:field_class) { Class.new(Administrate::Field::Base) }

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

  describe "read_value" do
    it "reads the value from the resource" do
      resource = double(attribute: "value")
      field = field_class.new(:attribute, :date, :page, resource: resource)

      expect(field.read_value).to eq("value")
    end

    it "reads the value from the resource with a custom getter" do
      resource = double(custom_getter: "value")
      field = field_class.new(:attribute, :date, :page, resource: resource, getter: :custom_getter)

      expect(field.read_value).to eq("value")
    end

    it "reads the value from the resource with a custom getter block" do
      resource = double
      field = field_class.new(:attribute, :date, :page, resource: resource, getter: ->(field) { field.resource.custom_getter })

      expect(resource).to receive(:custom_getter)
      field.read_value
    end

    it "returns nil if the resource is nil" do
      field = field_class.new(:attribute, :date, :page, resource: nil)

      expect(field.read_value).to eq(nil)
    end
  end
end
