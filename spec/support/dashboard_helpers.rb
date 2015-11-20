module DashboardHelpers
  def displayed(resource)
    (resource.class.to_s + "Dashboard").
      constantize.
      new.
      display_resource(resource)
  end
end
