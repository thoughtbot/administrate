require_relative "base"

module Administrate
  module Field
    class BelongsTo < Field::Base
      def self.permitted_attribute(attr)
        :"#{attr}_id"
      end

      def permitted_attribute
        self.class.permitted_attribute(attribute)
      end

      def candidate_records
        Object.const_get(attribute.to_s.camelcase).all.map do |resource|
          ResourceWrapper.new(resource)
        end
      end

      private

      class ResourceWrapper < SimpleDelegator
        include Administrate::ApplicationHelper

        def to_s
          display_resource(__getobj__)
        end
      end
    end
  end
end
