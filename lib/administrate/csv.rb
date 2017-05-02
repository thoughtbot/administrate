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
          show = Administrate::Page::Show.new(page.dashboard, resource)
          csv << show.attributes.map do |field|
            field_data resource, field
          end
        end
      end
    end

    private

    def field_data(resource, field)
      case field
      when Field::HasMany
        attribute(resource, field).size
      when Field::HasOne, Field::BelongsTo
        field.display_associated_resource
      else
        field.render_page || attribute(resource, field)
      end
    end

    def attribute(resource, field)
      resource.__send__(field.attribute)
    end

    def headers
      page.dashboard.show_page_attributes.map do |attribute|
        attribute.to_s.humanize.upcase
      end
    end
  end
end
