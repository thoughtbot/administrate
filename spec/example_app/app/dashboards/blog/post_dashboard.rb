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
      tags: Field::HasMany,
      cover_image: Field::ActiveStorage.with_options(index_display_preview: true, show_display_preview: true, direct_upload: true),
      images: Field::ActiveStorage.with_options(multiple: true, direct_upload: true),
    }

    READ_ONLY_ATTRIBUTES = [
      :id,
      :created_at,
      :updated_at
    ]

    COLLECTION_ATTRIBUTES = [
      :id,
      :cover_image,
      :title,
      :tags,
      :published_at
    ]

    FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys - READ_ONLY_ATTRIBUTES
    SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys

    def display_resource(resource)
      resource.title
    end
  end
end
