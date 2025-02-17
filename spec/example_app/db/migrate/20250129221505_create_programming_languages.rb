class CreateProgrammingLanguages < ActiveRecord::Migration[8.0]
  def change
    create_table :programming_languages do |t|
      t.jsonb :multiple_include_blank, default: [], null: false
      t.jsonb :multiple_choices, default: [], null: false
      t.jsonb :multiple_choices_selected, default: [], null: false
      t.jsonb :multiple_choices_selected_with_max_items, default: [], null: false
      t.string :single_choice
      t.string :single_include_blank
      t.string :single_choice_selected
      t.string :single_choice_max_item

      t.timestamps
    end
  end
end
