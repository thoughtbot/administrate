module Administrate
  module OrmAdapters
    module Sequel
      class Base < ActiveRecordPattern::Base
        def model_class
          ::Sequel::Model
        end

        def relation_class
          ::Sequel::Dataset
        end
      end
    end
  end
end
