FactoryBot.define do
  factory :customer do
    association :territory, factory: :country
    sequence(:name) { |n| "Customer #{n}" }
    email { name.downcase.gsub(" ", "_") + "@example.com" }

    transient do
      order_count { 3 }
    end

    trait :with_orders do
      after(:create) do |customer, evaluator|
        create_list(:order, evaluator.order_count, customer: customer)
      end
    end
  end

  factory :line_item do
    order
    product
    unit_price { 1.5 }
    quantity { 1 }
  end

  factory :log_entry do
    action { "create" }
    association :logeable, factory: :customer
  end

  factory :order do
    customer
    address_line_one { "85 2nd St" }
    sequence(:address_line_two) { |n| "#700 (#{n})" }
    address_city { "San Francisco" }
    address_state { "CA" }
    address_zip { "94110" }
  end

  factory :product do
    sequence(:name) { |n| "Monopoly #{n}" }
    price { 10.50 }
    description { "A cutthroat game of financial conquest" }
    image_url do
      "https://cdn.recombu.com/mobile/images/news/M11370/1264769196_w670.jpg"
    end
    product_meta_tag
    release_year { [2018, 2019, 2020].sample }
  end

  factory :product_meta_tag do
    meta_title { "meta_title" }
    meta_description { "meta_description" }
  end

  factory :payment do
    order
  end

  factory :blog_post, class: "Blog::Post" do
    sequence(:title) { |n| "Post #{n}" }
    body { "Empty" }
  end

  factory :blog_tag, class: "Blog::Tag" do
    name { Faker::NatoPhoneticAlphabet.code_word.downcase }
  end

  factory :series do
    sequence(:name) { |n| "Series #{n}" }
  end

  factory :country do
    sequence(:name) { |n| "Country #{n}" }
    sequence(:code) { |n| "C#{n}" }
  end

  factory :page
end
