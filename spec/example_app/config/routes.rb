Rails.application.routes.draw do
  namespace :admin do
    resources :customers
    resources :line_items
    resources :log_entries
    resources :orders
    resources :products
    resources :product_meta_tags
    resources :payments, only: [:index, :show]
    resources :series

    namespace :blog do
      resources :posts
    end

    root to: "customers#index"
  end

  get "/:page", to: "docs#show"
  root to: "docs#index"
end
