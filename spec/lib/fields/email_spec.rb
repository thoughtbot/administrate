require "administrate/field/email"

describe Administrate::Field::Email do
  describe "#partial_prefixes" do
    it "returns the partial prefixes based on the field class" do
      page = :show
      field = Administrate::Field::Email.new(:email, "foo@example.com", page)

      prefixes = field.partial_prefixes

      expect(prefixes).to eq([
        "fields/email/looks/default", "fields/email",
        "fields/base/looks/default", "fields/base"
      ])
    end
  end
end
