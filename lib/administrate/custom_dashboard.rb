module Administrate
  class CustomDashboard
    include Administrate

    class << self
      def resource_name(_opts)
        @named_resource.pluralize.titleize
      end

      def resource(resource_name)
        @named_resource = resource_name
      end
    end
  end
end
