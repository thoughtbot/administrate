Rails.application.routes.draw do
  namespace :admin do
    resources :customers do
      member do
        get :become
      end
    end
    resources :line_items, except: [:index]
    resources :log_entries
    resources :orders
    resources :pages
    resources :products
    resources :product_meta_tags
    resources :payments, only: [:index, :show]
    resources :series

    namespace :blog do
      resources :posts
      resources :tags
    end

    resources :stats, only: [:index]

    root to: "customers#index"
  end

  get "/files/receipts/*filename.txt", to: "files#download"

  get "/*page", to: "docs#show", constraints: ->(request) { !request.path.start_with?("/rails/") }
  root to: "docs#index"
end
