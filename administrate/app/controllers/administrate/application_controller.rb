require "administrate/namespace"
require "administrate/page/form"
require "administrate/page/table"
require "administrate/page/show"

module Administrate
  class ApplicationController < ActionController::Base
    def index
      @resources = resource_class.all
      @page = Administrate::Page::Table.new(dashboard)
    end

    def show
      set_resource

      @page = Administrate::Page::Show.new(dashboard, resource)
    end

    def new
      @page = Administrate::Page::Form.new(dashboard, resource_class.new)
    end

    def edit
      set_resource

      @page = Administrate::Page::Form.new(dashboard, resource)
    end

    def create
      set_resource(resource_class.new(resource_params))

      if resource.save
        redirect_to(
          [Administrate::NAMESPACE, resource],
          notice: notices[:created],
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
          notice: notices[:updated],
        )
      else
        @page = Administrate::Page::Form.new(dashboard, resource)
        render :edit
      end
    end

    def destroy
      set_resource

      resource.destroy
      flash[:notice] = notices[:destroyed]
      redirect_to action: :index
    end

    private

    helper_method :link_class
    def link_class(resource)
      if resource_name.to_s.pluralize == resource.to_s
        :active
      end
    end

    def resource_class
      Object.const_get(resource_class_name)
    end

    def dashboard
      @dashboard ||= dashboard_class.new
    end

    def set_resource(resource = nil)
      resource ||= resource_class.find(params[:id])
      instance_variable_set(instance_variable, resource)
    end

    def resource
      instance_variable_get(instance_variable)
    end

    def resource_params
      params.require(:"#{resource_name}").permit(*permitted_attributes)
    end

    def permitted_attributes
      dashboard.permitted_attributes
    end

    def dashboard_class
      Object.const_get("#{resource_class_name}Dashboard")
    end

    def resource_class_name
      resource_name.to_s.camelcase
    end

    def instance_variable
      "@#{resource_name}"
    end

    def resource_title
      resource_class_name.titleize
    end

    def notices
      {
        created: "#{resource_title} was successfully created.",
        updated: "#{resource_title} was successfully updated.",
        destroyed: "#{resource_title} was successfully destroyed.",
      }
    end

    def resource_name
      controller_name.singularize.to_sym
    end
  end
end
