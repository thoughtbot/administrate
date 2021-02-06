require "rails_helper"

search_input_selector = ".search__input"

describe "customer index page" do
  it "displays customers' name and email" do
    customer = create(:customer)

    visit admin_customers_path

    expect(page).to have_header("Customers")
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the customer show page", :js do
    customer = create(:customer)

    visit admin_customers_path
    click_row_for(customer)

    expect(page).to have_header(displayed(customer))
    expect(page).to have_content(customer.name)
    expect(page).to have_content(customer.email)
  end

  it "links to the customer show page without javascript", js: false do
    customer = create(:customer)

    visit admin_customers_path
    click_show_link_for(customer)

    expect(page).to have_header(displayed(customer))
  end

  it "links to the edit page" do
    customer = create(:customer)

    visit admin_customers_path
    click_on "Edit"

    expect(current_path).to eq(edit_admin_customer_path(customer))
  end

  it "links to the new page" do
    visit admin_customers_path
    click_on("New customer")

    expect(current_path).to eq(new_admin_customer_path)
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
      visit admin_customers_path

      expect(page).to have_table_header(custom_label)
    end
  end

  it "sorts by count on a has_many association" do
    create_list(:order, 2, customer: create(:customer, name: "Ade"))
    create_list(:order, 3, customer: create(:customer, name: "Ben"))
    create_list(:order, 1, customer: create(:customer, name: "Cam"))

    visit admin_customers_path

    click_on "Orders"
    expect(page).to have_content(/Cam.*1 order.*Ade.*2 orders.*Ben.*3 orders/)

    click_on "Orders"
    expect(page).to have_content(/Ben.*3 orders.*Ade.*2 orders.*Cam.*1 order/)
  end
end

describe "search input" do
  context "when resource has searchable fields" do
    let(:index_with_searchable_fields) { admin_log_entries_path }

    context "but none of them are displayed" do
      before do
        allow_any_instance_of(LogEntryDashboard).
          to receive(:collection_attributes) { [] }
        visit(index_with_searchable_fields)
      end

      it "is shown" do
        expect(page).to have_selector(search_input_selector)
      end
    end

    context "and some of them are displayed" do
      before do
        visit(index_with_searchable_fields)
      end

      it "is shown" do
        expect(page).to have_selector(search_input_selector)
      end
    end
  end

  context "when resource does not have searchable fields" do
    let(:index_without_searchable_fields) { admin_line_items_path }

    before do
      visit(index_without_searchable_fields)
    end

    it "is hidden" do
      expect(page).to_not have_selector(search_input_selector)
    end
  end
end
