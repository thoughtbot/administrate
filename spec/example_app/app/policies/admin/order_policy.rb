module Admin
  class OrderPolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        scope.where(customer: admin)
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
end
