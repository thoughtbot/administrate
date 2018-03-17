require "csv"

module Administrate
  class CSV
    attr_reader :page, :resources

    def initialize(resources, page)
      @resources = resources
      @page = page
    end

    def generate
      ::CSV.generate(headers: true) do |csv|
        csv << headers

        resources.find_each do |resource|
          csv << page.fields_for(resource).map(&:short_plain_text)
        end
      end
    end

    private

    def headers
      page.attribute_names.map do |attribute|
        page.attribute_title(attribute)
      end
    end
  end
end
