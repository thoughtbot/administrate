module Administrate
  module OrmAdapters
    module ActiveRecord
      class Relation < ActiveRecordPattern::Relation
        def can_order_by?(attr_name)
          @relation.columns_hash.keys.include?(attr_name.to_s)
        end

        def order(options)
          fail ArgumentError, "expected a Hash" unless options.kind_of?(Hash)

          Relation.new(@relation.order(options))
        end

        def paginate(page, per)
          Relation.new(@relation.page(page).per(per))
        end
      end
    end
  end
end
