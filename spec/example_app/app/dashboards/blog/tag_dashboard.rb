require "administrate/base_dashboard"

module Blog
  class TagDashboard < Administrate::BaseDashboard
    ATTRIBUTE_TYPES = {
      id: Field::Number,
      name: Field::String,
      created_at: Field::DateTime,
      updated_at: Field::DateTime,
      posts: Field::HasMany,
    }.freeze

    COLLECTION_ATTRIBUTES = %i[
      id
      name
      posts
      created_at
    ].freeze

    FORM_ATTRIBUTES = %i[
      name
      posts
    ].freeze

    SHOW_PAGE_ATTRIBUTES = COLLECTION_ATTRIBUTES

    def display_resource(resource)
      resource.name
    end
  end
end
