module Administrate
  module OrmAdapters
    module ActiveRecord
      class Base < ActiveRecordPattern::Base
        def model_class
          ::ActiveRecord::Base
        end

        def relation_class
          ::ActiveRecord::Relation
        end

        def wrap_record(record)
          if record.kind_of?(model_class)
            Record.new(wrap_model(record.class), record)
          else
            record
          end
        end

        def wrap_relation(relation)
          if relation.kind_of?(relation_class)
            Relation.new(relation)
          else
            relation
          end
        end

        def wrap_model(model)
          if has_ancestor?(model, model_class)
            Model.new(model)
          else
            model
          end
        end
      end
    end
  end
end
