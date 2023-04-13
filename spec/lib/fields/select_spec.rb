require "rails_helper"
require "administrate/field/select"

describe Administrate::Field::Select do
  describe "#selectable_options" do
    it "works when :collection is an array" do
      customer = create(:customer)
      field = described_class.new(
        :email_subscriber,
        "yes",
        :_page_,
        resource: customer,
        collection: ["no", "yes", "absolutely"],
      )

      expect(field.selectable_options).to eq(
        ["no", "yes", "absolutely"],
      )
    end

    it "works when :collection is a hash" do
      customer = create(:customer)
      field = Administrate::Field::Select.new(
        :email_subscriber,
        "opt1",
        :_page_,
        resource: customer,
        collection: {
          "no" => "opt0",
          "yes" => "opt1",
          "absolutely" => "opt2",
        },
      )

      expect(field.selectable_options).to eq(
        "no" => "opt0",
        "yes" => "opt1",
        "absolutely" => "opt2",
      )
    end

    it "works when :collection is a call-able" do
      customer = create(:customer)
      field = Administrate::Field::Select.new(
        :email_subscriber,
        "opt1",
        :_page_,
        resource: customer,
        collection: -> {
          {
            "no" => "opt0",
            "yes" => "opt1",
            "absolutely" => "opt2",
          }
        },
      )

      expect(field.selectable_options).to eq(
        "no" => "opt0",
        "yes" => "opt1",
        "absolutely" => "opt2",
      )
    end

    it "provides some context to that call-able" do
      customer = create(:customer, name: "Dave")
      field = Administrate::Field::Select.new(
        :email_subscriber,
        "opt1",
        :_page_,
        resource: customer,
        collection: ->(f) {
          person = f.resource
          {
            "no, #{person.name}" => "opt0",
            "yes, #{person.name}" => "opt1",
            "absolutely, #{person.name}" => "opt2",
          }
        },
      )

      expect(field.selectable_options).to eq(
        "no, Dave" => "opt0",
        "yes, Dave" => "opt1",
        "absolutely, Dave" => "opt2",
      )
    end

    it "detects the values of an ActiveRecord::Enum" do
      customer = create(:customer)
      field = Administrate::Field::Select.new(
        :kind,
        "vip",
        :_page_,
        resource: customer,
      )

      expect(field.selectable_options).to eq(["standard", "vip"])
    end

    it "prioritises given collections over enums" do
      customer = create(:customer)
      field = Administrate::Field::Select.new(
        :kind,
        "platinum",
        :_page_,
        resource: customer,
        collection: ["gold", "platinum"],
      )

      expect(field.selectable_options).to eq(["gold", "platinum"])
    end

    it "defaults to an empty list when there are no options" do
      customer = create(:customer)
      field = Administrate::Field::Select.new(
        :email_subscriber,
        "opt1",
        :_page_,
        resource: customer,
      )

      expect(field.selectable_options).to eq([])
    end
  end
end
