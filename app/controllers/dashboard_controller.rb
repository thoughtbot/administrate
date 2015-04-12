require "presenters/form_presenter"
require "presenters/index_presenter"
require "presenters/show_presenter"

class DashboardController < ApplicationController
  def index
    @resources = resource_class.all
    @presenter = IndexPresenter.new(dashboard)
  end

  def show
    set_resource(resource_class.find(params[:id]))

    @presenter = ShowPresenter.new(dashboard, resource)
  end

  def new
    @presenter = FormPresenter.new(dashboard, resource_class.new)
  end

  def edit
    set_resource(resource_class.find(params[:id]))

    @presenter = FormPresenter.new(dashboard, resource)
  end

  def create
    set_resource(resource_class.new(resource_params))

    if resource.save
      redirect_to resource, notice: notices[:created]
    else
      render :new
    end
  end

  def update
    set_resource(resource_class.find(params[:id]))

    if resource.update(resource_params)
      redirect_to resource, notice: notices[:updated]
    else
      render :edit
    end
  end

  def destroy
    set_resource(resource_class.find(params[:id]))

    resource.destroy
    redirect_to index_url, notice: notices[:destroyed]
  end

  private

  helper_method :link_class
  def link_class(resource)
    if params[:controller] == resource.to_s
      :active
    end
  end

  def resource_class
    Object.const_get(resource_class_name)
  end

  def dashboard
    @dashboard ||= dashboard_class.new
  end

  def set_resource(value)
    instance_variable_set(instance_variable, value)
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
    resource_name.to_s.titleize
  end

  def instance_variable
    "@#{resource_name}"
  end

  def index_url
    Rails.application.routes.url_helpers.public_send(:"#{resource_name}s_path")
  end

  def notices
    {
      created: "#{resource_class_name} was successfully created.",
      updated: "#{resource_class_name} was successfully updated.",
      destroyed: "#{resource_class_name} was successfully destroyed.",
    }
  end
end
