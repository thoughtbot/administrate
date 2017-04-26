FactoryGirl.define do
  factory :customer do
    sequence(:name) { |n| "Customer #{n}" }
    email { name.downcase.gsub(" ", "_") + "@example.com" }
  end

  factory :line_item do
    order
    product
    unit_price 1.5
    quantity 1
  end

  factory :order do
    customer
    address_line_one "85 2nd St"
    address_line_two "#700"
    address_city "San Francisco"
    address_state "CA"
    address_zip "94110"
  end

  factory :product, class: 'Catalog::Product' do
    sequence(:name) { |n| "Monopoly #{n}" }
    price 10.50
    description "A cutthroat game of financial conquest"
    image_url \
      "https://cdn.recombu.com/mobile/images/news/M11370/1264769196_w670.jpg"
  end

  factory :payment do
    order
  end
end
