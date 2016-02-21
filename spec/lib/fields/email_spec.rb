require "administrate/field/email"

describe Administrate::Field::Email do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Email.new(:email, "foo@example.com", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/email/#{page}")
    end
  end
end
