module Administrate
  module Punditize
    if Object.const_defined?("Pundit")
      extend ActiveSupport::Concern
      include Pundit

      included do
        def scoped_resource
          policy_scope super
        end

        def policy_scope(scope)
          super([:admin, scope])
        rescue ::Pundit::NotDefinedError
          # Fall back to admin application scope if none exists
          # for this particular record
          super(scope, policy_scope_class: Admin::ApplicationPolicy::Scope)
        end

        def authorize_resource(resource)
          authorize resource
        end

        def policy(record)
          super([:admin, record])
        rescue ::Pundit::NotDefinedError
          # Fall back to admin application policy if none exists
          # for this particular record
          Admin::ApplicationPolicy.new(pundit_user, record)
        end

        def show_action?(action, resource)
          policy(resource).send("#{action}?".to_sym)
        end
      end
    end
  end
end
