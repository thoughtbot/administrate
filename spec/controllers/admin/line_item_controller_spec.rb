require "rails_helper"

describe Admin::LineItemsController, type: :controller do
  describe "GET index" do
    it "hides the search bar" do
      line_item = create(:line_item)

      locals = capture_view_locals { get :index }
      expect(locals[:show_search_bar]).to be_falsey
    end
  end
end

