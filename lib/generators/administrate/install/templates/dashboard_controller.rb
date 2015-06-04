# All Administrate controllers inherit from this `DashboardController`,
# making it the ideal place to put authentication logic or other
# before_filters.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
class Admin::DashboardController < Administrate::ApplicationController
  before_filter :authenticate_admin

  def authenticate_admin
    # TODO Add authentication logic here.
  end
end
