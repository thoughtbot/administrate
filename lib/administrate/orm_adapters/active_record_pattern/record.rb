module Administrate
  module OrmAdapters
    module ActiveRecordPattern
      class Record
        def initialize(model, record)
          @model = model
          @record = record
        end

        def save
          @record.save
        end

        def update(params)
          @record.update(params)
        end

        def destroy
          @record.destroy
        end

        # for polymorphic_url
        def to_model
          @record
        end

        def model_class
          @model
        end

        def errors
          @record.errors
        end

        def unwrap
          @record
        end

        def method_missing(meth, *args, &block)
          if @record.respond_to?(meth)
            @record.send(meth, *args, &block)
          else
            super
          end
        end
      end
    end
  end
end
