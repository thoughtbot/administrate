require "administrate/base_dashboard"

module Blog
  class PostDashboard < Administrate::BaseDashboard
    ATTRIBUTE_TYPES = {
      id: Field::Number,
      created_at: Field::DateTime,
      updated_at: Field::DateTime,
      title: Field::String,
      published_at: Field::DateTime,
      body: Field::Text,
    }

    READ_ONLY_ATTRIBUTES = [
      :id,
      :created_at,
      :updated_at,
    ]

    COLLECTION_ATTRIBUTES = [
      :id,
      :title,
      :published_at,
    ]

    FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys - READ_ONLY_ATTRIBUTES
    SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

    def display_resource(resource)
      resource.title
    end
  end
end
