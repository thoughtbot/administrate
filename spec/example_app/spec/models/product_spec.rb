require "rails_helper"

RSpec.describe Product do
  describe "validations" do
    it { should allow_value("http://example.com/foo/bar").for(:image_url) }
    it { should allow_value("https://example.com/foo/bar").for(:image_url) }
    it { should_not allow_value("ftp://example.com/foo/bar").for(:image_url) }
  end

  describe "#image_url" do
    it "is trimmed on save" do
      product = FactoryBot.create(
        :product,
        image_url: "\n https://example.com/foo/bar  \n",
      )
      expect(product.image_url).to eq("https://example.com/foo/bar")
    end
  end
end
