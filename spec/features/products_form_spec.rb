require "rails_helper"

describe "product form has_one relationship" do
  include ActiveSupport::Testing::TimeHelpers

  it "saves product and meta tag data correctly", :js do
    visit new_admin_product_path

    fill_in "Name", with: "Example"
    fill_in "Price", with: "0"
    fill_in "Description", with: "Example"
    fill_in "Image url", with: "http://imageurlthatdoesnotexist"
    within_fieldset "Product Meta Tag" do
      fill_in "Meta title", with: "Example meta title"
      fill_in "Meta description", with: "Example meta description"
    end
    attach_file "Hero image", file_fixture("image.png")

    click_on "Create Product"

    expect(page).to have_link("Example meta title")
      .and(have_element("img", src: /image.png/))
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

  it "edits product and meta tag data correctly" do
    product = create(:product)

    visit edit_admin_product_path(product)

    click_on "Update Product"

    expect(page).to have_link(product.product_meta_tag.meta_title.to_s)
    expect(page).to have_flash(
      t("administrate.controller.update.success", resource: "Product")
    )
  end

  it "edits has_one_attached :hero_image" do
    product = create(:product, hero_image: file_fixture("image.svg"))
    hero_image = product.hero_image

    visit edit_admin_product_path(product)
    attach_file "Hero image", file_fixture("image.png")
    click_on "Update Product"

    expect(page).to have_element("img", src: /image.png/)
      .and(have_no_element("img", src: /image.svg/))
    expect { hero_image.reload }.to raise_error(ActiveRecord::RecordNotFound)
  end

  it "attaches has_many_attached :thumbnails" do
    product = create(:product, thumbnails: [file_fixture("image.png")])
    thumbnail = product.thumbnails.first

    visit edit_admin_product_path(product)
    check thumbnail.filename.to_s
    attach_file "Thumbnails", file_fixture("image.svg")
    click_on "Update Product"

    expect(page).to have_element("img", src: /#{thumbnail.filename}/)
      .and(have_element("img", src: /image.svg/))
  end

  it "removes has_many_attached :thumbnails" do
    product = create(:product, thumbnails: [file_fixture("image.png")])
    thumbnail = product.thumbnails.first

    visit edit_admin_product_path(product)
    uncheck thumbnail.filename.to_s
    click_on "Update Product"

    expect(page).to have_no_element("img", src: /#{thumbnail.filename}/)
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
