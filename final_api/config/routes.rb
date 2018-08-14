Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    # /api...
    namespace :v1 do
      # /api/v1...
      # resources :auctions
      resources :auctions do
        resources :bids, shallow: true, only: [ :create, :destroy ]
      end

      
      resource :session, only: [:create, :destroy]
        # /api/v1/session
      resources :users, only: [] do
        # /api/v1/users/current
        get :current, on: :collection
      end
    end

    match "*unmatched_route", to: "application#not_found", via: :all
  end

end
