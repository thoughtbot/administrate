class Admin::CustomersController < Admin::ApplicationController
  private

  def scoped_resource
    super.where(hidden: false)
  end

  def resource_class_for_action(action_name)
    if action_name.to_s == "index"
      Customer::Index
    else
      super
    end
  end
end
