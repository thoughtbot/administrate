RSpec.configure do |config|
  config.include AbstractController::Translation

  def with_translations(locale, translations)
    original_backend = I18n.backend

    new_backend = I18n::Backend::KeyValue.new({}, true)
    new_backend.store_translations(locale, translations)

    I18n.backend = I18n::Backend::Chain.new(new_backend, original_backend)

    yield
  ensure
    I18n.backend = original_backend
  end
end
