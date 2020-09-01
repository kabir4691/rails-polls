Rails.application.routes.draw do
  
  root "static#index"

  resources "users", only: [:create]
  resource "session", only: [:create, :destroy]
end
