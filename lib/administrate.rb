require "administrate/engine"
require "administrate/orm_adapters/active_record_pattern/base"
require "administrate/orm_adapters/active_record_pattern/model"
require "administrate/orm_adapters/active_record_pattern/record"
require "administrate/orm_adapters/active_record_pattern/relation"

module Administrate
  if defined?(Sequel::Model)
    %w(base model record relation).each do |file|
      require "administrate/orm_adapters/sequel/#{file}"
    end

    def self.orm_namespace
      OrmAdapters::Sequel
    end
  else
    %w(base model record relation).each do |file|
      require "administrate/orm_adapters/active_record/#{file}"
    end

    def self.orm_namespace
      OrmAdapters::ActiveRecord
    end
  end

  def self.orm
    @orm ||= orm_namespace::Base.new
  end
end
