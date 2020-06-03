module Admin
  class ApplicationPolicy
    attr_reader :admin, :record

    def initialize(admin, record)
      @admin = admin
      @record = record
    end

    def index?
      false
    end

    def show?
      scope.where(id: record.id).exists?
    end

    def create?
      false
    end

    def new?
      create?
    end

    def update?
      false
    end

    def edit?
      update?
    end

    def destroy?
      false
    end

    def scope
      Pundit.policy_scope!(admin, record.class)
    end

    class Scope
      attr_reader :admin, :scope

      def initialize(admin, scope)
        @admin = admin
        @scope = scope
      end

      def resolve
        scope
      end
    end
  end
end
