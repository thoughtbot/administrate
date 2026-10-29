module Administrate
  module Authorizable
    extend ActiveSupport::Concern

    included do
      helper_method :existing_action?
      helper_method :authorized_action?
    end

    private

    # Whether the named action route exists for the resource class.
    #
    # @param resource [Class, String, Symbol] A class of resources, or the name
    #   of a class of resources.
    # @param action_name [String, Symbol] The name of an action that might be
    #   possible to perform on a resource or resource class.
    # @return [Boolean] `true` if a route exists for the resource class and the
    #   action. `false` otherwise.
    def existing_action?(resource, action_name)
      routes.include?([resource.to_s.underscore.pluralize, action_name.to_s])
    end

    # Whether the current user is authorized to perform the named action on the
    # resource.
    #
    # @param _resource [ActiveRecord::Base, Class, String, Symbol] The
    #   tentative target of the action, or the name of its class.
    # @param _action_name [String, Symbol] The name of an action that might be
    #   possible to perform on a resource or resource class.
    # @return [Boolean] `true` if the current user is authorized to perform the
    #   action on the resource. `false` otherwise.
    def authorized_action?(_resource, _action_name)
      true
    end

    # Override this if you want to authorize the scope.
    # This will be used in all actions except for the `new` and `create` actions.
    #
    # @param scope [ActiveRecord::Relation]
    # @return [ActiveRecord::Relation]
    def authorize_scope(scope)
      scope
    end

    # Override this if you want to authorize the resource differently.
    # This will be used to authorize the resource for all actions without `index`.
    # In the case of `index`, it is used to authorize the resource class.
    #
    # @param resource [ActiveRecord::Base]
    # @return [ActiveRecord::Base]
    # @raise [Administrate::NotAuthorizedError] if the resource is not authorized.
    def authorize_resource(resource)
      if authorized_action?(resource, action_name)
        resource
      else
        raise Administrate::NotAuthorizedError.new(
          action: action_name,
          resource: resource
        )
      end
    end

    protected

    def routes
      @routes ||= Namespace.new(namespace).routes.to_set
    end
  end
end
