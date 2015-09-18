require "rails_helper"

describe "fields/has_many/_show", type: :view do
  context "without any associated records" do
    it "displays 'None'" do
      has_many = double(resources: [])

      render(
        partial: "fields/has_many/show.html.erb",
        locals: { field: has_many },
      )

      expect(rendered.strip).to eq(t("administrate.fields.has_many.none"))
    end
  end
end
