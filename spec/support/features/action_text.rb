module Features
  if Rails.version >= "6.1"
    require "action_text/system_test_helper"

    include ActionText::SystemTestHelper
  else
    def fill_in_rich_text_area(locator = nil, with:)
      find(:rich_text_area, locator).execute_script("this.editor.loadHTML(arguments[0])", with.to_s)
    end

    Capybara.add_selector :rich_text_area do
      # Lifted straight from https://github.com/rails/rails/blob/3235827585d87661942c91bc81f64f56d710f0b2/actiontext/lib/action_text/system_test_helper.rb
      label "rich-text area"
      xpath do |locator|
        if locator.nil?
          XPath.descendant(:"trix-editor")
        else
          input_located_by_name = XPath.anywhere(:input).where(XPath.attr(:name) == locator).attr(:id)
          input_located_by_label = XPath.anywhere(:label).where(XPath.string.n.is(locator)).attr(:for)

          XPath.descendant(:"trix-editor").where \
            XPath.attr(:id).equals(locator) |
              XPath.attr(:placeholder).equals(locator) |
              XPath.attr(:"aria-label").equals(locator) |
              XPath.attr(:input).equals(input_located_by_name) |
              XPath.attr(:id).equals(input_located_by_label)
        end
      end
    end
  end
end
