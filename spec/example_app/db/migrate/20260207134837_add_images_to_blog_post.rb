class AddImagesToBlogPost < ActiveRecord::Migration[8.1]
  def change
    add_column :blog_posts, :images, :string
  end
end
