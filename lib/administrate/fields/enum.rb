require_relative "string"

module Administrate
  module Field
    class Enum < Field::String
      def self.search_predicate(attribute, term, options)
        if options.keys.include?(term)
          "#{attribute} = ?"
        end
      end

      def self.search_term(_attribute, term, options)
        if options.keys.include?(term)
          options[term]
        end
      end

      def data
        @data.to_s[0...truncation_length]
      end

      def enum_options
        options[:enum].keys.map { |k| [k.humanize, k] }
      end
    end
  end
end
