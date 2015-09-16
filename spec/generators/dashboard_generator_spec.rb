require "rails_helper"
require "generators/administrate/dashboard/dashboard_generator"

describe Administrate::Generators::DashboardGenerator, :generator do
  describe "dashboard definition file" do
    it "has valid syntax" do
      dashboard = file("app/dashboards/customer_dashboard.rb")

      run_generator ["customer"]

      expect(dashboard).to exist
      expect(dashboard).to have_correct_syntax
    end

    describe "#attribute_types" do
      it "includes standard model attributes" do
        begin
          ActiveRecord::Schema.define do
            create_table(:foos) { |t| t.timestamps null: false }
          end

          class Foo < ActiveRecord::Base
            reset_column_information
          end

          run_generator ["foo"]
          load file("app/dashboards/foo_dashboard.rb")
          attrs = FooDashboard::ATTRIBUTE_TYPES

          expect(attrs[:id]).to eq(Administrate::Field::Number)
          expect(attrs[:created_at]).to eq(Administrate::Field::DateTime)
          expect(attrs[:updated_at]).to eq(Administrate::Field::DateTime)
        ensure
          remove_constants :Foo, :FooDashboard
        end
      end

      it "includes user-defined database columns" do
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain("name: Field::String,")
        expect(dashboard).to contain("email: Field::String,")
      end

      it "includes has_many relationships" do
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain("orders: Field::HasMany")
      end

      it "looks for class_name options on has_many fields" do
        class Customer < ActiveRecord::Base
          reset_column_information
          has_many :purchases, class_name: "Order", foreign_key: "purchase_id"
        end
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain(
          'purchases: Field::HasMany.with_options(class_name: "Order")',
        )
      end

      it "assigns numeric fields a type of `Number`" do
        begin
          ActiveRecord::Schema.define do
            create_table :inventory_items do |t|
              t.integer :quantity
              t.float :price
            end
          end

          class InventoryItem < ActiveRecord::Base
            reset_column_information
          end

          run_generator ["inventory_item"]
          load file("app/dashboards/inventory_item_dashboard.rb")
          attrs = InventoryItemDashboard::ATTRIBUTE_TYPES

          expect(attrs[:price]).
            to eq(Administrate::Field::Number.with_options(decimals: 2))
          expect(attrs[:quantity]).
            to eq(Administrate::Field::Number)
        ensure
          remove_constants :InventoryItem, :InventoryItemDashboard
        end
      end

      it "assigns dates, times, and datetimes a type of `DateTime`" do
        begin
          ActiveRecord::Schema.define do
            create_table :events do |t|
              t.date :start_date
              t.time :start_time
              t.datetime :ends_at
            end
          end

          class Event < ActiveRecord::Base
            reset_column_information
          end

          run_generator ["event"]
          load file("app/dashboards/event_dashboard.rb")
          attrs = EventDashboard::ATTRIBUTE_TYPES

          expect(attrs[:start_date]).to eq(Administrate::Field::DateTime)
          expect(attrs[:start_time]).to eq(Administrate::Field::DateTime)
          expect(attrs[:ends_at]).to eq(Administrate::Field::DateTime)
        ensure
          remove_constants :Event, :EventDashboard
        end
      end

      it "determines a class_name from `through` and `source` options" do
        begin
          ActiveRecord::Schema.define do
            create_table :people
            create_table :concerts
            create_table(:numbers) { |t| t.references :ticket }

            create_table :tickets do |t|
              t.references :concert
              t.references :attendee
            end
          end

          class Concert < ActiveRecord::Base
            reset_column_information
            has_many :tickets
            has_many :attendees, through: :tickets, source: :person
            has_many :venues, through: :tickets
            has_many :numbers, through: :tickets
          end

          class Ticket < ActiveRecord::Base
            reset_column_information
            belongs_to :concert
            belongs_to :person
            belongs_to :venue
            has_many :numbers
          end

          class Number; end
          class Person < ActiveRecord::Base
            reset_column_information
          end

          dashboard = file("app/dashboards/concert_dashboard.rb")

          run_generator ["concert"]

          expect(dashboard).to contain(
            'attendees: Field::HasMany.with_options(class_name: "Person"),',
          )
          expect(dashboard).to contain("venues: Field::HasMany,")
          expect(dashboard).to contain("numbers: Field::HasMany,")
        ensure
          remove_constants :Concert, :Ticket, :Number, :Person
        end
      end

      it "detects belongs_to relationships" do
        begin
          ActiveRecord::Schema.define do
            create_table(:comments) { |t| t.references :post }
          end
          class Comment < ActiveRecord::Base
            belongs_to :post
          end

          run_generator ["comment"]
          load file("app/dashboards/comment_dashboard.rb")
          attrs = CommentDashboard::ATTRIBUTE_TYPES

          expect(attrs[:post]).to eq(Administrate::Field::BelongsTo)
          expect(attrs.keys).not_to include(:post_id)
        ensure
          remove_constants :Comment, :CommentDashboard
        end
      end

      it "detects custom class names for belongs_to relationships" do
        begin
          ActiveRecord::Schema.define do
            create_table :users
            create_table :invitations do |t|
              t.references :sender
              t.references :recipient
            end
          end
          class User < ActiveRecord::Base; end
          class Invitation < ActiveRecord::Base
            belongs_to :sender, class_name: User
            belongs_to :recipient, class_name: "User"
          end

          run_generator ["invitation"]
          load file("app/dashboards/invitation_dashboard.rb")
          attrs = InvitationDashboard::ATTRIBUTE_TYPES

          expected_field = Administrate::Field::BelongsTo.
            with_options(class_name: "User")
          expect(attrs[:sender]).to eq(expected_field)
          expect(attrs[:recipient]).to eq(expected_field)
        ensure
          remove_constants :User, :Invitation, :InvitationDashboard
        end
      end

      it "detects polymorphic belongs_to relationships" do
        begin
          ActiveRecord::Schema.define do
            create_table :comments do |t|
              t.references :commentable, polymorphic: true
            end
          end
          class Comment < ActiveRecord::Base
            belongs_to :commentable, polymorphic: true
          end

          run_generator ["comment"]
          load file("app/dashboards/comment_dashboard.rb")
          attrs = CommentDashboard::ATTRIBUTE_TYPES

          expect(attrs[:commentable]).to eq(Administrate::Field::Polymorphic)
          expect(attrs.keys).not_to include(:commentable_id)
          expect(attrs.keys).not_to include(:commentable_type)
        ensure
          remove_constants :Comment, :CommentDashboard
        end
      end

      it "detects has_one relationships" do
        begin
          ActiveRecord::Schema.define do
            create_table :accounts

            create_table :profiles do |t|
              t.references :account
            end
          end

          class Account < ActiveRecord::Base
            reset_column_information
            has_one :profile
          end

          class Ticket < ActiveRecord::Base
            reset_column_information
            belongs_to :account
          end

          dashboard = file("app/dashboards/account_dashboard.rb")

          run_generator ["account"]

          expect(dashboard).to contain("profile: Field::HasOne")
        ensure
          remove_constants :Account, :Ticket
        end
      end
    end

    describe "TABLE_ATTRIBUTES" do
      it "is limited to a reasonable number of items" do
        begin
          ActiveRecord::Schema.define do
            create_table :foos do |t|
              %i(a b c d e f g).each { |attr| t.string attr }
            end
          end

          class Foo < ActiveRecord::Base
            reset_column_information
          end

          run_generator ["foo"]
          load file("app/dashboards/foo_dashboard.rb")
          all_attrs = FooDashboard::ATTRIBUTE_TYPES.keys
          table_attrs = FooDashboard::TABLE_ATTRIBUTES

          expect(table_attrs).to eq(all_attrs.first(table_attribute_limit))
          expect(table_attrs).not_to eq(all_attrs)
        ensure
          remove_constants :Foo, :FooDashboard
        end
      end

      def table_attribute_limit
        Administrate::Generators::DashboardGenerator::TABLE_ATTRIBUTE_LIMIT
      end
    end
  end
end
