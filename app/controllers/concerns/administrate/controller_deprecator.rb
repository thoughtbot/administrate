module Administrate
  module ControllerDeprecator
    extend ActiveSupport::Concern

    included do
      helper_method :valid_action?
      helper_method :show_action?
      helper_method :nav_link_state
    end

    private

    # @deprecated Use {#existing_action} instead. Note that, in
    #   {#existing_action}, the order of parameters is reversed and there is
    #   no default value for the `resource` parameter.
    def valid_action?(action_name, resource = resource_class)
      Administrate.warn_of_deprecated_authorization_method(__method__)
      existing_action?(resource, action_name)
    end

    # @deprecated Use {#authorized_action} instead. Note that the order of
    #   parameters is reversed in {#authorized_action}.
    def show_action?(action, resource)
      Administrate.warn_of_deprecated_authorization_method(__method__)
      authorized_action?(resource, action)
    end

    def nav_link_state(resource)
      underscore_resource = resource.to_s.split("/").join("__")
      (resource_name.to_s.pluralize == underscore_resource) ? :active : :inactive
    end

    def show_search_bar?
      dashboard.attribute_types_for(
        dashboard.all_attributes
      ).any? { |_name, attribute| attribute.searchable? }
    end
  end
end
