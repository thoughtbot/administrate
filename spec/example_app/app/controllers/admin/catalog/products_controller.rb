module Admin
  class Catalog::ProductsController < Admin::ApplicationController
    private

    def find_resource(param)
      ::Catalog::Product.find_by!(slug: param)
    end
  end
end
