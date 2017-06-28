class CreateBlogPosts < ActiveRecord::Migration[4.2]
  def change
    create_table :blog_posts do |t|
      t.string :title
      t.datetime :published_at
      t.text :body

      t.timestamps null: false
    end
  end
end
