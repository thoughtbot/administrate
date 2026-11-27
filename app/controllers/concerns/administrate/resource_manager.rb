module Administrate
  module ResourceManager
    extend ActiveSupport::Concern

    included do
      helper_method :new_resource
    end

    private

    def collection_resources
      @collection_resources ||= begin
        authorize_resource(resource_class)
        resources = authorize_scope(scoped_resource)
        resources = filter_resources(resources)
        resources = apply_collection_includes(resources)
        resources = order.apply(resources)
        resources = paginate_resources(resources)
        @resources = resources
        resources
      end
    end

    def built_resource
      @built_resource ||= new_resource(resource_params).tap do |resource|
        authorize_resource(resource)
        @resource = resource
      end
    end

    def requested_resource
      @requested_resource ||= find_resource(params[:id]).tap do |resource|
        authorize_resource(resource)
        @resource = resource
      end
    end

    # Override this if you have certain roles that require a subset.
    # This will be used in all actions except for the `new` and `create` actions.
    #
    # @return [ActiveRecord::Relation]
    def scoped_resource
      resource_class.default_scoped
    end

    def new_resource(params = {})
      resource_class.new(params)
    end

    # Override this method to specify custom lookup behavior.
    # This will be used to set the resource for the `show`, `edit`, `update` and `destroy` actions.
    #
    # @param param [ActiveSupport::Parameter]
    # @return [ActiveRecord::Base]
    def find_resource(param)
      authorize_scope(scoped_resource).find(param)
    end

    def save_built_resource
      built_resource.save(context: validation_contexts_on_create(built_resource))
    end

    def save_built_resource!
      built_resource.save!(context: validation_contexts_on_create(built_resource))
    end

    def save_requested_resource
      requested_resource.save(context: validation_contexts_on_update(requested_resource))
    end

    def save_requested_resource!
      requested_resource.save!(context: validation_contexts_on_update(requested_resource))
    end

    # Override this if you want to provide additional validation contexts.
    #
    # @param resource [ActiveRecord::Base] The resource to be validated.
    # @return [Array<Symbol>] The validation contexts to be used.
    def validation_contexts_on_create(resource)
      default_validation_contexts(resource)
    end

    # Override this if you want to provide additional validation contexts.
    #
    # @param resource [ActiveRecord::Base] The resource to be validated.
    # @return [Array<Symbol>] The validation contexts to be used.
    def validation_contexts_on_update(resource)
      default_validation_contexts(resource)
    end

    def default_validation_contexts(resource)
      nil
    end

    def resource_params
      attributes = params.fetch(resource_class.model_name.param_key, {})
      return {} if attributes.empty?

      attributes
        .permit(dashboard.permitted_attributes(action_name))
        .transform_values { |v| read_param_value(v) }
    end

    protected

    def apply_collection_includes(relation)
      resource_includes = dashboard.collection_includes
      return relation if resource_includes.empty?
      relation.includes(*resource_includes)
    end

    def read_param_value(data)
      if data.is_a?(ActionController::Parameters) && data[:type]
        if data[:type] == Administrate::Field::Polymorphic.to_s
          GlobalID::Locator.locate(data[:value])
        else
          raise "Unrecognised param data: #{data.inspect}"
        end
      elsif data.is_a?(ActionController::Parameters)
        data.transform_values { |v| read_param_value(v) }
      elsif data.is_a?(String) && data.blank?
        nil
      else
        data
      end
    end
  end
end
