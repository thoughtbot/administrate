module Administrate
  module OrmAdapters
    module ActiveRecordPattern
      class Model
        delegate :where, to: :all

        def initialize(model)
          @model = model
        end

        def plural_name
          name.pluralize.underscore if name
        end

        def name
          @model.name
        end

        def model_inspect
          @model.inspect
        end

        def unwrap
          @model
        end

        def new(params = {})
          Administrate.orm_namespace::Record.new(self, @model.new(params))
        end
      end
    end
  end
end
