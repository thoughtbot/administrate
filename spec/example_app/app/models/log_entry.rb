class LogEntry < ActiveRecord::Base
  belongs_to :logeable, polymorphic: true

  validate do |log_entry|
    if log_entry.action == "cancel" && log_entry.logeable.is_a?(Customer)
      log_entry.errors.add(:logeable, "A customer cannot be cancelled")
    end
  end
end
