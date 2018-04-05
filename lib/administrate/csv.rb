require "csv"

module Administrate
  class CSV
    attr_reader :page, :resources

    def initialize(resources, page, view_context)
      @resources = resources
      @page = page
      @view_context = view_context
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

    attr_reader :view_context

    def headers
      page.attribute_names.map do |attribute|
        view_context.attribute_title(page.resource_name, attribute)
      end
    end
  end
end
