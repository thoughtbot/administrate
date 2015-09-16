# All Administrate controllers inherit from this `Admin::ApplicationController`,
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

    if @resources.count > 20
      flash.now[:alert] = "Showing 20 of #{@resources.count} items."
      @resources = @resources.limit(20)
    end
  end
end
