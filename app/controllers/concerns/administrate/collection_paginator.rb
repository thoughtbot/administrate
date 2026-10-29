module Administrate
  module CollectionPaginator
    extend ActiveSupport::Concern

    private

    def records_per_page
      params[:per_page] || 20
    end

    def paginate_resources(resources)
      resources.page(params[:_page]).per(records_per_page)
    end
  end
end
