require "administrate/base_dashboard"

class ProgrammingLanguageDashboard < Administrate::BaseDashboard

  def self.single_choice_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 1
    )
  end

  def self.single_include_blank_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 1,
      include_blank: true
    )
  end

  def self.multiple_include_blank_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 3,
      include_blank: true,
      )
  end

  def self.single_choice_selected_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 1,
      include_blank: true,
      selected: 'ButBetterYetStillRuby'
    )
  end

  def self.multiple_choices_selected_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 3,
      selected: %w[Ruby Python]
    )
  end

  def self.multiple_choices_selected_with_max_items_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 3,
      include_blank: true
    )
  end

  def self.single_choice_max_item_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 1,
      selected: 'Ruby'
    )
  end

  def self.multiple_choices_select
    Administrate::Field::Select.with_options(
      collection: lambda do
        %w[Ruby Python PHP JavaScript Java C# C++ ButBetterYetStillRuby]
      end,
      max_items: 3,
    )
  end

  ATTRIBUTE_TYPES = {
    id: Field::Number,
    single_choice: single_choice_select,
    multiple_choices: multiple_choices_select,
    single_include_blank: single_include_blank_select,
    multiple_include_blank: multiple_include_blank_select,
    single_choice_selected: single_choice_selected_select,
    multiple_choices_selected: multiple_choices_selected_select,
    single_choice_max_item: single_choice_max_item_select,
    multiple_choices_selected_with_max_items: multiple_choices_selected_with_max_items_select,
    created_at: Field::DateTime,
    updated_at: Field::DateTime
  }.freeze

  COLLECTION_ATTRIBUTES = %i[
    id
    single_choice
    multiple_choices
  ].freeze

  SHOW_PAGE_ATTRIBUTES = %i[
    id
    single_choice
    multiple_choices
    created_at
    updated_at
  ].freeze

  FORM_ATTRIBUTES = %i[
    single_choice
    multiple_choices
    single_include_blank
    multiple_include_blank
    single_choice_selected
    multiple_choices_selected
    single_choice_max_item
    multiple_choices_selected_with_max_items
  ].freeze

  def display_resource(language)
    "Programming Language ##{language.id}"
  end
end
