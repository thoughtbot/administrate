require "rails_helper"

describe "product form has_one relationship" do
  include ActiveSupport::Testing::TimeHelpers

  it "saves product and meta tag data correctly" do
    visit new_admin_product_path

    fill_in "Name", with: "Example"
    fill_in "Price", with: "0"
    fill_in "Description", with: "Example"
    fill_in "Image url", with: "http://imageurlthatdoesnotexist"
    fill_in "Meta title", with: "Example meta title"
    fill_in "Meta description", with: "Example meta description"

    expect(page).to have_css("legend", text: "Product Meta Tag")

    click_on "Create Product"

    expect(page).to have_link(ProductMetaTag.last.id.to_s)
    expect(page).to have_flash(
      t("administrate.controller.create.success", resource: "Product")
    )
  end

  it "have dynamic release_year" do
    visit new_admin_product_path
    current_year = Time.current.year
    expect(page).to have_select("Release year", with_options: [current_year])

    travel_to(1.year.ago) do
      visit new_admin_product_path
      expect(page).
        not_to have_select("Release year", with_options: [current_year])
    end
  end

  it "edits product and meta tag data correctly" do
    product = create(:product)

    visit edit_admin_product_path(product)

    click_on "Update Product"

    expect(page).to have_link(product.product_meta_tag.id.to_s)
    expect(page).to have_flash(
      t("administrate.controller.update.success", resource: "Product")
    )
  end

  describe "has_one relationships" do
    it "displays translated labels" do
      custom_label = "Meta Tags"
      product = create(:product)

      translations = {
        helpers: {
          label: {
            product: {
              product_meta_tag: custom_label,
            },
          },
        },
      }

      with_translations(:en, translations) do
        visit edit_admin_product_path(product)

        expect(page).to have_css("legend", text: custom_label)
      end
    end
  end
end
