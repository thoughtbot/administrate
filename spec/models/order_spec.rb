require "rails_helper"

RSpec.describe Order do
  it { should belong_to :customer }

  describe "validations" do
    it { should validate_presence_of(:customer) }

    it { should validate_presence_of(:address_line_one) }
    it { should validate_presence_of(:address_line_two) }
    it { should validate_presence_of(:address_city) }
    it { should validate_presence_of(:address_state) }
    it { should validate_presence_of(:address_zip) }
  end
end
