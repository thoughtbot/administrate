module Features
  if Rails.version >= "6.1"
    require "action_text/system_test_helper"

    include ActionText::SystemTestHelper
  else
    def fill_in_rich_text_area(locator = nil, with:)
      find(:rich_text_area, locator).execute_script("this.editor.loadHTML(arguments[0])", with.to_s)
    end

    Capybara.add_selector :rich_text_area do
      xpath do |label|
        trix_editor = XPath.descendant(:"trix-editor")

        if label.nil?
          trix_editor
        else
          trix_editor.where XPath.attr(:"aria-label").equals(label)
        end
      end
    end
  end
end
