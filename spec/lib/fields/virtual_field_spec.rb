require "rails_helper"
require "administrate/field/base"

module Administrate
  module Field
    class VirtualField < Field::Base
      def self.searchable?
        false
      end

      def read_value(data = nil)
        resource.inspect
      end

      def foobar
        "This is a Foobar: #{data}"
      end
    end
  end
end

describe Administrate::Field::VirtualField do
  describe "#foobar" do
    it "displays the foobar" do
      resource = double("Model", inspect: "Inspecting")

      field = Administrate::Field::VirtualField.new(
        :virtual_field,
        nil,
        :show,
        resource: resource
      )

      expect(field.foobar).to eq("This is a Foobar: Inspecting")
    end
  end
end
