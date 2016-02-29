module Administrate
  class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    def index
      search_term = params[:search].to_s.strip
      resources = Administrate::Search.new(resource_resolver, search_term).run
      resources = order.apply(resources)
      resources = resources.page(params[:page]).per(records_per_page)
      page = Administrate::Page::Collection.new(dashboard, order: order)

      render locals: {
        resources: resources,
        search_term: search_term,
        page: page,
      }
    end

    def show
      render locals: {
        page: Administrate::Page::Show.new(dashboard, requested_resource),
      }
    end

    def new
      render locals: {
        page: Administrate::Page::Form.new(dashboard, resource_class.new),
      }
    end

    def edit
      render locals: {
        page: Administrate::Page::Form.new(dashboard, requested_resource),
      }
    end

    def create
      resource = resource_class.new(resource_params)

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
      requested_resource.destroy
      flash[:notice] = translate_with_resource("destroy.success")
      redirect_to action: :index
    end

    private

    helper_method :nav_link_state
    def nav_link_state(resource)
      if resource_name.to_s.pluralize == resource.to_s
        :active
      else
        :inactive
      end
    end

    def records_per_page
      params[:per_page] || 20
    end

    def order
      @_order ||= Administrate::Order.new(params[:order], params[:direction])
    end

    def dashboard
      @_dashboard ||= resource_resolver.dashboard_class.new
    end

    def requested_resource
      @_requested_resource ||= find_resource(params[:id])
    end

    def find_resource(param)
      resource_class.find(param)
    end

    def resource_params
      params.require(resource_name).permit(*permitted_attributes)
    end

    def permitted_attributes
      dashboard.permitted_attributes
    end

    delegate :resource_class, :resource_name, :namespace, to: :resource_resolver
    helper_method :namespace
    helper_method :resource_name

    def resource_resolver
      @_resource_resolver ||=
        Administrate::ResourceResolver.new(controller_path)
    end

    def translate_with_resource(key)
      t(
        "administrate.controller.#{key}",
        resource: resource_resolver.resource_title,
      )
    end
  end
end
