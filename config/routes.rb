Rails.application.routes.draw do
  resources :customers
  resources :products
  resources :orders
end
