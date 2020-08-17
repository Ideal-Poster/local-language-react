Rails.application.routes.draw do
  resources :visits
  resources :language_locations
  resources :user_languages
  resources :locations
  resources :languages
  resources :users

  get '/locations_by_language', to: 'locations#filter_by_language'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
