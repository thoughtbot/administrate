require "rails_helper"
require "administrate/field/select"

describe "fields/select/_form", type: :view do
  it "displays the field with correct name and selection" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :email_subscriber,
      data: false,
      selectable_options: [true, false, nil],
      include_blank_option: false,
      selected: nil,
      html_controller: "select"
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: {field: select, f: f}
      )
    end

    expect(rendered).to have_css(
      %(select[name="customer[email_subscriber]"][data-controller~=select]
        option[value="false"][selected="selected"])
    )
  end

  it "can include a blank option" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :email_subscriber,
      data: "Yes",
      selectable_options: ["Yes", "No"],
      include_blank_option: "Unknown",
      selected: nil,
      html_controller: "select"
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: {field: select, f: f}
      )
    end

    expect(rendered).to have_css(
      %(select[name="customer[email_subscriber]"][data-controller~="select"] option[value=""]),
      text: "Unknown"
    )
  end

  it "uses the selected value when given" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :email_subscriber,
      data: nil,
      selectable_options: ["Yes", "No"],
      include_blank_option: false,
      selected: "No",
      html_controller: "select"
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: {field: select, f: f}
      )
    end

    expect(rendered).to have_css(
      %(select[name="customer[email_subscriber]"][data-controller~="select"] option[value="No"][selected="selected"]),
      text: "No"
    )
  end
end
