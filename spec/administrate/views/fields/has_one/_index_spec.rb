require "rails_helper"

describe "fields/has_one/_index", type: :view do
  let(:product) { create(:product) }
  let(:product_path) { polymorphic_path([:admin, product]) }
  let(:link) { "<a href=\"#{product_path}\">#{product.name}</a>" }
  let(:has_one) do
    instance_double(
      "Administrate::Field::HasOne",
      data: product,
      linkable?: true,
      display_associated_resource: product.name,
    )
  end

  context "without an associated record" do
    let(:has_one) do
      instance_double(
        "Administrate::Field::HasOne",
        linkable?: false,
      )
    end

    it "displays nothing" do
      allow(view).to receive(:accessible_action?).and_return(true)
      render_has_one_index
      expect(rendered.strip).to eq("")
    end
  end

  context "if associated resource has a show route" do
    context "and the user has permission to access it" do
      it "displays link" do
        allow(view).to receive(:accessible_action?).and_return(true)
        render_has_one_index
        expect(rendered.strip).to include(link)
      end
    end

    context "and the user does not have permission to access it" do
      it "hides link" do
        allow(view).to receive(:accessible_action?).and_return(false)
        render_has_one_index
        expect(rendered.strip).to_not include(link)
      end
    end
  end

  context "if associated resource has no show route" do
    it "hides link" do
      allow(view).to receive(:accessible_action?).and_return(false)
      render_has_one_index
      expect(rendered.strip).to_not include(link)
    end
  end

  def render_has_one_index
    render(
      partial: "fields/has_one/index",
      locals: { field: has_one, namespace: :admin },
    )
  end
end
