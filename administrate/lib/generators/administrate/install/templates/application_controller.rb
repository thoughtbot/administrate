# All Administrate controllers inherit from this `ApplicationController`,
# making it the ideal place to put authentication logic or other
# before_filters.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
class Admin::ApplicationController < Administrate::ApplicationController
  before_filter :authenticate_admin

  def authenticate_admin
    # TODO Add authentication logic here.
  end

  def index
    super

    flash[:alert] =
      "For performance, Administrate limits the index page to show 20 items.
      Customize this action to update/remove the limit,
      or implement the pagination library of your choice."
    @resources = @resources.limit(20)
  end
end
