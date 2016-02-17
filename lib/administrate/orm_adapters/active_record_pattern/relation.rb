require "active_support/core_ext/module/delegation"

module Administrate
  module OrmAdapters
    module ActiveRecordPattern
      class Relation
        delegate :count, :size, :total_pages, :current_page, :limit_value,
                 :any?, to: :@relation
        delegate :each, :map, to: :to_a

        def initialize(relation)
          @relation = relation
        end

        # prepared statement style: where("a = ? OR b = ?", 1, 2)
        def where(*args)
          fail ArgumentError, "where must be given arguments in prepared statement style" unless args.first.is_a?(String)
          Administrate.orm_namespace::Relation.new(@relation.where(*args))
        end

        def limit(value)
          Administrate.orm_namespace::Relation.new(@relation.limit(value))
        end

        def unwrap
          @relation
        end

        def to_a
          @relation.to_a.map do |record|
            Administrate.orm.wrap_record(record)
          end
        end
      end
    end
  end
end
