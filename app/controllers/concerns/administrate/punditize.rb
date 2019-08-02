module Administrate
  module Punditize
    if Object.const_defined?("Pundit")
      extend ActiveSupport::Concern
      include Pundit

      included do
        def scoped_resource
          policy_scope_admin super
        end

        def authorize_resource(resource)
          authorize resource
        end

        def show_action?(action, resource)
          Pundit.policy!(pundit_user, resource).send("#{action}?".to_sym)
        end
      end

      private

      # Like the policy_scope method in stock Pundit, but allows the 'resolve'
      # to be overridden by 'resolve_admin' for a different index scope in Admin
      # controllers.
      def policy_scope_admin(scope)
        ps = Pundit::PolicyFinder.new(scope).scope!.new(pundit_user, scope)
        if ps.respond_to? :resolve_admin
          ps.resolve_admin
        else
          ps.resolve
        end
      end
    end
  end
end
