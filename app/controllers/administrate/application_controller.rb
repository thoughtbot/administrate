module Administrate
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    def index
      search_term = params[:search].to_s.strip
      resources = Administrate::Search.new(scoped_resource,
                                           dashboard_class,
                                           search_term).run
      resources = apply_resource_includes(resources)
      resources = order.apply(resources)
      resources = resources.page(params[:page]).per(records_per_page)
      page = Administrate::Page::Collection.new(dashboard, order: order)

      render locals: {
        resources: resources,
        search_term: search_term,
        page: page,
        show_search_bar: show_search_bar?,
      }
    end

    def show
      render locals: {
        page: Administrate::Page::Show.new(dashboard, requested_resource),
      }
    end

    def new
      resource = resource_class.new
      authorize_resource(resource)
      render locals: {
        page: Administrate::Page::Form.new(dashboard, resource),
      }
    end

    def edit
      render locals: {
        page: Administrate::Page::Form.new(dashboard, requested_resource),
      }
    end

    def create
      resource = resource_class.new(resource_params)
      authorize_resource(resource)

      if resource.save
        redirect_to(
          [namespace, resource],
          notice: translate_with_resource("create.success"),
        )
      else
        render :new, locals: {
          page: Administrate::Page::Form.new(dashboard, resource),
        }
      end
    end

    def update
      if requested_resource.update(resource_params)
        redirect_to(
          [namespace, requested_resource],
          notice: translate_with_resource("update.success"),
        )
      else
        render :edit, locals: {
          page: Administrate::Page::Form.new(dashboard, requested_resource),
        }
      end
    end

    def destroy
      if requested_resource.destroy
        flash[:notice] = translate_with_resource("destroy.success")
      else
        flash[:error] = requested_resource.errors.full_messages.join("<br/>")
      end
      redirect_to action: :index
    end

    private

    helper_method :nav_link_state
    def nav_link_state(resource)
      resource_name.to_s.pluralize == resource.to_s ? :active : :inactive
    end

    helper_method :valid_action?
    def valid_action?(name, resource = resource_class)
      !!routes.detect do |controller, action|
        controller == resource.to_s.underscore.pluralize && action == name.to_s
      end
    end

    def routes
      @routes ||= Namespace.new(namespace).routes
    end

    def records_per_page
      params[:per_page] || 20
    end

    def order
      @order ||= Administrate::Order.new(
        params.fetch(resource_name, {}).fetch(:order, nil),
        params.fetch(resource_name, {}).fetch(:direction, nil),
      )
    end

    def dashboard
      @dashboard ||= dashboard_class.new
    end

    def requested_resource
      @requested_resource ||= find_resource(params[:id]).tap do |resource|
        authorize_resource(resource)
      end
    end

    def find_resource(param)
      scoped_resource.find(param)
    end

    def scoped_resource
      resource_class.default_scoped
    end

    def apply_resource_includes(relation)
      resource_includes = dashboard.association_includes
      return relation if resource_includes.empty?
      relation.includes(*resource_includes)
    end

    def resource_params
      params.require(resource_class.model_name.param_key).
        permit(dashboard.permitted_attributes).
        transform_values { |v| read_param_value(v) }
    end

    def read_param_value(data)
      if data.is_a?(ActionController::Parameters) && data[:type]
        if data[:type] == Administrate::Field::Polymorphic.to_s
          GlobalID::Locator.locate(data[:value])
        else
          raise "Unrecognised param data: #{data.inspect}"
        end
      else
        data
      end
    end

    delegate :dashboard_class, :resource_class, :resource_name, :namespace,
      to: :resource_resolver
    helper_method :namespace
    helper_method :resource_name

    def resource_resolver
      @resource_resolver ||=
        Administrate::ResourceResolver.new(controller_path)
    end

    def translate_with_resource(key)
      t(
        "administrate.controller.#{key}",
        resource: resource_resolver.resource_title,
      )
    end

    def show_search_bar?
      dashboard.attribute_types_for(
        dashboard.all_attributes,
      ).any? { |_name, attribute| attribute.searchable? }
    end

    def show_action?(_action, _resource)
      true
    end
    helper_method :show_action?

    def new_resource
      resource_class.new
    end
    helper_method :new_resource

    def authorize_resource(resource)
      resource
    end
  end
end
