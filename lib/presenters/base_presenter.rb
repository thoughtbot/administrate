require "adapters/email_adapter"
require "adapters/string_adapter"

class BasePresenter
  def resource_name
    @resource_name ||=
      dashboard.class.to_s.scan(/(.+)Dashboard/).first.first.downcase
  end

  protected

  def route(prefix, resource_name, resource = nil)
    path_helper = [prefix, resource_name, "path"].compact.join("_")
    arguments = [path_helper, resource].compact

    Rails.application.routes.url_helpers.public_send(*arguments)
  end

  def adapter(dashboard, resource, attribute_name)
    adapter_name = dashboard.attribute_adapters[attribute_name]
    value = resource.public_send(attribute_name)

    adapter_registry.fetch(adapter_name).new(value)
  end

  def adapter_registry
    {
      email: EmailAdapter,
      string: StringAdapter,
    }
  end
end
