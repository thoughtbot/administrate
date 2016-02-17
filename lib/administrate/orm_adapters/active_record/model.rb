require "active_support/core_ext/module/delegation"

module Administrate
  module OrmAdapters
    module ActiveRecord
      class Model < ActiveRecordPattern::Model
        delegate :table_exists?, :defined_enums, to: :@model

        def find(param)
          Record.new(self, @model.find(param))
        end

        def all
          Relation.new(@model.all)
        end

        def reflections
          @model.reflections.each_with_object({}) do |(k,v), a|
            obj = {
              type:
                if v.has_one?
                  :has_one
                elsif v.collection?
                  :collection
                end,
              polymorphic: v.polymorphic?,
              class_name: v.class_name,
              name: v.name
            }
            a[k.to_s] = obj
          end
        end

        def attribute_names
          @model.attribute_names
        end

        def column_types
          @model.column_types.each_with_object({}) do |(k,v), a|
            a[k.to_s] = { type: v.type }
          end
        end
      end
    end
  end
end
