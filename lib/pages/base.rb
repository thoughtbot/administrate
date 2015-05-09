module Page
  class Base
    def resource_name
      @resource_name ||=
        dashboard.class.to_s.scan(/(.+)Dashboard/).first.first.underscore
    end

    protected

    def route(prefix, resource_name, resource = nil)
      path_helper = [prefix, resource_name, "path"].compact.join("_")
      arguments = [path_helper, resource].compact

      Rails.application.routes.url_helpers.public_send(*arguments)
    end

    def attribute_field(dashboard, resource, attribute_name, page)
      value = resource.public_send(attribute_name)

      dashboard.
        field_class(attribute_name).
        new(attribute_name, value, page)
    end
  end
end
