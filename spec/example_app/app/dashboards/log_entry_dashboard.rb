require "administrate/base_dashboard"

class LogEntryDashboard < Administrate::BaseDashboard
  ATTRIBUTES = %i(action logeable).freeze

  ATTRIBUTE_TYPES = {
    action: Field::String,
    logeable: Field::Polymorphic.with_options(classes: [Customer, ::Order]),
  }.freeze

  COLLECTION_ATTRIBUTES = ATTRIBUTES
  FORM_ATTRIBUTES = ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES

  def display_resource(resource)
    "#{resource.action} #{display_logeable(resource.logeable)}"
  end

  private

  def display_logeable(logeable)
    "#{logeable.class.name} ##{logeable.id}"
  end
end
