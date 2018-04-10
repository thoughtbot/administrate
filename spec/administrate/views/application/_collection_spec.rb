require "rails_helper"

RSpec.describe "administrate/application/_collection", type: :view do
  let(:authorization_predicate) { true }
  let(:default_namespace) { "admin" }

  context "without valid show action" do
    it "renders record attributes without show links" do
      product = create(:product, name: "administrate")
      product_path = polymorphic_path([:admin, product])
      collection_presenter = double(
        :collection_presenter,
        attribute_types: {},
        resource_name: "product",
      )
      name_attribute = double(
        :name_attribute,
        html_class: "string",
      )
      allow(collection_presenter).to receive(:attributes_for).
        with(product).
        and_return([name_attribute])
      allow(view).to receive(:valid_action?).and_return(true)
      allow(view).to receive(:valid_action?).
        with(:show, "product").
        and_return(false)
      allow(view).to receive(:show_action?).and_return(authorization_predicate)
      allow(view).to receive(:namespace).and_return(default_namespace)
      allow(view).to receive(:render_field).
        with(name_attribute).
        and_return(product.name)

      render(
        "administrate/application/collection",
        collection_presenter: collection_presenter,
        resources: [product],
        table_title: "page-title",
      )

      expect(rendered).to_not include(
        "<a class=\"action-show\" href=\"#{product_path}\">#{product.name}</a>",
      )
    end

    it "renders record row without js link" do
      product = create(:product)
      product_path = polymorphic_path([:admin, product])
      collection_presenter = double(
        :collection_presenter,
        attribute_types: {},
        resource_name: "product",
      )
      allow(collection_presenter).to receive(:attributes_for).
        with(product).
        and_return([])
      allow(view).to receive(:valid_action?).and_return(true)
      allow(view).to receive(:valid_action?).
        with(:show, "product").
        and_return(false)
      allow(view).to receive(:show_action?).and_return(authorization_predicate)
      allow(view).to receive(:namespace).and_return(default_namespace)

      render(
        "administrate/application/collection",
        collection_presenter: collection_presenter,
        resources: [product],
        table_title: "page-title",
      )

      expect(rendered).to_not have_xpath("//tr[data-url=\"#{product_path}\"]")
    end
  end
end
