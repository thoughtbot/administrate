require "ammeter/rspec/generator/example"
require "ammeter/rspec/generator/matchers"
require "ammeter/init"

module GeneratorSpecHelpers
  TEMPLATE_PATH = File.expand_path("../../app_templates", __FILE__)

  def provide_existing_routes_file
    copy_to_generator_root("config", "routes.rb")
  end

  def contents_for_application_template(view_name)
    File.read(
      "app/views/administrate/application/#{view_name}.html.erb",
    )
  end

  private

  def copy_to_generator_root(destination, template)
    template_file = File.join(TEMPLATE_PATH, destination, template)
    destination = File.join(destination_root, destination)

    FileUtils.mkdir_p(destination)
    FileUtils.cp(template_file, destination)
  end
end

RSpec.configure do |config|
  config.include GeneratorSpecHelpers

  config.before(:example, :generator) do
    destination File.expand_path("../../../tmp", __FILE__)
    prepare_destination
  end
end
