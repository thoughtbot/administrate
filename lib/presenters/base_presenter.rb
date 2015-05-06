require "adapters/belongs_to_adapter"
require "adapters/email_adapter"
require "adapters/image_adapter"
require "adapters/string_adapter"

class BasePresenter
  def initialize(request)
    @request = request
  end

  def resource_name
    @resource_name ||=
      dashboard.class.to_s.scan(/(.+)Dashboard/).first.first.underscore
  end

  protected

  attr_reader :request

  def route(prefix, resource_name, resource = nil)
    path_helper = [prefix, resource_name, "path"].compact.join("_")
    arguments = [path_helper, resource].compact

    Rails.application.routes.url_helpers.public_send(*arguments)
  end

  def adapter(dashboard, resource, attribute_name)
    adapter_name = dashboard.attribute_adapters[attribute_name]
    value = resource.public_send(attribute_name)

    adapter_registry.fetch(adapter_name).new(value, request)
  end

  def adapter_registry
    {
      belongs_to: BelongsToAdapter,
      email: EmailAdapter,
      image: ImageAdapter,
      string: StringAdapter,
    }
  end
end
