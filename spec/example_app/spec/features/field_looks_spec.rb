require "rails_helper"

RSpec.feature "Field Looks", type: :feature do
  it "renders the product card with its image on the page index page" do
    product = create(:product, name: "Test Product", image_url: "https://example.com/image.jpg")
    create(:page, title: "Test Page", product: product)

    visit admin_pages_path

    expect(page).to have_content("Test Product")
    expect(page).to have_css("img[src='https://example.com/image.jpg']")
  end

  it "renders the product card with its image on the page show page" do
    product = create(:product, name: "Test Product", image_url: "https://example.com/image.jpg")
    page_record = create(:page, title: "Test Page", product: product)

    visit admin_page_path(page_record)

    expect(page).to have_content("Test Product")
    expect(page).to have_css("img[src='https://example.com/image.jpg']")
  end

  it "renders the product card with its image in the has_many section on the order show page" do
    product = create(:product, name: "Test Product", image_url: "https://example.com/image.jpg")
    order = create(:order)
    create(:line_item, order: order, product: product)

    visit admin_order_path(order)

    expect(page).to have_content("Test Product")
    expect(page).to have_css("img[src='https://example.com/image.jpg']")
  end

  it "renders the release year as a group select on the product edit page" do
    product = create(:product, name: "Test Product", release_year: Time.current.year)

    visit edit_admin_product_path(product)

    expect(page).to have_selector("select[name*='release_year'] optgroup")
  end
end
