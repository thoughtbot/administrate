class PaymentPolicy < ApplicationPolicy
  def index?
    user.admin?
  end

  def create?
    false
  end

  def update?
    false
  end

  def destroy?
    false
  end
end
