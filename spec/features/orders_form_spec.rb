require "rails_helper"

describe "order form" do
  it "displays a select box for the customer" do
    customer = create(:customer)

    visit new_admin_order_path
    select(customer.name, from: "Customer")
    fill_in "Address line one", with: "Example"
    fill_in "Address line two", with: "Example"
    fill_in "Address city", with: "Example"
    fill_in "Address state", with: "Example"
    fill_in "Address zip", with: "Example"
    click_on "Create Order"

    expect(page).to have_link(customer.name)
    expect(page).to have_flash(
      t("administrate.controller.create.success", resource: "Order")
    )
  end

  describe "belongs_to relationships" do
    it "has stored value selected" do
      create(:customer)
      order = create(:order)

      visit edit_admin_order_path(order)
      expected = order.customer.id.to_s
      expect(find_field("Customer").value).to eq expected
    end
  end

  describe "has_many relationships" do
    it "can select multiple options" do
      order = create(:order)
      line_items = create_list(:line_item, 3)

      visit edit_admin_order_path(order)
      find_option(line_items.first, "Line items").select_option
      find_option(line_items.last, "Line items").select_option
      click_on "Update Order"

      order.reload
      expect(order.line_items).to include(line_items.first)
      expect(order.line_items).to include(line_items.last)
      expect(order.line_items).not_to include(line_items[1])
    end

    it "can unselect all options" do
      order = create(:order)
      line_item = create(:line_item, order: order)

      visit edit_admin_order_path(order)
      find_option(line_item, "Line items").unselect_option
      click_on "Update Order"

      order.reload
      expect(order.line_items).to be_empty
      expect(page).to have_flash(
        t("administrate.controller.update.success", resource: "Order")
      )
    end

    it "has stored values selected" do
      order = create(:order)
      create_list(:line_item, 3, order: order)

      visit edit_admin_order_path(order)

      expected = order.line_items.pluck(:id).map(&:to_s)
      expect(find("#order_line_item_ids").value).to match_array(expected)
    end

    it "displays translated labels" do
      custom_label = "Lines"
      order = create(:order)

      translations = {
        helpers: {
          label: {
            order: {
              line_items: custom_label,
            },
          },
        },
      }

      with_translations(:en, translations) do
        visit edit_admin_order_path(order)

        expect(page).to have_css("label", text: custom_label)
      end
    end

    def find_option(associated_model, field_locator)
      field = find_field(field_locator)
      field.find("option", text: displayed(associated_model))
    end
  end

  describe "datetime field" do
    it "responds to the date/time picker date format", :js do
      order = create(:order)

      visit edit_admin_order_path(order)
      select_from_datepicker(Time.new(2015, 01, 02, 03, 04, 05))
      click_on "Update Order"

      expect(page).to have_content("Fri, Jan 2, 2015 at 03:04:05 AM")
    end

    it "populates and persists the existing value", :js do
      time = Time.new(2015, 01, 02, 03, 04, 05)
      order = create(:order, shipped_at: time)

      visit edit_admin_order_path(order)
      click_on "Update Order"

      expect(order.reload.shipped_at).to eq(time)
    end

    def select_from_datepicker(time)
      time_string = time.to_s[0..-7]

      page.execute_script(<<-JS)
        var date = moment("#{time_string}", "YYYY-MM-DD hh:mm:ss");
        $('[data-type="datetime"]').data("DateTimePicker").date(date);
      JS
    end
  end
end
