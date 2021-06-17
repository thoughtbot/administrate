module Admin
  class CustomersController < Admin::ApplicationController
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
  end
end
