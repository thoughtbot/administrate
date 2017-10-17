require "rails_helper"

describe Admin::LineItemsController, type: :controller do
  describe "GET index" do
    it "hides the search bar" do
      line_item = create(:line_item)

      get :index

      expect(assigns[:show_search_bar]).to be_falsey
    end
  end
end

