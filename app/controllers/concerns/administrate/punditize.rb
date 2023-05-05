module Administrate
  module Punditize
    if Object.const_defined?("Pundit")
      extend ActiveSupport::Concern

      if Pundit.const_defined?(:Authorization)
        include Pundit::Authorization
      else
        include Pundit
      end

      included do
        private

        def policy_namespaces
          []
        end

        def scoped_resource
          namespaced_policy_scope super
        end

        def authorize_resource(resource)
          namespaced_resource = policy_namespaces << resource
          authorize namespaced_resource
        end

        def authorized_action?(resource, action)
          namespaced_resource = policy_namespaces << resource
          policy = Pundit.policy!(pundit_user, namespaced_resource)
          policy.send("#{action}?".to_sym)
        end
      end

      private

      def namespaced_policy_scope(scope)
        namespaced_scope = policy_namespaces << scope
        Pundit.policy_scope!(pundit_user, namespaced_scope)
      end
    end
  end
end
