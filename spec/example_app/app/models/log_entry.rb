class LogEntry < ActiveRecord::Base
  belongs_to :logeable, polymorphic: true
end
