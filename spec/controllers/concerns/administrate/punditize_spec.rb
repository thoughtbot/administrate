require "rails_helper"

module Administrate
  RSpec.describe Punditize do
    it "exists when 'Pundit' is not defined" do
      unload_constants do
        expect { build_dummy }.not_to raise_error
      end
    end

    def unload_constants
      original = Pundit
      Object.send(:remove_const, "Pundit")
      Administrate.send(:remove_const, "Punditize")
      load Rails.root.join(
        "..",
        "..",
        "app",
        "controllers",
        "concerns",
        "administrate",
        "punditize.rb",
      )

      yield

      Object.const_set("Pundit", original)
    end

    def dummy_class
      Class.new do
        include Administrate::Punditize
      end
    end

    def build_dummy
      stub_const("Dummy", dummy_class)
      Dummy.new
    end
  end
end
