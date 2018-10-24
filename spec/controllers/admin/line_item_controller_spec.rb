require "rails_helper"

describe Admin::LineItemsController, type: :controller do
  describe "GET index" do
    it "hides the search bar" do
      line_item = create(:line_item)

      locals = capture_view_locals { get :index }
      expect(locals[:show_search_bar]).to be_falsey
    end
  end

  describe "GET new" do
    it "passes parent resource to new form page object" do
      locals = capture_view_locals { get :new, "order_id": 123 }

      expect(locals[:page].resource[:order_id]).to eq(123)
    end
  end
end
