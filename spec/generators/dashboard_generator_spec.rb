require "rails_helper"
require "generators/administrate/dashboard/dashboard_generator"
require "generators/administrate/test_record"

describe Administrate::Generators::DashboardGenerator, :generator do
  around do |example|
    ActiveRecord::Migration.suppress_messages do
      example.run
    end
  end

  describe "dashboard definition file" do
    it "has valid syntax" do
      dashboard = file("app/dashboards/customer_dashboard.rb")

      run_generator ["customer"]

      expect(Pathname.new(dashboard)).to exist
      expect(dashboard).to have_correct_syntax
    end

    describe "#attribute_types" do
      it "includes standard model attributes" do
        begin
          ActiveRecord::Schema.define do
            create_table(:foos) { |t| t.timestamps null: false }
          end

          class Foo < Administrate::Generators::TestRecord
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
        begin
          ActiveRecord::Schema.define do
            create_table(:foos) { |t| t.string :name }
          end

          class Foo < Administrate::Generators::TestRecord
            reset_column_information
          end

          run_generator ["foo"]
          load file("app/dashboards/foo_dashboard.rb")
          attrs = FooDashboard::ATTRIBUTE_TYPES

          expect(attrs[:name]).to eq(Administrate::Field::String)
        ensure
          remove_constants :Foo, :FooDashboard
        end
      end

      it "sorts the attributes" do
        begin
          ActiveRecord::Schema.define do
            create_table(:foos, primary_key: :code) do |t|
              t.string :col_2
              t.string :col_1
              t.string :col_3
              t.timestamps
            end
          end

          class Foo < Administrate::Generators::TestRecord
            reset_column_information
          end

          run_generator ["foo"]
          load file("app/dashboards/foo_dashboard.rb")
          attrs = FooDashboard::ATTRIBUTE_TYPES.keys

          expect(attrs).to eq(%i[code col_1 col_2 col_3 created_at updated_at])
        ensure
          remove_constants :Foo, :FooDashboard
        end
      end

      it "defaults to a string column that is not searchable" do
        begin
          ActiveRecord::Schema.define do
            create_table(:foos) { |t| t.inet :ip_address }
          end

          class Foo < Administrate::Generators::TestRecord
            reset_column_information
          end

          run_generator ["foo"]
          load file("app/dashboards/foo_dashboard.rb")
          attrs = FooDashboard::ATTRIBUTE_TYPES

          expect(attrs[:ip_address]).
            to eq(Administrate::Field::String.with_options(searchable: false))
        ensure
          remove_constants :Foo, :FooDashboard
        end
      end

      it "includes has_many relationships" do
        dashboard = file("app/dashboards/customer_dashboard.rb")

        run_generator ["customer"]

        expect(dashboard).to contain("orders: Field::HasMany")
      end

      it "assigns numeric fields a type of `Number`" do
        begin
          ActiveRecord::Schema.define do
            create_table :inventory_items do |t|
              t.integer :quantity
              t.float :price
            end
          end

          class InventoryItem < Administrate::Generators::TestRecord
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

      it "detects enum field as `Select`" do
        ActiveRecord::Schema.define do
          create_table :shipments do |t|
            t.integer :status
          end
        end

        class Shipment < Administrate::Generators::TestRecord
          enum status: %i[ready processing shipped]
          reset_column_information
        end

        run_generator ["shipment"]
        load file("app/dashboards/shipment_dashboard.rb")
        attrs = ShipmentDashboard::ATTRIBUTE_TYPES

        expect(attrs[:status].deferred_class).to eq(Administrate::Field::Select)
      ensure
        remove_constants :Shipment, :ShipmentDashboard
      end

      it "handles collection procs option in the 'Select' field" do
        ActiveRecord::Schema.define do
          create_table :shipments do |t|
            t.integer :status
          end
        end

        class Shipment < Administrate::Generators::TestRecord
          enum status: %i[ready processing shipped]
          reset_column_information
        end

        run_generator ["shipment"]
        load file("app/dashboards/shipment_dashboard.rb")
        attrs = ShipmentDashboard::ATTRIBUTE_TYPES
        enum_collection_option = attrs[:status].options[:collection]
        select_field = Administrate::Field::Select.new(:status,
                                                       nil,
                                                       attrs[:status].options,
                                                       resource: Shipment.new)

        expect(enum_collection_option.call(select_field)).
          to eq(Shipment.statuses.keys)
      ensure
        remove_constants :Shipment, :ShipmentDashboard
      end

      it "detects boolean values" do
        begin
          ActiveRecord::Schema.define do
            create_table(:users) { |t| t.boolean :active }
          end

          class User < Administrate::Generators::TestRecord
            reset_column_information
          end

          run_generator ["user"]
          load file("app/dashboards/user_dashboard.rb")
          attrs = UserDashboard::ATTRIBUTE_TYPES

          expect(attrs[:active]).to eq(Administrate::Field::Boolean)
        ensure
          remove_constants :User, :UserDashboard
        end
      end

      it "assigns dates, times, and datetimes a type of `Date`, `DateTime` and
      `Time` respectively" do
        begin
          ActiveRecord::Schema.define do
            create_table :events do |t|
              t.date :start_date
              t.time :start_time
              t.datetime :ends_at
            end
          end

          class Event < Administrate::Generators::TestRecord
            reset_column_information
          end

          run_generator ["event"]
          load file("app/dashboards/event_dashboard.rb")
          attrs = EventDashboard::ATTRIBUTE_TYPES

          expect(attrs[:start_date]).to eq(Administrate::Field::Date)
          expect(attrs[:start_time]).to eq(Administrate::Field::Time)
          expect(attrs[:ends_at]).to eq(Administrate::Field::DateTime)
        ensure
          remove_constants :Event, :EventDashboard
        end
      end

      it "detects belongs_to relationships" do
        begin
          ActiveRecord::Schema.define do
            create_table(:comments) { |t| t.references :post }
          end
          class Comment < Administrate::Generators::TestRecord
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

      it "detects polymorphic belongs_to relationships" do
        begin
          ActiveRecord::Schema.define do
            create_table :comments do |t|
              t.references :commentable, polymorphic: true
            end
          end
          class Comment < Administrate::Generators::TestRecord
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

          class Account < Administrate::Generators::TestRecord
            reset_column_information
            has_one :profile
          end

          class Ticket < Administrate::Generators::TestRecord
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

      if ActiveRecord.version >= Gem::Version.new(5)
        it "skips temporary attributes" do
          begin
            ActiveRecord::Schema.define do
              create_table :accounts
            end

            class Account < Administrate::Generators::TestRecord
              reset_column_information
              attribute :tmp_attribute, :boolean
            end

            dashboard = file("app/dashboards/account_dashboard.rb")

            run_generator ["account"]

            expect(dashboard).not_to contain("tmp_attribute")
          ensure
            remove_constants :Account
          end
        end
      end
    end

    describe "COLLECTION_ATTRIBUTES" do
      it "is limited to a reasonable number of items" do
        begin
          ActiveRecord::Schema.define do
            create_table :foos do |t|
              %i(a b c d e f g).each { |attr| t.string attr }
            end
          end

          class Foo < Administrate::Generators::TestRecord
            reset_column_information
          end

          run_generator ["foo"]
          load file("app/dashboards/foo_dashboard.rb")
          all_attrs = FooDashboard::ATTRIBUTE_TYPES.keys.sort
          table_attrs = FooDashboard::COLLECTION_ATTRIBUTES

          expect(table_attrs).to contain_exactly(
            :id,
            *all_attrs.first(table_attribute_limit - 1),
          )
          expect(table_attrs).not_to eq(all_attrs)
        ensure
          remove_constants :Foo, :FooDashboard
        end
      end

      def table_attribute_limit
        Administrate::Generators::DashboardGenerator::COLLECTION_ATTRIBUTE_LIMIT
      end
    end

    describe "FORM_ATTRIBUTES" do
      it "does not include read-only attributes" do
        begin
          ActiveRecord::Schema.define do
            create_table :foos do |t|
              t.string :name
              t.timestamps null: true
            end
          end

          class Foo < Administrate::Generators::TestRecord
            reset_column_information
          end

          run_generator ["foo"]
          load file("app/dashboards/foo_dashboard.rb")
          attrs = FooDashboard::FORM_ATTRIBUTES

          expect(attrs).to match_array([:name])
        ensure
          remove_constants :Foo, :FooDashboard
        end
      end
    end
  end

  describe "SHOW_PAGE_ATTRIBUTES" do
    it "includes all attributes" do
      begin
        ActiveRecord::Schema.define do
          create_table :foos do |t|
            t.string :name
            t.timestamps null: true
          end
        end

        class Foo < Administrate::Generators::TestRecord
          reset_column_information
        end

        run_generator ["foo"]
        load file("app/dashboards/foo_dashboard.rb")

        attrs = FooDashboard::SHOW_PAGE_ATTRIBUTES
        expect(attrs).to match_array([:name, :id, :created_at, :updated_at])
      ensure
        remove_constants :Foo, :FooDashboard
      end
    end
  end

  describe "resource controller" do
    it "has valid syntax" do
      controller = file("app/controllers/admin/customers_controller.rb")

      run_generator ["customer"]

      expect(Pathname.new(controller)).to exist
      expect(controller).to have_correct_syntax
    end

    it "subclasses Admin::ApplicationController by default" do
      begin
        ActiveRecord::Schema.define { create_table :foos }
        class Foo < Administrate::Generators::TestRecord; end

        run_generator ["foo"]
        load file("app/controllers/admin/foos_controller.rb")

        expect(Admin::FoosController.ancestors).
          to include(Admin::ApplicationController)
      ensure
        remove_constants :Foo
        Admin.send(:remove_const, :FoosController)
      end
    end

    it "uses the given namespace to create controllers" do
      begin
        ActiveRecord::Schema.define { create_table :foos }
        class Foo < Administrate::Generators::TestRecord; end
        module Manager
          class ApplicationController < Administrate::ApplicationController; end
        end

        run_generator ["foo", "--namespace", "manager"]
        load file("app/controllers/manager/foos_controller.rb")

        expect(Manager::FoosController.ancestors).
          to include(Manager::ApplicationController)
      ensure
        remove_constants :Foo
        Manager.send(:remove_const, :FoosController)
      end
    end
  end
end
