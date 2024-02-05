class AddSlugToProducts < ActiveRecord::Migration[4.2]
  def change
    add_column :products, :slug, :string, null: true

    products = select_all("select id, name from products")
    products.each do |product|
      update(<<-SQL)
        UPDATE products
          SET slug='#{product["name"].parameterize}'
          WHERE id=#{product["id"]}
      SQL
    end

    change_column_null :products, :slug, false
    add_index :products, :slug, unique: true
  end
end
