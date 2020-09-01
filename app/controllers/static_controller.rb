class StaticController < ApplicationController

  def index
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end