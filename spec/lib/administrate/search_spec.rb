require "rails_helper"
require "administrate/field/belongs_to"
require "administrate/field/boolean"
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
    activated: Administrate::Field::Boolean,
  }.freeze
end

class MockDashboardWithAssociation
  ATTRIBUTE_TYPES = {
    role: Administrate::Field::BelongsTo.with_options(
      searchable: true,
      searchable_field: "name",
    ),
    address: Administrate::Field::HasOne.with_options(
      searchable: true,
      searchable_field: "street",
    ),
  }.freeze
end

describe Administrate::Search do
  describe "#run" do
    it "returns all records when no search term" do
      class User < ActiveRecord::Base; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(scoped_object,
                                        MockDashboard,
                                        nil)
      expect(scoped_object).to receive(:all)

      search.run
    ensure
      remove_constants :User
    end

    it "returns all records when search is empty" do
      class User < ActiveRecord::Base; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(scoped_object,
                                        MockDashboard,
                                        "   ")
      expect(scoped_object).to receive(:all)

      search.run
    ensure
      remove_constants :User
    end

    it "searches using LOWER + LIKE for all searchable fields" do
      class User < ActiveRecord::Base; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(scoped_object,
                                        MockDashboard,
                                        "test")
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
      class User < ActiveRecord::Base; end
      scoped_object = User.default_scoped
      search = Administrate::Search.new(scoped_object,
                                        MockDashboard,
                                        "Тест Test")
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
      let(:scoped_object) { double(:scoped_object) }

      let(:search) do
        Administrate::Search.new(
          scoped_object,
          MockDashboardWithAssociation,
          "Тест Test",
        )
      end

      let(:expected_query) do
        [
          'LOWER(CAST("roles"."name" AS CHAR(256))) LIKE ?'\
          ' OR LOWER(CAST("addresses"."street" AS CHAR(256))) LIKE ?',
          "%тест test%",
          "%тест test%",
        ]
      end

      it "joins with the correct association table to query" do
        allow(scoped_object).to receive(:where)

        expect(scoped_object).to receive(:joins).with(%i(role address)).
          and_return(scoped_object)

        search.run
      end

      it "builds the 'where' clause using the joined tables" do
        allow(scoped_object).to receive(:joins).with(%i(role address)).
          and_return(scoped_object)

        expect(scoped_object).to receive(:where).with(*expected_query)

        search.run
      end
    end

    context "when using advanced search" do
      it "accepts single-word searches on specific fields" do
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "email:test")
        expected_query = ['LOWER(CAST("users"."email" AS CHAR(256))) LIKE ?',
                          "%test%"]
        expect(scoped_object).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end

      it "accepts multi-word searches on specific fields" do
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "name:'multiple words'")
        expected_query = ['LOWER(CAST("users"."name" AS CHAR(256))) LIKE ?',
                          "%multiple words%"]
        expect(scoped_object).to receive(:where).with(*expected_query)

        search.run
      ensure
        remove_constants :User
      end

      it "accepts searches on boolean fields" do
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "activated:true")
        expected_query = { activated: true }
        expect(scoped_object).to receive(:where).with(expected_query)

        search.run
      ensure
        remove_constants :User
      end

      it "accepts mixed basic/advanced searches" do
        class User < ActiveRecord::Base; end
        scoped_object = User.default_scoped
        search = Administrate::Search.new(scoped_object,
                                          MockDashboard,
                                          "hello activated:true name:test")
        basic_query = [
          [
            'LOWER(CAST("users"."id" AS CHAR(256))) LIKE ?',
            'LOWER(CAST("users"."email" AS CHAR(256))) LIKE ?',
          ].join(" OR "),
          "%hello%",
          "%hello%",
        ]
        boolean_query = { activated: true }
        string_query = ['LOWER(CAST("users"."name" AS CHAR(256))) LIKE ?',
                        "%test%"]
        expect(scoped_object).to receive(:where).once.ordered.
          with(*basic_query).
          and_return(scoped_object)
        expect(scoped_object).to receive(:where).once.ordered.
          with(boolean_query).
          and_return(scoped_object)
        expect(scoped_object).to receive(:where).once.ordered.
          with(*string_query)

        search.run
      ensure
        remove_constants :User
      end
    end
  end
end
