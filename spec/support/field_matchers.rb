module FieldMatchers
  def should_permit_param(expected_param, for_attribute:, on_model:)
    permitted_param = described_class.permitted_attribute(
      for_attribute,
      resource_class: on_model,
    )
    expect(permitted_param).to eq(expected_param)
  end
end
