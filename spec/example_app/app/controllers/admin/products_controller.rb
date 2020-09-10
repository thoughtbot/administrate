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

    def resource_class_for_action(action_name)
      if action_name.to_s == "index"
        Product::Index
      else
        super
      end
    end
  end
end
