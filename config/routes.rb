Rails.application.routes.draw do
  
  root 'pages#entry'

  get 'trips/new'
  get '/newtrip', to: 'trips#new'
  post '/trips/new', to: 'trips#create'

  resources :trips

end
