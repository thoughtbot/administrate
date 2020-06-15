require "rails_helper"

describe "authorization" do
  before do
    class TestProductPolicy < ProductPolicy
      class Scope < ProductPolicy::Scope
        def resolve
          scope.where("price < :threshold", threshold: 15)
        end
      end

      def show?
        false
      end
    end

    @original_product_policy = Product.policy_class
    Product.policy_class = TestProductPolicy
  end

  after do
    Product.policy_class = @original_product_policy
  end

  it "shows link to resource for which index? is authorized" do
    visit admin_customers_path
    navigation = find(".navigation")
    expect(navigation).to have_link("Products")
  end

  it "hides link to resource for which index? is not authorized" do
    visit admin_customers_path
    navigation = find(".navigation")
    expect(navigation).not_to have_link("Orders")
  end

  it "renders all results yielded by the scope" do
    p0 = create(:product, name: "Shown", price: 10)
    p1 = create(:product, name: "Hidden", price: 20)

    visit admin_products_path

    expect(page).to have_content(p0.name)
    expect(page).not_to have_content(p1.name)
    expect(page).to have_css(".js-table-row", count: 1)
  end
end
