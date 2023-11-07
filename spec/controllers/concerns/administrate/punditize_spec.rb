require "rails_helper"

module Administrate
  RSpec.describe Punditize do
    it "exists when 'Pundit' is not defined" do
      unload_constants do
        expect { build_dummy }.not_to raise_error
      end
    end

    unless Pundit.const_defined?(:Authorization)
      # Spec for pundit < 2.2
      it "exists when Pundit::Authorization is not defined" do
        reload_punditize
        expect(Pundit.const_defined?(:Authorization)).to be_falsey
        expect { build_dummy }.not_to raise_error
      end
    end

    def unload_constants
      original = Pundit
      Object.send(:remove_const, "Pundit")
      reload_punditize

      yield

      Object.const_set("Pundit", original)
    end

    def reload_punditize
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
