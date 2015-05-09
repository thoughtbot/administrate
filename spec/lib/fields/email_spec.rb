require "spec_helper"
require "fields/email"

describe Field::Email do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Field::Email.new(:email, "foo@example.com", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/#{page}/email")
    end
  end
end
