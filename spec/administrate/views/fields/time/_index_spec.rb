require "rails_helper"

describe "fields/time/_index", type: :view do
  context "time value is nil" do
    it "display nothing" do
      time = double(data: nil)

      render(
        partial: "fields/time/index",
        locals: { field: time },
      )

      expect(rendered.strip).to eq("")
    end
  end

  context "time value is set" do
    it "renders time" do
      example_time = "12:34:00"
      customer = create(:customer, example_time: example_time)
      time = instance_double(
        "Administrate::Field::Time",
        data: customer.example_time,
      )
      render(
        partial: "fields/time/index",
        locals: { field: time, namespace: :admin },
      )

      expect(rendered.strip).to eq("12:34PM")
    end
  end
end
