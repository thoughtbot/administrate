# DashboardManifest tells Administrate which dashboards to display
class DashboardManifest
  # `#dashboards`
  # Returns a list of dashboards to display in the side navigation menu
  #
  # These are all of the rails models that we found in your database
  # at the time you installed Administrate.
  #
  # To show or hide dashboards, add or remove the model name from this list.
  # Dashboards returned from this method must be Rails models for Administrate
  # to work correctly.
  def dashboards
    [
      :customers,
      :line_items,
      :orders,
      :products,
    ]
  end

  # `#root_dashboard`
  # Returns the name of the dashboard that will be displayed
  # at "http://your_site.com/admin"
  #
  # This dashboard will likely be the first page that admins see
  # when they log into the dashboard.
  def root_dashboard
    dashboards.first
  end
end
