Rails.application.routes.draw do
  
  root 'pages#entry'
  get '/newtrip', to: 'trips#new'
  post '/newtrip', to: 'trips#create'

  resources :trips do
    resources :events
  end

  get '/trips/:id/api', to: 'trips#api'

end
