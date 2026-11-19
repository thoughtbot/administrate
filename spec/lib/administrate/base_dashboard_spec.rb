require "rails_helper"
require "administrate/base_dashboard"

module Administrate
  module BaseDashboardSpecMocks
    class Bonus; end
    class Customer; end

    class BonusDashboard < Administrate::BaseDashboard; end
    class CustomerDashboard < Administrate::BaseDashboard; end
  end
end

describe Administrate::BaseDashboard do
  describe ".model" do
    # Bonus is already singular. Inflecting the dashboard's name singularizes
    # it again and looks for a Bonu constant.
    it "returns the model named by the dashboard, without inflecting it" do
      expect(Administrate::BaseDashboardSpecMocks::BonusDashboard.model).
        to eq(Administrate::BaseDashboardSpecMocks::Bonus)
    end

    it "returns the model when the name is unaffected by inflection" do
      expect(Administrate::BaseDashboardSpecMocks::CustomerDashboard.model).
        to eq(Administrate::BaseDashboardSpecMocks::Customer)
    end
  end
end
