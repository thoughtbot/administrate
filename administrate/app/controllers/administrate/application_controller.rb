module Administrate
  class ApplicationController < ActionController::Base
    def index
      @resources = resolver.resource_class.all
      @page = Administrate::Page::Table.new(dashboard)
    end

    def show
      set_resource

      @page = Administrate::Page::Show.new(dashboard, resource)
    end

    def new
      @page = Administrate::Page::Form.new(
        dashboard, resolver.resource_class.new
      )
    end

    def edit
      set_resource

      @page = Administrate::Page::Form.new(dashboard, resource)
    end

    def create
      set_resource(resolver.resource_class.new(resource_params))

      if resource.save
        redirect_to(
          [Administrate::NAMESPACE, resource],
          notice: translate("create.success"),
        )
      else
        @page = Administrate::Page::Form.new(dashboard, resource)
        render :new
      end
    end

    def update
      set_resource

      if resource.update(resource_params)
        redirect_to(
          [Administrate::NAMESPACE, resource],
          notice: translate("update.success"),
        )
      else
        @page = Administrate::Page::Form.new(dashboard, resource)
        render :edit
      end
    end

    def destroy
      set_resource

      resource.destroy
      flash[:notice] = translate("destroy.success")
      redirect_to action: :index
    end

    private

    helper_method :nav_link_state
    def nav_link_state(resource)
      if resolver.resource_name.to_s.pluralize == resource.to_s
        :active
      else
        :inactive
      end
    end

    def dashboard
      @dashboard ||= resolver.dashboard_class.new
    end

    def set_resource(resource = nil)
      resource ||= find_resource(params[:id])
      instance_variable_set(instance_variable, resource)
    end

    def find_resource(param)
      resolver.resource_class.find(param)
    end

    def resource
      instance_variable_get(instance_variable)
    end

    def resource_params
      params.require(resolver.resource_name).permit(*permitted_attributes)
    end

    def permitted_attributes
      dashboard.permitted_attributes
    end

    def instance_variable
      "@#{resolver.resource_name}"
    end

    def resolver
      @resolver ||= Administrate::ResourceResolver.new(resource_class)
    end

    def resource_class
      params.fetch(:resource_class, controller_path).to_s
    end

    def translate(key)
      t(
        "administrate.controller.#{key}",
        resource: resolver.resource_title,
      )
    end
  end
end
