require "find"

module Administrate
  module GeneratorHelpers
    DEFAULT_INDENT = 2
    ONE_INDENT = 1
    TWO_INDENT = 2
    OFFSET = 1
    INVALID_DATABASE_MODELS_LIST =  [
      "ActiveRecord::SchemaMigration",
      "ActiveRecord::InternalMetadata",
      "primary::SchemaMigration"
    ]

    def call_generator(generator, *args)
      Rails::Generators.invoke(generator, args, generator_options)
    end

    private

    def generator_options
      { behavior: behavior }
    end
  end
end
