module Own
  class OrderPolicy < ::OrderPolicy
    class Scope < Scope
      def resolve
        scope.where(customer: user)
      end
    end
  end
end
