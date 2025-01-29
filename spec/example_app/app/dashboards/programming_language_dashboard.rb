class ProgrammingDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {}
  COLLECTION_ATTRIBUTES = ATTRIBUTE_TYPES.keys
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTE_TYPES.keys
  FORM_ATTRIBUTES = ATTRIBUTE_TYPES.keys

  def display_resource(language)
    language.name
  end
end