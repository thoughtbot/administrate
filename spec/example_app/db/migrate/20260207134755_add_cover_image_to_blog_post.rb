class AddCoverImageToBlogPost < ActiveRecord::Migration[8.1]
  def change
    add_column :blog_posts, :cover_image, :string
  end
end
