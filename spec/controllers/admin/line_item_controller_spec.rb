require "rails_helper"

describe Admin::LineItemsController, type: :controller do
  describe "GET index" do
    it "does not hide the search bar" do
      line_item = create(:line_item)

      locals = capture_view_locals { get :index }
      expect(locals[:show_search_bar]).to be_truthy
    end
  end
end
