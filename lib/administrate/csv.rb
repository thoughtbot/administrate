require "csv"

module Administrate
  class CSV
    attr_reader :collection_page, :resources

    def initialize(resources, collection_page, view_context)
      @resources = resources
      @collection_page = collection_page
      @view_context = view_context
    end

    def generate
      ::CSV.generate(headers: true) do |csv|
        csv << headers

        block = lambda do |resource|
          csv << collection_page.fields_for(resource).map(&:short_plain_text)
        end
        if resources.respond_to?(:find_each)
          resources.find_each(&block)
        else
          resources.each(&block)
        end
      end
    end

    private

    attr_reader :view_context

    def headers
      collection_page.attribute_names.map do |attribute|
        view_context.attribute_title(collection_page.resource_name, attribute)
      end
    end
  end
end
