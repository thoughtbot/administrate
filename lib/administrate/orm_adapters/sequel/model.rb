module Administrate
  module OrmAdapters
    module Sequel
      class Model < ActiveRecordPattern::Model
        def table_exists?
          @model.db.table_exists?(@model.table_name) if @model.table_name
        end

        def find(param)
          Record.new(self, @model.where(@model.primary_key => param).first!)
        end

        def all
          Relation.new(@model.dataset)
        end

        def reflections
          @model.association_reflections.each_with_object({}) do |(k,v), a|
            obj = {
              type:
                case v[:type]
                when :one_to_one then :has_one
                when :one_to_many, :many_to_many then :collection
                end,
              polymorphic: false,
              class_name: v[:class_name],
              name: v[:name]
            }
            a[k.to_s] = obj
          end
        end

        def attribute_names
          @model.columns.map(&:to_s)
        end

        def column_types
          @model.db_schema.each_with_object({}) do |(k,v), a|
            a[k.to_s] = { type: v[:type] || v[:db_type].to_sym || :unknown }
          end
        end
      end
    end
  end
end
