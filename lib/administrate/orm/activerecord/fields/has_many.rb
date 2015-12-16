module Administrate
  module Field
    class HasMany < Collection
      protected

      def candidate_resources
        options[:candidate_resources] ||= -> { associated_class.all }
        super
      end
    end
  end
end
