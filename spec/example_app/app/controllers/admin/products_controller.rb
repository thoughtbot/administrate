module Admin
  class ProductsController < Admin::ApplicationController
    include Administrate::Punditize

    class PunditUser; end

    def pundit_user
      PunditUser.new
    end

    private

    def find_resource(param)
      Product.find_by!(slug: param)
    end
  end
end
