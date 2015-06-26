require "rails_helper"

describe "fields/show/_has_many", type: :view do
  context "without any associated records" do
    it "displays 'None'" do
      has_many = double(data: [])

      render(
        partial: "fields/show/has_many.html.erb",
        locals: { has_many: has_many },
      )

      expect(rendered.strip).to eq(t("administrate.fields.has_many.none"))
    end
  end
end
