require "rails_helper"
require "administrate/field/select"

describe Administrate::Field::Select do
  describe "#html_controller" do
    it "returns select" do
      customer = create(:customer)
      field = described_class.new(
        :email_subscriber,
        "yes",
        :_page_,
        resource: customer,
        collection: ["no", "yes", "absolutely"]
      )

      html_controller = field.html_controller

      expect(html_controller).to eq("select")
    end
  end

  describe "#selectable_options" do
    it "works when :collection is an array" do
      customer = create(:customer)
      field = described_class.new(
        :email_subscriber,
        "yes",
        :_page_,
        resource: customer,
        collection: ["no", "yes", "absolutely"]
      )

      expect(field.selectable_options).to eq(
        ["no", "yes", "absolutely"]
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
          "absolutely" => "opt2"
        }
      )

      expect(field.selectable_options).to eq(
        "no" => "opt0",
        "yes" => "opt1",
        "absolutely" => "opt2"
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
            "absolutely" => "opt2"
          }
        }
      )

      expect(field.selectable_options).to eq(
        "no" => "opt0",
        "yes" => "opt1",
        "absolutely" => "opt2"
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
            "absolutely, #{person.name}" => "opt2"
          }
        }
      )

      expect(field.selectable_options).to eq(
        "no, Dave" => "opt0",
        "yes, Dave" => "opt1",
        "absolutely, Dave" => "opt2"
      )
    end

    it "detects the values of an ActiveRecord::Enum" do
      customer = create(:customer)
      field = Administrate::Field::Select.new(
        :kind,
        "vip",
        :_page_,
        resource: customer
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
        collection: ["gold", "platinum"]
      )

      expect(field.selectable_options).to eq(["gold", "platinum"])
    end

    it "defaults to an empty list when there are no options" do
      customer = create(:customer)
      field = Administrate::Field::Select.new(
        :email_subscriber,
        "opt1",
        :_page_,
        resource: customer
      )

      expect(field.selectable_options).to eq([])
    end
  end

  describe ":include_blank option" do
    context "when given an include_blank option is true" do
      it "returns include_blank and placeholder options with '---'" do
        customer = create(:customer)
        field = described_class.new(
          :email_subscriber,
          "yes",
          :_page_,
          resource: customer,
          include_blank: true
        )

        tag_options = field.tag_options
        html_options = field.html_options

        expect(tag_options[:include_blank]).to eq("---")
        expect(html_options[:placeholder]).to eq("---")
        expect(html_options.dig(:data, :"selectize-required")).to be_nil
      end
    end

    context "when given an include_blank option is a string" do
      it "returns include_blank and placeholder options with the given string" do
        customer = create(:customer)
        field = described_class.new(
          :email_subscriber,
          "yes",
          :_page_,
          resource: customer,
          include_blank: "Select an option"
        )

        tag_options = field.tag_options
        html_options = field.html_options

        expect(tag_options[:include_blank]).to eq("Select an option")
        expect(html_options[:placeholder]).to eq("Select an option")
        expect(html_options.dig(:data, :"selectize-required")).to be_nil
      end
    end

    context "when given an include_blank option is false" do
      it "returns include_blank and placeholder options with nil" do
        customer = create(:customer)
        field = described_class.new(
          :email_subscriber,
          "yes",
          :_page_,
          resource: customer,
          include_blank: false
        )

        tag_options = field.tag_options
        html_options = field.html_options

        expect(tag_options[:include_blank]).to be_nil
        expect(html_options[:placeholder]).to be_nil
        expect(html_options.dig(:data, :"selectize-required")).to eq(true)
      end
    end
  end
end
