require_relative "string"

module Administrate
  module Field
    class Enum < Field::String
      def self.search_predicate(attribute, term, options)
        if options.keys.include?(term)
          "#{attribute} = ?"
        else
          nil
        end
      end

      def self.search_term(attribute, term, options)
        if options.keys.include?(term)
          options[term]
        else
          nil
        end
      end
    end
  end
end
