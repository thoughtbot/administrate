FactoryGirl.define do
  factory :customer do
    sequence(:name) { |n| "Customer #{n}" }
    email { name.downcase.underscore + "@example.com" }
  end
end
