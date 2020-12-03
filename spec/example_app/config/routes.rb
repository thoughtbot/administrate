Rails.application.routes.draw do
  namespace :admin do
    resources :customers
    resources :line_items
    resources :log_entries
    resources :orders
    resources :pages
    resources :products
    resources :product_meta_tags, except: [:index]
    resources :payments, only: [:index, :show]
    resources :series

    namespace :blog do
      resources :posts
    end

    resources :stats, only: [:index]

    root to: "customers#index"
  end

  get "/*page", to: "docs#show"
  root to: "docs#index"
end
