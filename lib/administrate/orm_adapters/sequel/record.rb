module Administrate
  module OrmAdapters
    module Sequel
      class Record < ActiveRecordPattern::Record
        def id
          @record.pk
        end

        def save
          @record.save(raise_on_failure: false)
        end

        def update(attrs)
          @record.set(attrs)
          save
        end

        def get_attribute_value(attribute_name, field_type)
          if field_type.kind_of?(Field::Deferred)
            field_type = field_type.deferred_class
          end

          if Administrate.orm.has_ancestor?(field_type, Field::Associative)
            get_association_value(attribute_name, field_type)
          else
            Administrate.orm.wrap_any(get_raw_attribute_value(attribute_name))
          end
        end

        def get_association_value(attribute_name, field_type)
          dataset_method = :"#{attribute_name}_dataset"
          collection = Administrate.orm.has_ancestor?(field_type, Field::HasMany)
          if @record.respond_to?(dataset_method) && collection
            Administrate.orm.wrap_any(get_raw_attribute_value(dataset_method))
          else
            Administrate.orm.wrap_any(get_raw_attribute_value(attribute_name))
          end
        end

        def get_raw_attribute_value(attribute_name)
          @record.public_send(attribute_name)
        rescue NameError
          nil
        rescue ::Sequel::Error
          raise unless @record.new?
          nil
        end
      end
    end
  end
end
