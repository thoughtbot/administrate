module Features
  def have_flash(text, options = {})
    options.reverse_merge!(type: :notice)
    have_css(".flash-#{options[:type]}", text: text)
  end
end
