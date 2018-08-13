Rails.application.routes.draw do

  namespace :api, defaults: { format: :json } do
    # /api...
    namespace :v1 do
      # /api/v1...
      resources :questions do
        resources :likes, shallow: true, only: [ :create, :destroy ]
      end

      resources :answers, only: [ :destroy ]
        # /api/v1/questions
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
