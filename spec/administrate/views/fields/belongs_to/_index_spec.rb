require "rails_helper"

describe "fields/belongs_to/_index", type: :view do
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

  context "without an associated record" do
    let(:belongs_to) do
      instance_double(
        "Administrate::Field::BelongsTo",
        associated_class: associated_class,
        data: nil,
      )
    end

    it "displays nothing" do
      render_belongs_to_index
      expect(rendered.strip).to eq("")
    end
  end

  context "if associated resource has a show route" do
    context "and the user has permission to access it" do
      it "displays link" do
        allow(view).to receive(:accessible_action?).and_return(true)
        render_belongs_to_index
        expect(rendered.strip).to include(link)
      end
    end

    context "and the user does not have permission to access it" do
      it "hides link" do
        allow(view).to receive(:accessible_action?).and_return(false)
        render_belongs_to_index
        expect(rendered.strip).to_not include(link)
      end
    end
  end

  context "if associated resource has no show route" do
    it "hides link" do
      allow(view).to receive(:accessible_action?).and_return(false)
      render_belongs_to_index
      expect(rendered.strip).to_not include(link)
    end
  end

  def render_belongs_to_index
    render(
      partial: "fields/belongs_to/index",
      locals: { field: belongs_to, namespace: :admin },
    )
  end
end
