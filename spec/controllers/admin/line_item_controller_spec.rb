require "rails_helper"

describe Admin::LineItemsController, type: :controller do
  describe "GET index" do
    it "hides the search bar" do
      create(:line_item)

      expect(value_assigned_to(:@show_search_bar)).to be_falsey
    end
  end
end
