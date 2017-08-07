require "rails_helper"

describe "product form has_one relationship" do
  it "saves product and meta tag data correctly" do
    visit new_admin_product_path

    fill_in "Name", with: "Example"
    fill_in "Price", with: "0"
    fill_in "Description", with: "Example"
    fill_in "Image url", with: "http://imageurlthatdoesnotexist"
    fill_in "Meta title", with: "Example meta title"
    fill_in "Meta description", with: "Example meta description"

    click_on "Create Product"

    expect(page).to have_link(ProductMetaTag.last.id)
    expect(page).to have_flash(
      t("administrate.controller.create.success", resource: "Product")
    )
  end

  it "edits product and meta tag data correctly" do
    product = create(:product)

    visit edit_admin_product_path(product)

    click_on "Update Product"

    expect(page).to have_link(product.product_meta_tag.id)
    expect(page).to have_flash(
      t("administrate.controller.update.success", resource: "Product")
    )
  end
end
