require "ammeter/rspec/generator/example"
require "ammeter/rspec/generator/matchers"
require "ammeter/init"

module GeneratorSpecHelpers
  TEMPLATE_PATH = File.expand_path("../../app_templates", __FILE__)

  def stub_generator_dependencies
    allow(Rails::Generators).to receive(:invoke)
    provide_existing_routes_file
  end

  def provide_existing_routes_file
    copy_to_generator_root("config", "routes.rb")
  end

  def contents_for_application_template(view_name)
    File.read(
      "app/views/administrate/application/#{view_name}.html.erb",
    )
  end

  def invoke_generator(generator, args = [], options = { behavior: :invoke })
    have_received(:invoke).with(generator, args, options)
  end

  def each_file_in(path)
    files = Dir.glob(path)

    files.each do |file_path|
      if File.file?(file_path)
        yield file_path
      end
    end
  end

  def reset_routes
    Rails.application.routes.clear!
    load "spec/example_app/config/routes.rb"
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
