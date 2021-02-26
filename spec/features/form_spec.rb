require "rails_helper"

describe "edit form" do
  it "has the correct css class_name" do
    customer = create(:customer)

    visit edit_admin_customer_path(customer)

    expect(page).to have_css("form.form")
  end

  it "displays translated labels" do
    custom_label = "Newsletter Subscriber"

    translations = {
      helpers: {
        label: {
          customer: {
            email_subscriber: custom_label,
          },
        },
      },
    }

    with_translations(:en, translations) do
      visit new_admin_customer_path

      expect(page).to have_label(custom_label)
    end
  end

  it "marks required fields only" do
    visit new_admin_product_path

    required_field_translations = [
      Product.human_attribute_name(:name),
      Product.human_attribute_name(:description),
      Product.human_attribute_name(:price),
      Product.human_attribute_name(:image_url),
    ]

    required_field_labels = find_all(".field-unit--required").map(&:text)

    expect(required_field_labels).to match_array(required_field_translations)
  end

  context "include_blank option for belongs_to" do
    before { create_list(:country, 5) }

    it "should have blank option if set to true" do
      dashboard = CustomerDashboard.new
      fields = dashboard.attribute_types
      territory = fields[:territory]
      territory.options[:include_blank] = true

      expect(territory.deferred_class).to eq(Administrate::Field::BelongsTo)
      expect(territory.options[:include_blank]).to eq(true)

      visit new_admin_customer_path
      element_selections = find("select[name=\"customer[country_code]\"]")

      expect(element_selections.first("option").value).to eq("")
    end

    it "should not have blank option if set to false" do
      dashboard = CustomerDashboard.new
      fields = dashboard.attribute_types
      territory = fields[:territory]
      territory.options[:include_blank] = false

      expect(territory.deferred_class).to eq(Administrate::Field::BelongsTo)
      expect(territory.options[:include_blank]).to eq(false)

      visit new_admin_customer_path
      element_selections = find("select[name=\"customer[country_code]\"]")

      expect(element_selections.first("option").value).not_to eq("")
    end
  end
end
