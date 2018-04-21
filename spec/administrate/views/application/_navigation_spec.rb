require "rails_helper"

describe "application/_navigation", type: :view do
  let(:namespace) { "admin" }
  let(:resource_name) { "Products" }

  before(:each) do
    allow(view).to receive(:display_resource_name) { |name| name.to_s.titleize }
    allow(view).to receive(:class_from_resource) { |resource| resource }
    allow(view).to receive(:resource_index_route_key) { Product }
    allow(view).to receive(:nav_link_state) { :inactive }
  end

  context "if you are allowed to view this resource index" do
    it "displays link" do
      allow(view).to receive(:show_action?).and_return(true)
      render_navigation
      expect(view).to have_received(:display_resource_name).at_least(:once)
      expect(rendered.strip).to include(resource_name)
    end
  end

  context "if you are not allowed to view this resource index" do
    it "doesn't display the link" do
      allow(view).to receive(:show_action?).and_return(false)
      render_navigation
      expect(view).not_to have_received(:display_resource_name)
      expect(rendered.strip).not_to include(resource_name)
    end
  end

  def render_navigation
    render(
      partial: "administrate/application/navigation",
      locals: { namespace: namespace },
    )
  end
end
