ActionController::Routing::Routes.draw do |map|
  map.resources :projects
  map.resources :features

  map.resources :projects, :has_many => [ :features ]

  map.resources :welcome
  map.root :controller => "welcome"

  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end

