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
require "administrate/search"

class MockDashboard
  ATTRIBUTE_TYPES = {
    id: Administrate::Field::Number.with_options(searchable: true),
    name: Administrate::Field::String,
    email: Administrate::Field::Email,
    phone: Administrate::Field::Number,
  }.freeze

  COLLECTION_FILTERS = {
    vip: ->(resources) { resources.where(kind: :vip) },
  }.freeze
end

class MockDashboardWithStrictSearch < MockDashboard
  FILTER_MODE = :strict
end

class MockDashboardWithAssociation
  ATTRIBUTE_TYPES = {
    role: Administrate::Field::BelongsTo.with_options(
      searchable: true,
      searchable_field: "name",
    ),
    author: Administrate::Field::BelongsTo.with_options(
      searchable: true,
      searchable_fields: ["first_name", "last_name"],
    ),
    address: Administrate::Field::HasOne.with_options(
      searchable: true,
      searchable_fields: ["street"],
    ),
  }.freeze
end

describe Administrate::Search do
  before { ActiveSupport::Deprecation.silenced = true }
  after { ActiveSupport::Deprecation.silenced = false }

  describe "#run" do
    it "returns all records when no search term" do
      begin
        class User < ApplicationRecord; end
        scoped_object = User.default_scoped
        expect(scoped_object).to receive(:all)

        described_class.run(scoped_object,
                            MockDashboard,
                            nil)
      ensure
        remove_constants :User
      end
    end

    it "returns all records when search is empty" do
      begin
        class User < ApplicationRecord; end
        scoped_object = User.default_scoped
        expect(scoped_object).to receive(:all)

        described_class.run(scoped_object,
                            MockDashboard,
                            "   ")
      ensure
        remove_constants :User
      end
    end

    it "searches using LOWER + LIKE for all searchable fields" do
      begin
        class User < ApplicationRecord; end
        scoped_object = User.default_scoped
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

        described_class.run(scoped_object,
                            MockDashboard,
                            "test")
      ensure
        remove_constants :User
      end
    end

    it "converts search term LOWER case for latin and cyrillic strings" do
      begin
        class User < ApplicationRecord; end
        scoped_object = User.default_scoped
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

        described_class.run(scoped_object,
                            MockDashboard,
                            "Тест Test")
      ensure
        remove_constants :User
      end
    end

    context "with strict search mode" do
      it "searches equality for all searchable fields" do
        class User < ApplicationRecord; end
        scoped_object = User.default_scoped
        expected_query = [
          [
            '"users"."id" = ?',
            '"users"."name" = ?',
            '"users"."email" = ?',
          ].join(" OR "),
          "test",
          "test",
          "test",
        ]
        expect(scoped_object).to receive(:where).with(*expected_query)

        described_class.run(scoped_object,
                            MockDashboardWithStrictSearch,
                            "test")
      ensure
        remove_constants :User
      end
    end

    context "when searching through associations" do
      let(:scoped_object) { double(:scoped_object) }

      subject(:search_run) do
        described_class.run(
          scoped_object,
          MockDashboardWithAssociation,
          "Тест Test",
        )
      end

      let(:expected_query) do
        [
          'LOWER(CAST("roles"."name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("authors"."first_name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("authors"."last_name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("addresses"."street" AS CHAR(256))) LIKE ?',
          "%тест test%",
          "%тест test%",
          "%тест test%",
          "%тест test%",
        ]
      end

      it "joins with the correct association table to query" do
        allow(scoped_object).to receive(:where)

        expect(scoped_object).to receive(:joins).with(%i(role author address)).
          and_return(scoped_object)

        search_run
      end

      it "builds the 'where' clause using the joined tables" do
        allow(scoped_object).to receive(:joins).with(%i(role author address)).
          and_return(scoped_object)

        expect(scoped_object).to receive(:where).with(*expected_query)

        search_run
      end
    end

    it "searches using a filter" do
      begin
        class User < ActiveRecord::Base
          scope :vip, -> { where(kind: :vip) }
        end
        scoped_object = User.default_scoped
        expect(scoped_object).to \
          receive(:where).
          with(kind: :vip).
          and_return(scoped_object)
        expect(scoped_object).to receive(:where).and_return(scoped_object)

        described_class.run(scoped_object,
                            MockDashboard,
                            "vip:")
      ensure
        remove_constants :User
      end
    end
  end
end
