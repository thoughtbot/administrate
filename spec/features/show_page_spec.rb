require "rails_helper"

RSpec.describe "customer show page" do
  describe "paginates customers' orders" do
    context "when the total number of records exceeds the pagination limit" do
      it "displays the first page by default, other pages on request" do
        customer = create(:customer)
        orders = create_list(:order, 4, customer: customer)
        order_ids = orders.map(&:id)
        ids_in_page1 = ids_in_page2 = nil

        visit admin_customer_path(customer)

        within(table_for_attribute(:orders)) do
          ids_in_page1 = ids_in_table
          expect(ids_in_page1.count).to eq 2
          expect(order_ids).to include(*ids_in_page1)
        end

        click_on("Next ›")

        within(table_for_attribute(:orders)) do
          ids_in_page2 = ids_in_table
          expect(ids_in_page2.count).to eq 2
          expect(order_ids).to include(*ids_in_page2)
        end

        ids_in_table = (ids_in_page1 + ids_in_page2).uniq
        expect(ids_in_table).to match_array(order_ids)
      end
    end

    context "when the total number of records does not exceed \
      the pagination limit" do
      it "displays all records" do
        customer = create(:customer)
        orders = create_list(:order, 1, customer: customer)
        order_ids = orders.map(&:id)
        ids_in_page1 = nil

        visit admin_customer_path(customer)

        within(table_for_attribute(:orders)) do
          ids_in_page1 = ids_in_table
          expect(ids_in_page1.count).to eq 1
          expect(order_ids).to include(*ids_in_page1)
        end
      end
    end

    describe(
      "when these are not a collection field" +
      "and there's another paging association",
    ) do
      it "doesn't break" do
        orig_collection_attributes = CustomerDashboard::COLLECTION_ATTRIBUTES
        allow_any_instance_of(CustomerDashboard).to(
          receive(:collection_attributes).
          and_return(orig_collection_attributes - [:orders]),
        )

        customer = create(:customer)
        create_list(:order, 4, customer: customer)
        create_list(:log_entry, 1, logeable: customer)

        visit admin_customer_path(customer)
        click_on("Next ›")
      end
    end
  end

  it "displays the customer's title attribute as the header" do
    customer = create(:customer)

    visit admin_customer_path(customer)

    expect(page).to have_header(customer.name)
  end

  it "displays the customer's other attributes" do
    customer = create(:customer)

    visit admin_customer_path(customer)

    expect(page).to have_content(customer.email)
  end

  it "displays each of the customer's orders" do
    customer = create(:customer)
    orders = create_pair(:order, customer: customer)
    orders.map.with_index(1) do |order, index|
      create(:line_item, order: order, unit_price: 10, quantity: index)
    end

    visit admin_customer_path(customer)

    orders.each do |order|
      expect(page).to have_content(order.total_price)
    end
  end

  it "adds has_many resource/attribute name to table headers" do
    customer = create(:customer)
    create_list(:order, 2, customer: customer)

    visit admin_customer_path(customer)

    expect(page).to have_css("th.cell-label--order_total_price")
  end

  it "sorts each of the customer's orders" do
    customer = create(:customer)
    orders = create_list(:order, 4, customer: customer)

    orders.map.with_index(1) do |order, index|
      create(:line_item, order: order, unit_price: 10, quantity: index)
    end

    visit admin_customer_path(customer, orders: {
                                order: :id, direction: :desc
                              })

    order_ids = orders.sort_by(&:id).map(&:id).reverse

    within(table_for_attribute(:orders)) do
      expect(order_ids.first(2)).to eq(ids_in_table)
    end

    visit admin_customer_path(customer, orders: {
                                order: :id, direction: :desc, page: 2
                              })

    within(table_for_attribute(:orders)) do
      expect(order_ids.last(2)).to eq(ids_in_table)
    end
  end

  it "sorts each of the customer's orders and log entries independently" do
    customer = create(:customer)
    orders = create_list(:order, 4, customer: customer)
    log_entries = create_list(:log_entry, 4, logeable: customer)

    orders.map.with_index(1) do |order, index|
      create(:line_item, order: order, unit_price: 10, quantity: index)
    end

    visit admin_customer_path(
      customer,
      orders: { order: :id, direction: :desc },
      log_entries: { order: :id, direction: :asc },
    )

    order_ids = orders.sort_by(&:id).map(&:id).reverse
    log_entry_ids = log_entries.sort_by(&:id).map(&:id)

    within(table_for_attribute(:orders)) do
      expect(order_ids.first(2)).to eq(ids_in_table)
    end

    within(table_for_attribute(:log_entries)) do
      expect(log_entry_ids.first(2)).to eq(ids_in_table)
    end

    visit admin_customer_path(
      customer,
      orders: {
        order: :id,
        direction: :desc,
        page: 2,
      },
    )

    within(table_for_attribute(:orders)) do
      expect(order_ids.last(2)).to eq(ids_in_table)
    end

    within(table_for_attribute(:log_entries)) do
      expect(log_entry_ids.first(2)).to eq(ids_in_table)
    end
  end

  it "links to the customer's orders", :js do
    customer = create(:customer)
    order = create(:order, customer: customer)

    visit admin_customer_path(customer)

    click_row_for(order)

    expect(page).to have_header(displayed(order))
  end

  it "link-ifies the email" do
    customer = create(:customer)

    visit admin_customer_path(customer)

    expect(page).to have_link(customer.email)
  end

  it "links to the edit page" do
    customer = create(:customer)

    visit admin_customer_path(customer)
    click_on "Edit"

    expect(page).to have_header("Edit #{displayed(customer)}")
  end

  it "displays destroy link" do
    customer = create(:customer)

    visit admin_customer_path(customer)

    expect { click_on "Destroy" }.to change(Customer, :count).from(1).to(0)
  end

  it "displays translated labels" do
    custom_label = "Newsletter Subscriber"
    customer = create(:customer)

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
      visit admin_customer_path(customer)

      expect(page).to have_css(".attribute-label", text: custom_label)
    end
  end

  it "displays translated labels in has_many collection partials" do
    custom_label = "Time shipped"
    customer = create(:customer)
    create(:order, customer: customer)

    translations = {
      administrate: {
        actions: {
          edit: "Edit",
          destroy: "Destroy",
          confirm: "Are you sure?",
        },
      },
      helpers: {
        label: {
          order: {
            shipped_at: custom_label,
          },
        },
      },
    }

    with_translations(:en, translations) do
      visit admin_customer_path(customer)

      expect(page).to have_css(".cell-label", text: custom_label)
    end
  end

  it "displays specified collection_attributes for the has_many association" do
    line_item = create(:line_item)

    visit admin_order_path(line_item.order)

    within(table_for_attribute(:line_items)) do
      columns = all("tr th").map do |e|
        e[:class]&.split&.last&.split("--line_item_")&.last
      end
      expect(%w[product quantity unit_price total_price]).to(
        eq(columns.first(4)),
      )
    end
  end

  def ids_in_table
    all("tr td:first-child").map(&:text).map(&:to_i)
  end

  def table_for_attribute(attr_name)
    find("table[aria-labelledby=#{attr_name}]")
  end
end
