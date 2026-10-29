module Administrate
  class ApplicationController < ActionController::Base
    include Administrate::Authorizable
    include Administrate::CollectionPaginator
    include Administrate::CollectionSearchable
    include Administrate::CollectionSortable
    include Administrate::ControllerDeprecator
    include Administrate::ControllerI18n
    include Administrate::DashboardManager
    include Administrate::HtmlRenderer
    include Administrate::ResourceManager

    protect_from_forgery with: :exception

    def index
      respond_to do |format|
        format.html { respond_to_index_html }
        format.json { render json: collection_resources }
      end
    end

    def show
      respond_to do |format|
        format.html { respond_to_show_html }
        format.json { render json: requested_resource }
      end
    end

    def new
      respond_to do |format|
        format.html { respond_to_new_html }
      end
    end

    def edit
      respond_to do |format|
        format.html { respond_to_edit_html }
      end
    end

    def create
      if save_built_resource
        yield(built_resource) if block_given?

        respond_to do |format|
          format.html { respond_to_create_html }
        end
      else
        respond_to do |format|
          format.html { respond_to_create_error_html }
        end
      end
    end

    def update
      requested_resource.assign_attributes(resource_params)

      if save_requested_resource
        respond_to do |format|
          format.html { respond_to_update_html }
        end
      else
        respond_to do |format|
          format.html { respond_to_update_error_html }
        end
      end
    end

    def destroy
      if requested_resource.destroy
        respond_to do |format|
          format.html { respond_to_destroy_html }
        end
      else
        respond_to do |format|
          format.html { respond_to_destroy_error_html }
        end
      end
    end
  end
end
