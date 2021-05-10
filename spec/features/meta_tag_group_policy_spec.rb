require "rails_helper"

RSpec.describe "meta tag group show page" do
  it "return to metaTagGroup show after destroying productMetaTag", js: true do
    meta_tag_group = create(:meta_tag_group)

    visit admin_meta_tag_group_path meta_tag_group

    accept_confirm do
      click_on t("administrate.actions.destroy")
    end

    message_label = "administrate.controller.destroy.success"
    expect(page).to have_flash(
      t(message_label, resource: "Product meta tag"),
    )

    expect(page.current_path).to eq(admin_meta_tag_group_path(meta_tag_group))
  end
end
