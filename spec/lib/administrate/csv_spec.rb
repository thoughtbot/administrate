require "administrate/base_dashboard"
require "rails_helper"
# require "example_app/app/dashboards/order_dashboard"

describe Administrate::CSV do
  describe "#generate" do
    it "renders short plain values of fields" do
      class Foo
        def datetime
          Time.current
        end

        def string
          'string' * 100
        end

        def has_many_ids
          [has_one.id]
        end

        def number
          22.99
        end

        def email
          "john@example.com"
        end

        def password
          "secret"
        end

        def select
          :one
        end

        def text
          string
        end

        def time
          Time.current
        end

        def polymorphic
          Order.last
        end

        def belongs_to
          Order.last
        end

        def has_one
          Order.last
        end
      end

      class FooDashboard < Administrate::BaseDashboard
        ATTRIBUTE_TYPES = {
          datetime: Field::DateTime,
          string: Field::String,
          belongs_to: Field::BelongsTo.with_options(class_name: ::Order.name),
          has_many: Field::HasMany.with_options(class_name: ::Order.name),
          number: Field::Number.with_options(prefix: "$", decimals: 2),
          email: Field::Email,
          has_one: Field::HasOne.with_options(class_name: ::Order.name),
          password: Field::Password,
          polymorphic: Field::Polymorphic.with_options(classes: [::Order]),
          select: Field::Select.with_options(collection: [:one, :two]),
          text: Field::Text,
          time: Field::Time,
        }

        COLLECTION_ATTRIBUTES = ATTRIBUTE_TYPES.keys
      end

      customer = Customer.create!(name: 'customer', email: 'customer@example.com')
      order = Order.create!(
        customer: customer,
        address_line_one: Faker::Address.street_address,
        address_line_two: Faker::Address.secondary_address,
        address_city: Faker::Address.city,
        address_state: Faker::Address.state_abbr,
        address_zip: Faker::Address.zip,
      )

      dashboard = FooDashboard.new
      collection_page = Administrate::Page::Collection.new(dashboard)
      resource = Foo.new
      view_context_class = Class.new do
        def attribute_title(_resource_name, attribute)
          attribute
        end
      end
      csv = described_class.new([resource], collection_page, view_context_class.new)
      expect(CSV.parse(csv.generate)[1]).to(
        eq(collection_page.fields_for(resource).map(&:short_plain_text))
      )
    ensure
      remove_constants :Foo, :FooDashboard
    end
  end
end
