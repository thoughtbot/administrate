module Administrate
  class Navigation
    attr_reader :resources

    def initialize(namespace)
      namespace = Administrate::Namespace.new(namespace)
      @resources = namespace.resources.select(&:display_in_navigation?)
    end
  end
end
