module Admin
  class OrdersController < Admin::ApplicationController
    private

    def contextualize_resource(resource)
      if ["new", "create"].include?(action_name) && !pundit_user.admin?
        resource.customer = pundit_user
      end
    end
  end
end
