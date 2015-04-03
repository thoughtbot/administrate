FactoryGirl.define do
  factory :customer do
    sequence(:name) { |n| "Customer #{n}" }
    email { name.downcase.underscore + "@example.com" }
  end

  factory :product do
    name "Monopoly"
    price 10.50
    description "A cutthroat game of financial conquest"
    image_url \
      "https://cdn.recombu.com/mobile/images/news/M11370/1264769196_w670.jpg"
  end
end
