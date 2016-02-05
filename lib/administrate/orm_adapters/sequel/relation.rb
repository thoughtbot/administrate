module Administrate
  module OrmAdapters
    module Sequel
      # This is needed for Kaminari to work with Sequel
      module RelationKaminariSupport
        def num_pages
          page_count
        end

        def total_pages
          page_count
        end

        def limit_value
          page_size
        end
      end

      class Relation < ActiveRecordPattern::Relation
        def initialize(relation)
          @relation = relation
          unless relation.respond_to?(:total_pages)
            relation.singleton_class.send :include, RelationKaminariSupport
          end
        end

        def can_order_by?(attr_name)
          return false unless attr_name

          @relation.model.columns.include?(attr_name.to_sym)
        end

        def order(options)
          fail ArgumentError, "expected a Hash" unless options.kind_of?(Hash)

          relation = @relation
          options.each_pair do |k, v|
            fail ArgumentError, "wrong direction #{v.inspect}" unless
              [:asc, :desc].include?(v)
            relation = relation.order_append(::Sequel.send(v, k.to_sym))
          end
          Relation.new(relation)
        end

        def paginate(page_no, per)
          page_no = page_no.to_i
          page_no = page_no == 0 ? 1 : page_no
          Relation.new(@relation.limit(nil).paginate(page_no, per))
        end

        def size
          @relation.count
        end

        def any?
          !@relation.empty?
        end

        def to_a
          @relation.all.map do |record|
            Administrate.orm.wrap_record(record)
          end
        end
      end
    end
  end
end
