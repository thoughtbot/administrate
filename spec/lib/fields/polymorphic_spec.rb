require "administrate/field/polymorphic"
require "support/constant_helpers"
require "support/field_matchers"

describe Administrate::Field::Polymorphic do
  include FieldMatchers

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Polymorphic.new(:foo, "hello", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/polymorphic/#{page}")
    end
  end

  it { should_permit_param(:foo, for_attribute: :foo) }

  describe "#display_associated_resource" do
    it "displays through the dashboard based on the polymorphic class name" do
      begin
        Thing = Class.new
        ThingDashboard = Class.new do
          def display_resource(*)
            :success
          end
        end

        field = Administrate::Field::Polymorphic.new(:foo, Thing.new, :show)
        display = field.display_associated_resource

        expect(display).to eq :success
      ensure
        remove_constants :Thing, :ThingDashboard
      end
    end
  end
end
