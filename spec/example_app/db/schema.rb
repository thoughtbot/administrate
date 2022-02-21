# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_14_081950) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blog_posts", id: :serial, force: :cascade do |t|
    t.string "title"
    t.datetime "published_at"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "countries", id: :serial, force: :cascade do |t|
    t.string "code", null: false
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["code"], name: "index_countries_on_code", unique: true
  end

  create_table "customers", id: :serial, force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "email_subscriber"
    t.string "kind", default: "standard", null: false
    t.string "country_code"
    t.time "example_time"
    t.string "password"
    t.boolean "hidden", default: false, null: false
  end

  create_table "line_items", id: :serial, force: :cascade do |t|
    t.integer "order_id"
    t.integer "product_id"
    t.float "unit_price"
    t.integer "quantity"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_line_items_on_order_id"
    t.index ["product_id"], name: "index_line_items_on_product_id"
  end

  create_table "log_entries", force: :cascade do |t|
    t.string "action"
    t.string "logeable_type"
    t.bigint "logeable_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["logeable_type", "logeable_id"], name: "index_log_entries_on_logeable"
  end

  create_table "orders", id: :serial, force: :cascade do |t|
    t.integer "customer_id"
    t.string "address_line_one"
    t.string "address_line_two"
    t.string "address_city"
    t.string "address_state"
    t.string "address_zip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "shipped_at"
    t.index ["customer_id"], name: "index_orders_on_customer_id"
  end

  create_table "pages", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.bigint "product_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["product_id"], name: "index_pages_on_product_id"
  end

  create_table "payments", id: :serial, force: :cascade do |t|
    t.integer "order_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["order_id"], name: "index_payments_on_order_id"
  end

  create_table "product_meta_tags", id: :serial, force: :cascade do |t|
    t.integer "product_id"
    t.string "meta_title", null: false
    t.string "meta_description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", id: :serial, force: :cascade do |t|
    t.string "name"
    t.float "price"
    t.text "description"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug", null: false
    t.integer "release_year", limit: 2
    t.index ["slug"], name: "index_products_on_slug", unique: true
  end

  create_table "series", force: :cascade do |t|
    t.string "name", null: false
  end

  add_foreign_key "line_items", "orders"
  add_foreign_key "line_items", "products"
  add_foreign_key "orders", "customers"
  add_foreign_key "pages", "products"
  add_foreign_key "payments", "orders"
end
