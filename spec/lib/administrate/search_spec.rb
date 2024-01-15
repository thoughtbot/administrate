require "rails_helper"
require "spec_helper"
require "support/constant_helpers"
require "administrate/field/belongs_to"
require "administrate/field/string"
require "administrate/field/email"
require "administrate/field/has_many"
require "administrate/field/has_one"
require "administrate/field/number"
require "administrate/field/string"
require "administrate/base_dashboard"
require "administrate/search"

describe Administrate::Search do
  before :all do
    module Administrate
      module SearchSpecMocks
        class MockRecord < ApplicationRecord
          def self.table_name
            name.demodulize.underscore.pluralize
          end
        end

        class Role < MockRecord; end
        class Person < MockRecord; end
        class Address < MockRecord; end

        class Foo < MockRecord
          belongs_to :role
          belongs_to(
            :author,
            class_name: "Administrate::SearchSpecMocks::Person",
          )
          has_one :address
        end

        class UserDashboard < Administrate::BaseDashboard
          ATTRIBUTE_TYPES = {
            id: Administrate::Field::Number.with_options(searchable: true),
            name: Administrate::Field::String,
            email: Administrate::Field::Email,
            phone: Administrate::Field::Number,
          }.freeze

          COLLECTION_FILTERS = {
            vip: ->(resource) { resource.where(kind: :vip) },
            kind: ->(resource, param) { resource.where(kind: param) },
          }.freeze
        end

        class FooDashboard < Administrate::BaseDashboard
          ATTRIBUTE_TYPES = {
            role: Administrate::Field::BelongsTo.with_options(
              searchable: true,
              searchable_field: "name",
            ),
            author: Administrate::Field::BelongsTo.with_options(
              searchable: true,
              searchable_fields: ["first_name", "last_name"],
              class_name: "Administrate::SearchSpecMocks::Person",
            ),
            address: Administrate::Field::HasOne.with_options(
              searchable: true,
              searchable_fields: ["street"],
            ),
          }.freeze
        end
      end
    end
  end

  after :all do
    Administrate.send(:remove_const, :SearchSpecMocks)
  end

  before { Administrate.deprecator.silenced = true }
  after { Administrate.deprecator.silenced = false }

  describe "#run" do
    it "returns all records when no search term" do
      class User < ApplicationRecord; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(
        scoped_object,
        Administrate::SearchSpecMocks::UserDashboard.new,
        nil,
      )
      expect(scoped_object).to receive(:all)

      search.run
    ensure
      remove_constants :User
    end

    it "returns all records when search is empty" do
      class User < ApplicationRecord; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(
        scoped_object,
        Administrate::SearchSpecMocks::UserDashboard.new,
        "   ",
      )
      expect(scoped_object).to receive(:all)

      search.run
    ensure
      remove_constants :User
    end

    it "searches using LOWER + LIKE for all searchable fields" do
      class User < ApplicationRecord; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(
        scoped_object,
        Administrate::SearchSpecMocks::UserDashboard.new,
        "test",
      )
      expected_query = [
        [
          'LOWER(CAST("users"."id" AS CHAR(256))) LIKE ?',
          'LOWER(CAST("users"."name" AS CHAR(256))) LIKE ?',
          'LOWER(CAST("users"."email" AS CHAR(256))) LIKE ?',
        ].join(" OR "),
        "%test%",
        "%test%",
        "%test%",
      ]
      expect(scoped_object).to receive(:where).with(*expected_query)

      search.run
    ensure
      remove_constants :User
    end

    it "converts search term LOWER case for latin and cyrillic strings" do
      class User < ApplicationRecord; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(
        scoped_object,
        Administrate::SearchSpecMocks::UserDashboard.new,
        "Тест Test",
      )
      expected_query = [
        [
          'LOWER(CAST("users"."id" AS CHAR(256))) LIKE ?',
          'LOWER(CAST("users"."name" AS CHAR(256))) LIKE ?',
          'LOWER(CAST("users"."email" AS CHAR(256))) LIKE ?',
        ].join(" OR "),
        "%тест test%",
        "%тест test%",
        "%тест test%",
      ]
      expect(scoped_object).to receive(:where).with(*expected_query)

      search.run
    ensure
      remove_constants :User
    end

    context "when searching through associations" do
      before do
        allow(Administrate.deprecator).to receive(:warn)
      end

      let(:scoped_object) { Administrate::SearchSpecMocks::Foo }

      let(:search) do
        Administrate::Search.new(
          scoped_object,
          Administrate::SearchSpecMocks::FooDashboard.new,
          "Тест Test",
        )
      end

      let(:expected_query) do
        [
          'LOWER(CAST("roles"."name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("people"."first_name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("people"."last_name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("addresses"."street" AS CHAR(256))) LIKE ?',
          "%тест test%",
          "%тест test%",
          "%тест test%",
          "%тест test%",
        ]
      end

      it "joins with the correct association table to query" do
        allow(scoped_object).to receive(:where)
        allow(scoped_object).to receive(:left_joins).and_return(scoped_object)

        search.run

        expect(scoped_object).to(
          have_received(:left_joins).with(%i(role author address)),
        )
      end

      it "builds the 'where' clause using the joined tables" do
        allow(scoped_object).to receive(:where)
        allow(scoped_object).to receive(:left_joins).and_return(scoped_object)

        search.run

        expect(scoped_object).to(
          have_received(:where).with(*expected_query),
        )
      end

      it "triggers a deprecation warning" do
        allow(scoped_object).to receive(:where)
        allow(scoped_object).to(
          receive(:left_joins).
            with(%i(role author address)).
            and_return(scoped_object),
        )

        search.run

        expect(Administrate.deprecator).to have_received(:warn).
          with(/:class_name is deprecated/)
      end
    end

    it "searches using a filter" do
      class User < ApplicationRecord
        scope :vip, -> { where(kind: :vip) }
      end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(
        scoped_object,
        Administrate::SearchSpecMocks::UserDashboard.new,
        "vip:",
      )
      expect(scoped_object).to \
        receive(:where).
        with(kind: :vip).
        and_return(scoped_object)
      expect(scoped_object).to receive(:where).and_return(scoped_object)

      search.run
    ensure
      remove_constants :User
    end
  end
end
