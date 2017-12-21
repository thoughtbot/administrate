require "rails_helper"

describe "fields/has_many/_index", type: :view do
  context "without any associated records" do
    it "displays the pluralized attribute name" do
      has_many = double(
        data: double(
          size: 0,
        ),
        attribute: :teams,
      )

      render(
        partial: "fields/has_many/index.html.erb",
        locals: { field: has_many },
      )

      expect(rendered.strip).to eq("0 teams")
    end
  end

  context "with one associated record" do
    it "displays the singularized attribute name" do
      has_many = double(
        data: double(
          size: 1,
        ),
        attribute: :teams,
      )

      render(
        partial: "fields/has_many/index.html.erb",
        locals: { field: has_many },
      )

      expect(rendered.strip).to eq("1 team")
    end
  end

  context "with two associated records" do
    it "displays the pluralized attribute name" do
      has_many = double(
        data: double(
          size: 2,
        ),
        attribute: :teams,
      )

      render(
        partial: "fields/has_many/index.html.erb",
        locals: { field: has_many },
      )

      expect(rendered.strip).to eq("2 teams")
    end
  end
end
