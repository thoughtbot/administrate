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

    after_action :audit_log, only: %i[create update destroy]

    def audit_log
      if (resource = @requested_resource || @new_resource)
        Rails.logger.info(
          sprintf(
            "Audit Log: %<action>s %<class>s #%<id>d by %<user>s at %<time>s",
            action: action_name.capitalize,
            class: resource.class,
            id: resource.id || 0,
            user: pundit_user.name,
            time: Time.zone.now.to_s
          )
        )
      end
    end
  end
end
