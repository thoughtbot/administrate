module Administrate
  module HtmlRenderer
    extend ActiveSupport::Concern

    private

    def respond_to_index_html
      render locals: {
        resources: collection_resources,
        search_term: search_term,
        page: index_page,
        show_search_bar: show_search_bar?,
        filters: filters
      }
    end

    def respond_to_show_html
      render locals: {
        page: show_page
      }
    end

    def respond_to_new_html
      render locals: {
        page: new_page
      }
    end

    def respond_to_edit_html
      render locals: {
        page: edit_page
      }
    end

    def respond_to_create_html
      redirect_to(
        after_resource_created_path(built_resource),
        notice: translate_with_resource("create.success")
      )
    end

    def respond_to_create_error_html
      render :new, locals: {
        page: new_page
      }, status: :unprocessable_entity
    end

    def respond_to_update_html
      redirect_to(
        after_resource_updated_path(requested_resource),
        notice: translate_with_resource("update.success"),
        status: :see_other
      )
    end

    def respond_to_update_error_html
      render :edit, locals: {
        page: edit_page
      }, status: :unprocessable_entity
    end

    def respond_to_destroy_html
      flash[:notice] = translate_with_resource("destroy.success")
      redirect_to after_resource_destroyed_path(requested_resource), status: :see_other
    end

    def respond_to_destroy_error_html
      flash[:error] = requested_resource.errors.full_messages.join("<br/>")
      redirect_to after_resource_destroyed_path(requested_resource), status: :see_other
    end

    def index_page
      page = Administrate::Page::Collection.new(dashboard, order: order)
      page.context = self
      collection_resources
      page
    end

    def show_page
      page = Administrate::Page::Show.new(dashboard, requested_resource)
      page.context = self
      page
    end

    def new_page
      page = Administrate::Page::Form.new(dashboard, built_resource)
      page.context = self
      page
    end

    def edit_page
      page = Administrate::Page::Form.new(dashboard, requested_resource)
      page.context = self
      page
    end

    def after_resource_destroyed_path(_requested_resource)
      {action: :index}
    end

    def after_resource_created_path(requested_resource)
      [namespace, requested_resource]
    end

    def after_resource_updated_path(requested_resource)
      [namespace, requested_resource]
    end
  end
end
