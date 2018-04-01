require "rails_helper"

describe "fields/date_time/_index", type: :view do
  it "renders date_time" do
    product = create(:product)
    date_time = instance_double(
      "Administrate::Field::DateTime.with_options(
        format: #{Time::DATE_FORMATS[:default]}
      )",
      data: product,
      datetime: product.created_at,
    )

    render(
      partial: "fields/date_time/index.html.erb",
      locals: { field: date_time, namespace: "admin" },
    )
  end
end
