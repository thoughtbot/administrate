require "csv"

module Administrate
  class SearchTermParser
    def self.parse(term)
      all_terms = CSV.parse(term).first
      return if all_terms.blank?

      all_terms.map.with_object({}) do |tuple, hash|
        label, term = tuple.split(/:\s+/)

        if term.blank?
          hash[:all] = label.strip
        elsif hash[label.strip.to_sym].present? &&
              !hash[label.strip.to_sym].is_a?(Array)
          hash[label.strip.to_sym] = Array(hash[label.strip.to_sym])
          hash[label.strip.to_sym] << term.strip
        else
          hash[label.strip.to_sym] = term.strip
        end
      end
    end
  end
end
