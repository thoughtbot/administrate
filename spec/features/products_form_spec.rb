require "rails_helper"

describe "product form has_one relationship" do
  include ActiveSupport::Testing::TimeHelpers

  it "saves product and meta tag data correctly", js: true do
    visit new_admin_product_path

    fill_in "Name", with: "Example"
    fill_in "Price", with: "0"
    fill_in "Description", with: "Example"
    fill_in "Image url", with: "http://imageurlthatdoesnotexist"
    fill_in "Meta title", with: "Example meta title"
    fill_in "Meta description", with: "Example meta description"
    fill_in_rich_text_area "Banner", with: <<~HTML
      <div>A banner with a <a href="https://example.com">link</a>.</div>
    HTML

    expect(page).to have_css("legend", text: "Product Meta Tag")

    click_on "Create Product"

    within(".trix-content div", text: "A banner with a link") do
      expect(page).to have_link("link", href: "https://example.com")
    end
    expect(page).to have_link("Example meta title")
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
      expect(page)
        .not_to have_select("Release year", with_options: [current_year])
    end
  end

  it "respects setting of label/value in Field::Select" do
    old_release_year = ProductDashboard::ATTRIBUTE_TYPES[:release_year]
    new_release_year = Administrate::Field::Select.with_options(
      collection: [
        ["Last Year", 2019],
        ["This Year", 2020]
      ]
    )
    ProductDashboard::ATTRIBUTE_TYPES[:release_year] = new_release_year

    visit new_admin_product_path
    expect(page).to have_select("Release year", with_options: ["This Year"])
    expect(page.find("option", match: :first).text).to eq("Last Year")
    expect(page.find("option", match: :first).value).to eq("2019")

    ProductDashboard::ATTRIBUTE_TYPES[:release_year] = old_release_year
  end

  it "edits product and meta tag data correctly", js: true do
    product = create(:product, banner: <<~HTML)
      <div>A banner with a <a href="https://example.com">link</a>.</div>
    HTML

    visit edit_admin_product_path(product)

    within(:rich_text_area, "Banner") do
      within("div", text: "A banner with a link") do
        expect(page).to have_link("link", href: "https://example.com")
      end
    end

    fill_in_rich_text_area "Banner", with: <<~HTML
      <div>A changed banner without a link.</div>
    HTML
    click_on "Update Product"

    within(".trix-content div", text: "A changed banner without a link.") do
      expect(page).to have_no_link(href: "https://example.com")
    end
    expect(page).to have_link(product.product_meta_tag.meta_title.to_s)
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
              product_meta_tag: custom_label
            }
          }
        }
      }

      with_translations(:en, translations) do
        visit edit_admin_product_path(product)

        expect(page).to have_css("legend", text: custom_label)
      end
    end
  end
end
