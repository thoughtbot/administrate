require "rails_helper"
require "administrate/field/select"

describe "fields/select/_form", type: :view do
  it "displays the selected option" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :email_subscriber,
      data: false,
      selectable_options: [true, false, nil],
      include_blank_option: false,
    )

    render(
      partial: "fields/select/form",
      locals: { field: select, f: form_builder(customer) },
    )

    expect(rendered).to have_css(
      %{select[name="customer[email_subscriber]"]
        option[value="false"][selected="selected"]},
    )
  end

  it "works when :collection is an array" do
    customer = create(:customer)
    field = Administrate::Field::Select.new(
      :email_subscriber,
      "yes",
      :_page_,
      resource: customer,
      collection: ["no", "yes", "absolutely"],
    )

    render(
      partial: "fields/select/form",
      locals: { field: field, f: form_builder(customer) },
    )
    expect(rendered).to have_css(
      %{select[name="customer[email_subscriber]"]
        option[value="yes"][selected="selected"]},
      text: "yes",
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

    render(
      partial: "fields/select/form",
      locals: { field: field, f: form_builder(customer) },
    )
    expect(rendered).to have_css(
      %{select[name="customer[email_subscriber]"]
        option[value="opt1"][selected="selected"]},
      text: "yes",
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

    render(
      partial: "fields/select/form",
      locals: { field: field, f: form_builder(customer) },
    )
    expect(rendered).to have_css(
      %{select[name="customer[email_subscriber]"]
        option[value="opt1"][selected="selected"]},
      text: "yes",
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

    render(
      partial: "fields/select/form",
      locals: { field: field, f: form_builder(customer) },
    )
    expect(rendered).to have_css(
      %{select[name="customer[email_subscriber]"]
        option[value="opt1"][selected="selected"]},
      text: "yes, Dave",
    )
  end

  it "detects the values of an ActiveRecord::Enum" do
    customer = create(:customer, name: "Dave")
    field = Administrate::Field::Select.new(
      :kind,
      "vip",
      :_page_,
      resource: customer,
    )

    render(
      partial: "fields/select/form",
      locals: { field: field, f: form_builder(customer) },
    )
    expect(rendered).to have_css(
      %{select[name="customer[kind]"]
        option[value="vip"][selected="selected"]},
      text: "vip",
    )
  end

  it "defaults to an empty list when there are no options" do
    customer = create(:customer, name: "Dave")
    field = Administrate::Field::Select.new(
      :email_subscriber,
      "opt1",
      :_page_,
      resource: customer,
    )

    render(
      partial: "fields/select/form",
      locals: { field: field, f: form_builder(customer) },
    )
    expect(rendered).not_to have_css(
      %{select[name="customer[email_subscriber]"] option}
    )
  end

  describe "when :include_blank is provided" do
    it "adds a blank option" do
      customer = create(:customer, name: "Dave")
      field = Administrate::Field::Select.new(
        :email_subscriber,
        "opt1",
        :_page_,
        resource: customer,
        include_blank: "No answer",
      )

      render(
        partial: "fields/select/form",
        locals: { field: field, f: form_builder(customer) },
      )
      expect(rendered).to have_css(%{select[name="customer[email_subscriber]"] option}, text: "No answer")
    end

    it "works with a call-able collection" do
      customer = create(:customer, name: "Dave")
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
        include_blank: "No answer",
      )

      render(
        partial: "fields/select/form",
        locals: { field: field, f: form_builder(customer) },
      )
      expect(rendered).to have_css(%{select[name="customer[email_subscriber]"] option}, text: "No answer")
    end
  end

  def form_builder(object)
    ActionView::Helpers::FormBuilder.new(
      object.model_name.singular,
      object,
      build_template,
      {},
    )
  end

  def build_template
    Object.new.tap do |template|
      template.extend ActionView::Helpers::FormHelper
      template.extend ActionView::Helpers::FormOptionsHelper
      template.extend ActionView::Helpers::FormTagHelper
    end
  end
end
