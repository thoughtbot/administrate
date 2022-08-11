require "rails_helper"

RSpec.describe DocPage do
  describe ".find" do
    it "raises an error if the page doesn't exist" do
      expect do
        DocPage.find("not_a_page")
      end.to raise_error(DocPage::PageNotFound)
    end

    it "raises an error on cheeky paths" do
      expect do
        DocPage.find("docs/../spec/example_app/README")
      end.to raise_error(DocPage::PageNotAllowed)
    end

    it "renders pages without metadata" do
      page = DocPage.find("README")

      expect(page).to have_attributes(
        title: nil,
        body: a_string_matching(
          /A framework for creating flexible, powerful admin dashboards/,
        ),
      )
    end

    it "renders pages with metadata" do
      page = DocPage.find("docs/getting_started")

      expect(page).to have_attributes(
        title: "Getting Started",
        body: a_string_starting_with(
          "<h1>Getting Started</h1>\n\n<p>Administrate is " \
          "released as a Ruby gem",
        ),
      )
    end
  end
end
