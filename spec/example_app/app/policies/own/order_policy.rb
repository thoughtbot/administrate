module Own
  class OrderPolicy < ::OrderPolicy
    class Scope < Scope
      def resolve
        scope.where(customer: user)
      end
    end

    def update?
      user.id == record.customer_id
    end
  end
end
