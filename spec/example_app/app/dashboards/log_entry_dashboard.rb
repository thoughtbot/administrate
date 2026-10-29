require "administrate/base_dashboard"

class LogEntryDashboard < Administrate::BaseDashboard
  ATTRIBUTES = %i[action logeable].freeze

  ATTRIBUTE_TYPES = {
    id: Field::Number,
    action: Field::String,
    logeable: Field::Polymorphic.with_options(classes: [Customer, ::Order]),
    created_at: Field::DateTime.with_options(look: {index: :relative})
  }.freeze

  COLLECTION_ATTRIBUTES = [:id] + ATTRIBUTES + [:created_at]
  FORM_ATTRIBUTES = ATTRIBUTES
  SHOW_PAGE_ATTRIBUTES = ATTRIBUTES + [:created_at]

  def display_resource(resource)
    "#{resource.action}[#{safe_display_logeable(resource.logeable)}]"
  end

  private

  def safe_display_logeable(logeable)
    logeable ? display_logeable(logeable) : ""
  end

  def display_logeable(logeable)
    (logeable.class.to_s + "Dashboard")
      .constantize
      .new
      .display_resource(logeable)
  end
end
