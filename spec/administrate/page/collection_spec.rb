require "rails_helper"
require "administrate/page/collection"
require "administrate/field/string"
require "administrate/field/text"

describe Administrate::Page::Collection do
  describe "#search_term" do
    context "when provided a search term" do
      it "returns the search term" do
        dashboard = double(:dashboard)
        dashboard_page = Administrate::Page::Collection.new(
          dashboard,
          search_term: "foo",
        )

        expect(dashboard_page.search_term).to eq "foo"
      end
    end

    context "when not provided a search term" do
      it "returns nil" do
        dashboard = double(:dashboard)
        dashboard_page = Administrate::Page::Collection.new(dashboard)

        expect(dashboard_page.search_term).to be_nil
      end
    end
  end

  describe "#show_search_bar?" do
    context "when the dashboard has searchable attributes" do
      it "returns true" do
        dashboard = double(:dashboard)
        allow(dashboard).to receive(:collection_attributes).and_return([:title])
        allow(dashboard).to receive(:attribute_types_for).
          with([:title]).
          and_return(title: Administrate::Field::String)
        dashboard_page = Administrate::Page::Collection.new(dashboard)

        expect(dashboard_page.show_search_bar?).to be_truthy
      end
    end

    context "when the dashboard lacks searchable attributes" do
      it "returns false" do
        dashboard = double(:dashboard)
        allow(dashboard).to receive(:collection_attributes).and_return([:body])
        allow(dashboard).to receive(:attribute_types_for).
          with([:body]).
          and_return(body: Administrate::Field::Text)
        dashboard_page = Administrate::Page::Collection.new(dashboard)

        expect(dashboard_page.show_search_bar?).to be_falsy
      end
    end
  end
end
