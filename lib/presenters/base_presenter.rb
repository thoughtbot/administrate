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
end
