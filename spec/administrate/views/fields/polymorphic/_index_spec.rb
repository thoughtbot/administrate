require "rails_helper"

describe "fields/polymorphic/_index", type: :view do
  let(:product) { create(:product) }
  let(:product_path) { polymorphic_path([:admin, product]) }
  let(:link) { "<a href=\"#{product_path}\">#{product.name}</a>" }
  let(:polymorphic) do
    instance_double(
      "Administrate::Field::Polymorphic",
      data: product,
      display_associated_resource: product.name,
    )
  end

  context "without an associated record" do
    let(:polymorphic) do
      instance_double(
        "Administrate::Field::Polymorphic",
        data: nil,
      )
    end

    it "displays nothing" do
      render_polymorphic_index
      expect(rendered.strip).to eq("")
    end
  end

  context "if associated resource has a show route" do
    context "and the user has permission to access it" do
      it "displays link" do
        allow(view).to receive(:accessible_action?).and_return(true)
        render_polymorphic_index
        expect(rendered.strip).to include(link)
      end
    end

    context "and the user does not have permission to access it" do
      it "hides link" do
        allow(view).to receive(:accessible_action?).and_return(false)
        render_polymorphic_index
        expect(rendered.strip).to_not include(link)
      end
    end
  end

  context "if associated resource has no show route" do
    it "hides link" do
      allow(view).to receive(:accessible_action?).and_return(false)
      render_polymorphic_index
      expect(rendered.strip).to_not include(link)
    end
  end

  def render_polymorphic_index
    render(
      partial: "fields/polymorphic/index",
      locals: { field: polymorphic, namespace: :admin },
    )
  end
end
