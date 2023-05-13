class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end

    def resolve_admin
      if user.admin?
        scope
      else
        scope.where(customer: user)
      end
    end
  end

  def create?
    user.admin?
  end

  def update?
    user.admin? || user.id == record.customer_id
  end

  def destroy?
    user.admin?
  end
end
