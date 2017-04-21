require_relative "associative"

module Administrate
  module Field
    class HasOne < Associative
      def self.permitted_attribute(attr)
        related_dashboard_attributes =
          Administrate::ResourceResolver.new("admin/#{attr}").
          dashboard_class.new.permitted_attributes + [:id]
        
        { "#{attr}_attributes": related_dashboard_attributes }
      end
    end
  end
end
