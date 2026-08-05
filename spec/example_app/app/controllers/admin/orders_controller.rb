module Admin
  class OrdersController < Admin::ApplicationController
    private

    def authorize_resource(resource)
      super
      if %w[new create].include?(action_name) && !pundit_user.admin?
        resource.customer = pundit_user
      end
    end
  end
end
