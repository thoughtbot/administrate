class BaseDashboard
  def permitted_attributes
    form_attributes.map do |attr|
      adapter_class(attr).permitted_attribute(attr)
    end.uniq
  end

  private

  def adapter_class(attr)
    adapter_name = attribute_adapters[attr]

    adapter_registry.fetch(adapter_name)
  end

  def adapter_registry
    {
      belongs_to: BelongsToAdapter,
      email: EmailAdapter,
      image: ImageAdapter,
      string: StringAdapter,
    }
  end
end
