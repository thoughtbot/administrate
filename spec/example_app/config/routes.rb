Rails.application.routes.draw do
  namespace :admin do
    resources :customers
    resources :line_items
    resources :orders
    resources :products
    resources :payments, only: [:index, :show]

    namespace :blog do
      resources :posts
    end

    root to: "customers#index"
  end

  get "/:page", to: "docs#show"
  root to: "docs#index"
end
