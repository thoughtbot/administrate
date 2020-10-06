module Administrate
  module GeneratorHelpers
    def call_generator(generator, *args)
      Rails::Generators.invoke(generator, args, generator_options)
    end

    def find_routes_file
      routes_file = Rails.root.join("config/routes.rb")
      if File.exist?(routes_file)
        routes_file = find_file("routes.rb")
        raise "Unable to locate your routes.rb file" if routes_file.nil?
      end
      routes_file
    end

    private

    def generator_options
      { behavior: behavior }
    end

    def find_file(file_name)
      file = nil
      Find.find(Rails.root) do |path|
        Find.prune if path.include? ".git"

        next unless path.include? file_name

        file = path
      end
      file
    end
  end
end
