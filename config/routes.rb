Rails.application.routes.draw do
  
  root 'pages#entry'

  resources :trips do
    resources :events
  end

end
