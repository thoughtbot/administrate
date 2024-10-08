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
      html_controller: "select",
      options: { multiple: false }
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: { field: select, f: f }
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
      html_controller: "select",
      options: { multiple: false }
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: { field: select, f: f }
        )
    end

    expect(rendered).to have_css(
      %(select[name="customer[email_subscriber]"][data-controller~="select"] option[value=""]),
      text: "Unknown"
    )
  end

  it 'uses the selected value when given' do
    customer = build(:customer)
    select = instance_double(
      'Administrate::Field::Select',
      attribute: :email_subscriber,
      data: nil,
      selectable_options: ['Yes', 'No'],
      include_blank_option: false,
      selected: 'No',
      html_controller: 'select',
      options: { multiple: false }
    )
    fields model: customer do |f|
      render(
        partial: 'fields/select/form',
        locals: { field: select, f: f }
      )
    end

    expect(rendered).to have_css(
                          %(select[name="customer[email_subscriber]"][data-controller~="select"] option[value="No"][selected="selected"]),
                          text: 'No'
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
      html_controller: "select",
      options: { multiple: false }
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

  it "pre-selects the specified option" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :email_subscriber,
      data: nil,
      selectable_options: ["Yes", "No", "Maybe"],
      include_blank_option: false,
      selected: "Maybe",
      html_controller: "select",
      options: { multiple: false }
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: { field: select, f: f }
      )
    end

    expect(rendered).to have_css(
                          'select[name="customer[email_subscriber]"][data-controller="select"] option[value="Maybe"][selected="selected"]',
                          text: "Maybe"
                        )
  end

  it "sets the max_items value in data attributes" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :tags,
      data: nil,
      selectable_options: ["Ruby", "Rails", "JavaScript", "Python"],
      include_blank_option: false,
      selected: ["Ruby", "Rails"],
      html_controller: "select",
      options: { multiple: true, max_items: 3 }
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: { field: select, f: f }
      )
    end

    # Check that the select has the correct name, data attributes, and multiple attribute
    expect(rendered).to have_css(
                          'select[name="customer[tags][]"][data-controller="select"][multiple="multiple"]'
                        )

    # Verify data attributes
    expect(rendered).to have_css(
                          'select[data-select-max-items-value="3"]'
                        )

    # Check that the correct options are selected
    expect(rendered).to have_css(
                          'select[name="customer[tags][]"] option[value="Ruby"][selected="selected"]',
                          text: "Ruby"
                        )
    expect(rendered).to have_css(
                          'select[name="customer[tags][]"] option[value="Rails"][selected="selected"]',
                          text: "Rails"
                        )
  end

  it "allows multiple selections when multiple option is true" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :roles,
      data: nil,
      selectable_options: ["Admin", "Editor", "Viewer"],
      include_blank_option: false,
      selected: ["Admin", "Viewer"],
      html_controller: "select",
      options: { multiple: true }
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: { field: select, f: f }
      )
    end

    expect(rendered).to have_css(
                          'select[name="customer[roles][]"][data-controller="select"][multiple="multiple"]'
                        )

    # Check multiple selected options
    expect(rendered).to have_css(
                          'select[name="customer[roles][]"] option[value="Admin"][selected="selected"]',
                          text: "Admin"
                        )
    expect(rendered).to have_css(
                          'select[name="customer[roles][]"] option[value="Viewer"][selected="selected"]',
                          text: "Viewer"
                        )
  end

  it "includes a blank option when include_blank_option is true" do
    customer = build(:customer)
    select = instance_double(
      "Administrate::Field::Select",
      attribute: :email_subscriber,
      data: nil, # Ensure no pre-selection from data
      selectable_options: ["Yes", "No"],
      include_blank_option: "Unknown",
      selected: nil,
      html_controller: "select",
      options: { multiple: false }
    )

    fields model: customer do |f|
      render(
        partial: "fields/select/form",
        locals: { field: select, f: f }
      )
    end

    # Check that the blank option exists with the correct value and text
    expect(rendered).to have_css(
                          'select[name="customer[email_subscriber]"][data-controller="select"] option[value=""]',
                          text: "Unknown"
                        )

    # Optionally, verify that no other option is selected if necessary
    # Since Rails doesn't add 'selected="selected"' on the first option,
    # the browser will select it by default.
  end
end
