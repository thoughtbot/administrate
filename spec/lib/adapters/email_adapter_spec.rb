require "spec_helper"
require "adapters/email_adapter"

describe EmailAdapter do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      adapter = EmailAdapter.new(:email, "foo@example.com", page)

      path = adapter.to_partial_path

      expect(path).to eq("/adapters/#{page}/email")
    end
  end
end
