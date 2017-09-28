class OrderPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end

    def resolve_admin
      scope.where(customer: user)
    end
  end

  def create?
    false
  end

  def update?
    record.address_state == "AZ"
  end

  def destroy?
    false
  end
end
