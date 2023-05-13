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
        policy_scope!(pundit_user, namespaced_scope)
      end

      def policy_scope!(user, scope)
        policy_scope_class = Pundit::PolicyFinder.new(scope).scope!
        return unless policy_scope_class

        begin
          policy_scope = policy_scope_class.new(user, pundit_model(scope))
        rescue ArgumentError
          raise Pundit::InvalidConstructorError, "Invalid #<#{policy_scope_class}> constructor is called"
        end

        if policy_scope.respond_to? :resolve_admin
          ActiveSupport::Deprecation.warn(
            "The method `resolve_admin` on pundit policy scope is deprecated. " +
            "Please use a namespaced pundit policy instead.",
          )
          policy_scope.resolve_admin
        else
          policy_scope.resolve
        end
      end

      def pundit_model(record)
        record.is_a?(Array) ? record.last : record
      end
    end
  end
end
