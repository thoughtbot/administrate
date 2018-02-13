module ControllerHelpers
  def value_assigned_to(assigned_instance_variable)
    subject.view_context.instance_variable_get(assigned_instance_variable)
  end
end
