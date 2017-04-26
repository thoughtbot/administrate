module DashboardHelpers
  def displayed(resource)
    (resource.class.to_s + "Dashboard").
      constantize.
      new.
      display_resource(resource)
  end

  def missing_attribute_message(attribute, dashboard_class)
    "Attribute #{attribute} could not be found in #{dashboard_class}::ATTRIBUTE_TYPES"
  end
end
