Rails.application.eager_load!

class InstallGenerator < Rails::Generators::Base
  source_root File.expand_path("../templates", __FILE__)

  def create_dashboard_controller
    copy_file(
      "dashboard_controller.rb",
      "app/controllers/admin/dashboard_controller.rb"
    )
  end

  def create_dashboard_manifest
    template(
      "dashboard_manifest.rb.erb",
      "app/dashboards/dashboard_manifest.rb"
    )
  end

  def insert_dashboard_routes
    route(dashboard_routes)
  end

  private

  def dashboard_resources
    database_models.map do |model_class|
      model_class.to_s.pluralize.underscore
    end
  end

  def database_models
    ActiveRecord::Base.descendants
  end

  def dashboard_routes
    File.read(routes_file_path)
  end

  def routes_file_path
    File.expand_path(find_in_source_paths("routes.rb"))
  end
end
