require "rails_helper"
require "administrate/field/has_one"

describe "fields/has_one/_show", type: :view do
  before do
    view.extend Administrate::ApplicationHelper
    allow(view).to receive(:accessible_action?).and_return(true)
    allow(view).to receive(:namespace).and_return(:admin)
  end

  context "without a persisted record" do
    it "displays nothing" do
      has_one = Administrate::Field::HasOne.new(
        :product_meta_tag,
        build(:product_meta_tag),
        :show,
      )

      render(
        partial: "fields/has_one/show",
        locals: { field: has_one },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "with a persisted record" do
    before do
      field_resource = create(:product_meta_tag)
      @path_to_field_resource = polymorphic_path([:admin, field_resource])

      nested_simple_field = instance_double(
        "Administrate::Field::String",
        name: "simple_string_field",
        truncate: "string value",
        html_class: "string",
        to_partial_path: "fields/string/index",
      )

      nested_show_page_for_has_one = instance_double(
        "Administrate::Page::Show",
        resource: double(
          class: ProductMetaTag,
        ),
        attributes: { "" => [
          nested_simple_field,
        ] },
      )

      @has_one_field = instance_double(
        "Administrate::Field::HasOne",
        display_associated_resource: "The Nested Resource",
        data: field_resource,
        linkable?: true,
        nested_show: nested_show_page_for_has_one,
        associated_class_name: "NestedHasOne",
      )

      @page_double = instance_double("Administrate::Page::Show")
    end

    def render_field
      render(
        partial: "fields/has_one/show",
        locals: {
          field: @has_one_field,
          page: @page_double,
          resource_name: "parent_resource",
        },
      )
    end

    it "uses the correct labels for fields" do
      I18n.backend.translations(do_init: true)[:en].deep_merge!(
        helpers: {
          label: {
            nested_has_one: {
              simple_string_field: "Just a Simple String",
            },
          },
        },
      )

      render_field
      expect(rendered.strip).to include("Just a Simple String")
    end

    context "when linking the record is allowed" do
      it "renders a link to the record" do
        render_field
        link = "<a href=\"#{@path_to_field_resource}\">The Nested Resource</a>"
        expect(rendered.strip).to include(link)
      end
    end

    context "when linking the record is not allowed" do
      it "displays the record without a link" do
        allow(view).to receive(:accessible_action?).and_return(false)
        render_field
        expect(rendered.strip).to include("The Nested Resource")
        expect(rendered.strip).not_to include("<a")
      end
    end
  end

  context "when there are nested associations" do
    it "renders them" do
      # Let's pretend that a Customer has these associations:
      #
      #   has_one :page # The "nested_resource"
      #   has_many :payments # The "nested_collection"
      #
      # Here we render a HasOne field (a Customer)
      # that in turn has a HasOne and a HasMany
      field_resource = create(:customer)
      nested_resource = create(:page)
      nested_collection = create_list(:payment, 2)

      nested_has_many = instance_double(
        "Administrate::Field::HasMany",
        attribute: :payments,
        data: nested_collection,
        html_class: "has-many",
        name: "payments",
        to_partial_path: "fields/has_many/index",
      )

      nested_show_page_for_nested_has_one = instance_double(
        "Administrate::Page::Show",
        resource: double(
          class: ProductMetaTag,
        ),
        attributes: { "" => [] },
      )

      nested_has_one = instance_double(
        "Administrate::Field::HasOne",
        attribute: :page,
        data: nested_resource,
        linkable?: true,
        nested_show: nested_show_page_for_nested_has_one,
        html_class: "has-one",
        to_partial_path: "fields/has_one/show",
        display_associated_resource: "Resource Doubly Nested with HasOne",
        name: "page",
      )

      nested_show_page_for_top_has_one = instance_double(
        "Administrate::Page::Show",
        attributes: { "" => [nested_has_one, nested_has_many] },
      )

      has_one_field = instance_double(
        "Administrate::Field::HasOne",
        display_associated_resource: "Resource Nested with HasOne",
        data: field_resource,
        linkable?: true,
        nested_show: nested_show_page_for_top_has_one,
        associated_class_name: "NameOfAssociatedClass",
      )

      page_double = instance_double("Administrate::Page::Show")

      render(
        partial: "fields/has_one/show",
        locals: {
          field: has_one_field,
          page: page_double,
          resource_name: "product_meta_tag",
        },
      )

      expect(rendered.strip).to include("Resource Nested with HasOne")
      expect(rendered.strip).to include("Resource Doubly Nested with HasOne")
      expect(rendered.strip).to include("Payments")
      expect(rendered.strip).to include("2 payments")
    end
  end
end
