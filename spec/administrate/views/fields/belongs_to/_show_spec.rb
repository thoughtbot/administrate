require "rails_helper"

describe "fields/belongs_to/_show", type: :view do
  let(:product) { create(:product) }
  let(:product_path) { polymorphic_path([:admin, product]) }
  let(:link) { "<a href=\"#{product_path}\">#{product.name}</a>" }
  let(:associated_class) { "test_associated_class" }
  let(:belongs_to) do
    instance_double(
      "Administrate::Field::BelongsTo",
      associated_class: associated_class,
      display_associated_resource: product.name,
      data: product,
    )
  end

  context "if associated resource has a show route" do
    it "displays link" do
      allow(view).to receive(:valid_action?).and_return(true)
      render_belongs_to_show
      expect(rendered.strip).to include(link)
    end
  end

  context "if associated resource has no show route" do
    it "displays link" do
      allow(view).to receive(:valid_action?).and_return(false)
      render_belongs_to_show
      expect(rendered.strip).to_not include(link)
    end
  end

  def render_belongs_to_show
    render(
      partial: "fields/belongs_to/show.html.erb",
      locals: { field: belongs_to, namespace: "admin" },
    )
  end
end
