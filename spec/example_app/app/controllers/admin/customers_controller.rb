class Admin::CustomersController < Admin::ApplicationController
  private

  def scoped_resource
    Customer.where(hidden: false)
  end
end
