module Admin
  class ProductsController < SuperAdmin::ApplicationController
    private

    def find_resource(param)
      Product.find_by!(slug: param)
    end
  end
end
