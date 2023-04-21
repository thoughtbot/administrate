module FieldMatchers
  def should_permit_param(expected_param, for_attribute:, on_model:)
    permitted_param = described_class.permitted_attribute(
      for_attribute,
      resource_class: on_model,
    )

    permitted_param =
      if permitted_param.respond_to?(:transform_keys)
        permitted_param.deep_transform_keys(&:to_s)
      else
        permitted_param.to_s
      end

    expect(permitted_param).to eq(expected_param)
  end
end
