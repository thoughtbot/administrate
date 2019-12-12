require "rails_helper"

RSpec.feature "Authorization", type: :feature do
  before do
    class ProductPolicy::Scope
      def resolve
        scope.where('price < :threshold', threshold: 15)
      end
    end
  end

  it "renders all results yielded by the scope" do
    p0 = create(:product, name: "Shown", price: 10)
    p1 = create(:product, name: "Hidden", price: 20)

    visit admin_products_path

    expect(page).to have_content(p0.name)
    expect(page).not_to have_content(p1.name)
    expect(page).to have_css('.js-table-row', count: 1)
  end
end
