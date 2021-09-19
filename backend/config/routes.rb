Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create]
      resources :sessions, only: [:create]
      delete '/logout', to: "sessions#logout"
      get '/logged_in', to: "sessions#logged_in"
      post '/login', to: 'auth#create'
      get '/profile', to: 'users#profile'
    end
  end
end
