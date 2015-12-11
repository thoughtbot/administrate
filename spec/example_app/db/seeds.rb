# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

LineItem.destroy_all
Order.destroy_all
Customer.destroy_all
Product.destroy_all

100.times do
  name = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
  Customer.create(
    name: name,
    email: Faker::Internet.safe_email(name),
  )
end

product_attributes = YAML.load_file(Rails.root.join('db/seeds/products.yml'))

product_attributes.each do |attributes|
  Product.create attributes.merge(price: 20 + rand(50))
end

Customer.all.each do |customer|
  (1..3).to_a.sample.times do
    order = Order.create(
      customer: customer,
      address_line_one: Faker::Address.street_address,
      address_line_two: Faker::Address.secondary_address,
      address_city: Faker::Address.city,
      address_state: Faker::Address.state_abbr,
      address_zip: Faker::Address.zip,
      status: [0, 1].sample,
    )

    item_count = (1..3).to_a.sample
    Product.all.sample(item_count).each do |product|
      LineItem.create(
        order: order,
        product: product,
        unit_price: product.price,
        quantity: (1..3).to_a.sample,
      )
    end
  end
end
