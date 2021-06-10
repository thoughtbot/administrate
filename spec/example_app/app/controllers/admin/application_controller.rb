# All Administrate controllers inherit from this `Admin::ApplicationController`,
# making it the ideal place to put authentication logic or other
# before_actions.
#
# If you want to add pagination or other controller-level concerns,
# you're free to overwrite the RESTful controller actions.
module Admin
  class ApplicationController < Administrate::ApplicationController
    include Administrate::Punditize

    class AdminUser
      def id
        nil
      end

      def name
        "Admin"
      end

      def admin?
        true
      end
    end

    before_action :authenticate_admin

    def authenticate_admin
      user_id = session[:user_id]
      @current_user = user_id ? Customer.find(user_id) : AdminUser.new
    end

    def pundit_user
      @current_user
    end
  end
end
