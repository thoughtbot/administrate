module Administrate
  module OrmAdapters
    module ActiveRecordPattern
      class Base
        def find_models
          model_class.descendants.map do |model|
            wrap_model(model)
          end
        end

        def find_model(name)
          wrap_model(Object.const_get(name))
        end

        def has_ancestor?(klass, ancestor)
          return false unless klass.respond_to?(:ancestors)
          klass.ancestors.include?(ancestor)
        end

        def wrap_record(record)
          if record.kind_of?(model_class)
            Administrate.orm_namespace::Record.new(wrap_model(record.class), record)
          else
            record
          end
        end

        def wrap_relation(relation)
          if relation.kind_of?(relation_class)
            Administrate.orm_namespace::Relation.new(relation)
          else
            relation
          end
        end

        def wrap_model(model)
          if has_ancestor?(model, model_class)
            Administrate.orm_namespace::Model.new(model)
          else
            model
          end
        end

        def wrap_any(object)
          return unless object

          if object.kind_of?(model_class)
            wrap_record(object)
          elsif object.kind_of?(relation_class)
            wrap_relation(object)
          elsif has_ancestor?(object, model_class)
            wrap_model(object)
          else
            object
          end
        end
      end
    end
  end
end
