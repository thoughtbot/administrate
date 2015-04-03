# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Customer.destroy_all
Product.destroy_all

100.times do
  name = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
  Customer.create(
    name: name,
    email: Faker::Internet.free_email(name),
  )
end

product_attributes = YAML.load_file("./db/seeds/products.yml")

product_attributes.each do |attributes|
  Product.create attributes.merge(price: 20 + rand(50))
end
