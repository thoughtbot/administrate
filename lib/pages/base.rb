module Page
  class Base
    def initialize(dashboard)
      @dashboard = dashboard
    end

    def resource_name
      @resource_name ||=
        dashboard.class.to_s.scan(/(.+)Dashboard/).first.first.underscore
    end

    protected

    def attribute_field(dashboard, resource, attribute_name, page)
      value = resource.public_send(attribute_name)

      dashboard.
        field_class(attribute_name).
        new(attribute_name, value, page)
    end

    protected

    attr_reader :dashboard
  end
end
