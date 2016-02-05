module Administrate
  module OrmAdapters
    module Sequel
      # This is needed because Sequel does not support <assoc>_ids accessor
      module AssociationIdsSupport
        def self.included(base)
          base.superclass.associations.each do |assoc_name|
            assoc_name_s = assoc_name.to_s
            next unless assoc_name_s == assoc_name_s.pluralize
            base.instance_eval do
              define_method "#{assoc_name_s.singularize}_ids" do
                _association_read_ids(assoc_name_s)
              end
              define_method "#{assoc_name_s.singularize}_ids=" do |ids|
                _association_write_ids(assoc_name_s, ids)
              end
            end
          end
        end

      private
        def _association_read_ids(name)
          if new?
            []
          else
            ds = send("#{name}_dataset")
            ds.select_map(:"#{ds.first_source_alias}__id")
          end
        end

        def _association_write_ids(name, ids)
          after_save_hook do
            ids.select(&:present?).map(&:to_i).each do |id|
              send("add_#{name.singularize}", id)
            end
          end
        end
      end

      class Record < ActiveRecordPattern::Record
        def initialize(model, record)
          @model = model
          @record = record
          unless record.kind_of?(AssociationIdsSupport)
            record.singleton_class.send :include,
              AssociationIdsSupport
          end
        end

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
