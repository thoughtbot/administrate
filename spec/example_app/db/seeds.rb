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
ProductMetaTag.destroy_all
Series.destroy_all
Country.destroy_all
LogEntry.destroy_all

countries = Country.create! [
  { code: "US", name: "USA" },
  { code: "CA", name: "Canada" },
  { code: "CN", name: "China" },
  { code: "RU", name: "Russia" },
  { code: "AU", name: "Australia" },
]

customer_attributes = Array.new(100) do
  name = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
  {
    name: name,
    email: Faker::Internet.safe_email(name),
    country: countries.sample,
    password: Faker::Internet.password,
  }
end

customers = Customer.create!(customer_attributes)

log_entry_attributes = customers.map do |c|
  {
    action: "create",
    logeable: c,
  }
end

LogEntry.create!(log_entry_attributes)

product_attributes = YAML.load_file(Rails.root.join('db/seeds/products.yml'))

product_attributes.each do |attributes|
  attributes = attributes.merge product_meta_tag_attributes: {
    meta_title: Faker::LordOfTheRings.character,
    meta_description: Faker::LordOfTheRings.location,
  }
  Product.create! attributes.merge(price: 20 + rand(50))
end

customers.each do |customer|
  (1..3).to_a.sample.times do
    order = Order.create!(
      customer: customer,
      address_line_one: Faker::Address.street_address,
      address_line_two: Faker::Address.secondary_address,
      address_city: Faker::Address.city,
      address_state: Faker::Address.state_abbr,
      address_zip: Faker::Address.zip,
    )
    LogEntry.create!(
      action: "create",
      logeable: order,
    )

    item_count = (1..3).to_a.sample
    Product.all.sample(item_count).each do |product|
      LineItem.create!(
        order: order,
        product: product,
        unit_price: product.price,
        quantity: (1..3).to_a.sample,
      )
    end
  end
end

Series.create!(name: "An example")
