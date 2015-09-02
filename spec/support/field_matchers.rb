module FieldMatchers
  def should_permit_param(expected_param, for_attribute:)
    permitted_param = described_class.permitted_attribute(for_attribute)
    expect(permitted_param).to eq(expected_param)
  end
end
