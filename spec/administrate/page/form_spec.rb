require "rails_helper"
require "support/constant_helpers"
require "administrate/page/form"
require "administrate/base_dashboard"
require 'administrate/field/string'

describe Administrate::Page::Form do
  describe "#page_title" do
    context "when virtual attribute is used as title" do
      it "return value of the attribute" do
        begin
          Foo = Class.new
          DecoratedFoo = Class.new do
            def self.title
              "foobar"
            end

            define_method "bar" do
              self.class.title
            end
          end
          FooDashboard = Class.new(Administrate::BaseDashboard) do
            ATTRIBUTE_TYPES = {
                bar: Administrate::Field::String
            }
            FORM_ATTRIBUTES = [:bar]

            def decorate_resource(resource)
              DecoratedFoo.new
            end

            def display_resource(resource)
              resource.bar
            end
          end
          form = Administrate::Page::Form.new(FooDashboard.new, Foo.new)
          expect(form.page_title).to eq DecoratedFoo.title
        ensure
          remove_constants :Foo, :FooDashboard, :DecoratedFoo
        end
      end
    end
  end
end
