require "rails_helper"

RSpec.describe "product index page" do
  it "displays products' name and description" do
    product = create(:product)

    visit admin_products_path

    expect(page).to have_header("Products")
    expect(page).to have_content(product.name)
    expect(page).to have_content(product.description)
  end

  it "links to the product show page", :js do
    product = create(:product)

    visit admin_products_path
    click_row_for(product)

    expect(page).to have_content(product.name)
    expect(page).to have_content(product.description)
    expect(page).to have_current_path(admin_product_path(product))
  end

  it "links to the edit page" do
    product = create(:product)

    visit admin_products_path
    click_on "Edit"

    expect(page).to have_current_path(edit_admin_product_path(product))
  end

  it "links to the new page" do
    visit admin_products_path
    click_on("New product")

    expect(page).to have_current_path(new_admin_product_path)
  end

  scenario "product sorted by has_one association" do
    create(
      :product,
      product_meta_tag: build(:product_meta_tag, meta_title: "Gamma")
    )
    create(
      :product,
      product_meta_tag: build(:product_meta_tag, meta_title: "Alpha")
    )
    create(
      :product,
      product_meta_tag: build(:product_meta_tag, meta_title: "Beta")
    )

    visit admin_products_path

    within :table do
      expect(page).to have_css("tbody tr:nth-child(1)", text: "Gamma")
      expect(page).to have_css("tbody tr:nth-child(2)", text: "Alpha")
      expect(page).to have_css("tbody tr:nth-child(3)", text: "Beta")
    end

    click_on "Product Meta Tag"
    within :table do
      expect(page).to have_css("tbody tr:nth-child(1)", text: "Alpha")
      expect(page).to have_css("tbody tr:nth-child(2)", text: "Beta")
      expect(page).to have_css("tbody tr:nth-child(3)", text: "Gamma")
    end

    click_on "Product Meta Tag"
    within :table do
      expect(page).to have_css("tbody tr:nth-child(1)", text: "Gamma")
      expect(page).to have_css("tbody tr:nth-child(2)", text: "Beta")
      expect(page).to have_css("tbody tr:nth-child(3)", text: "Alpha")
    end
  end
end
