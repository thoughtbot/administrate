Rails.application.routes.draw do
  resources :customers
  resources :line_items
  resources :products
  resources :orders
end
