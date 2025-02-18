module Admin
  class CustomersController < Admin::ApplicationController
    before_action :with_variant, only: %i[index]

    def become
      user_id = params[:id]
      if user_id == "admin"
        session.delete(:user_id)
      else
        session[:user_id] = user_id
      end
      redirect_back fallback_location: admin_root_url
    end

    private

    def scoped_resource
      Customer.where(hidden: false)
    end

    def with_variant
      if @current_user.admin?
        request.variant = :admin
      end
    end
  end
end
