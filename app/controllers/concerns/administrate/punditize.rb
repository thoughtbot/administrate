if Object.const_defined?("Pundit")
  module Administrate
    module Punditize
      extend ActiveSupport::Concern
      include Pundit

      included do
        def pundit_namespaces
          []
        end

        def scoped_resource
          policy_scope_admin super
        end

        def authorize_resource(resource)
          namespaced_resource = pundit_namespaces << resource
          authorize namespaced_resource
        end

        def show_action?(action, resource)
          namespaced_resource = pundit_namespaces << resource
          Pundit.policy!(pundit_user, namespaced_resource).send("#{action}?".to_sym)
        end
      end

      private

      # Like the policy_scope method in stock Pundit, but allows the 'resolve'
      # to be overridden by 'resolve_admin' for a different index scope in Admin
      # controllers.
      def policy_scope_admin(resource)
        namespaced_resource = pundit_namespaces << resource
        ps = Pundit::PolicyFinder.new(namespaced_resource).scope!.new(pundit_user, resource)
        if ps.respond_to? :resolve_admin
          ps.resolve_admin
        else
          ps.resolve
        end
      end
    end
  end
end
