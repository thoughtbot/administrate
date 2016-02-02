module Administrate
  module OrmAdapters
    module Sequel
      class Relation < ActiveRecordPattern::Relation
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

        def paginate(page, per)
          Relation.new(@relation.limit(nil).paginate(page, per))
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
