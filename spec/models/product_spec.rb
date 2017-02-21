require "rails_helper"

RSpec.describe Product do
  describe "validations" do
    it { should validate_presence_of(:description) }
    it { should validate_presence_of(:image_url) }
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:price) }

    it "should not allow names that produce empty slugs" do
      product = build(:product, name: "???")

      product.validate

      expect(product.errors[:name]).
        to include("must have letters or numbers for the URL")
    end

    context "with other products in the database" do
      subject { build(:product) }

      it { should validate_uniqueness_of(:slug) }
    end
  end

  it "deletes associated line_items when deleted itself" do
    product = create(:product)
    customer = create(:customer)
    order = create(:order, customer: customer)
    create(:line_item, product: product, order: order)

    product.destroy

    expect(Product.all).to be_empty
  end

end
