
Spinoza::Application.routes.draw do

  devise_for :users,
    :path => 'authentication',
    :path_names => {
      :sign_in  => 'allocate',
      :sign_out => 'release',
      :sign_up  => 'register'
    }

  post '/user/preferences', :to => 'preferences#create'

  ####

  resources :articles,
    :only => [ :index, :show, :new, :edit ]

  resources :concepts,
    :only => [ :index, :show ]

  resources :projects,
    :only => [ :index, :show ]

  get 'search', :to => 'search#index'

  ####

  get 'about', :to => 'help#show', :id => 'about'
  get 'help', :to => 'help#show', :id => 'help'

  get '/health', :to => 'health#show'

  ####

  root :to => 'home#index'

end

