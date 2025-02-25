require "administrate/field/email"

describe Administrate::Field::Email do
  describe "#partial_prefixes" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Email.new(:email, "foo@example.com", page)

      prefixes = field.partial_prefixes

      expect(prefixes).to eq(["fields/email", "fields/base"])
    end
  end
end
