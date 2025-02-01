class ProgrammingLanguage < ApplicationRecord
  # Example attributes:
  #   single_choice: string  (for a simple select)
  #   multiple_choices: string  (store as comma-separated or JSON in your database, or use a relation)

  # Convert multiple_choices to an array (if stored as comma-separated) just for demo
  before_save :normalize_multiple_choices

  def normalize_multiple_choices
    return unless multiple_choices.is_a?(String)
    self.multiple_choices = multiple_choices.split(',').map(&:strip).reject(&:blank?).join(',')
  end

  def multiple_choices_array
    multiple_choices.to_s.split(',')
  end
end
