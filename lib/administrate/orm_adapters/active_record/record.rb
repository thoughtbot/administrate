module Administrate
  module OrmAdapters
    module ActiveRecord
      class Record < ActiveRecordPattern::Record
        def id
          @record.send(@model.unwrap.primary_key)
        end

        def get_attribute_value(attribute_name, field_type)
          Administrate.orm.wrap_any(@record.public_send(attribute_name))
        rescue NameError
          nil
        end
      end
    end
  end
end
