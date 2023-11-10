class CustomerPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope
      else
        scope.where(id: user.id)
      end
    end
  end
end
