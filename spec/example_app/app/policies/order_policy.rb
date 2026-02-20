class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      if user.admin?
        scope.all
      else
        scope.where(customer: user)
      end
    end
  end

  def create?
    true
  end

  def update?
    user.admin? || user.id == record.customer_id
  end

  def destroy?
    user.admin?
  end
end
