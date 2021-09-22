Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create]
      delete '/logout', to: "sessions#logout"
      get '/logged_in', to: "sessions#logged_in"
      post '/login', to: 'sessions#create'
      get '/profile', to: 'users#profile'
    end
  end
end
