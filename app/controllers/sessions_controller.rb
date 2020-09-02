class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    user = User.find_by(email: params[:user][:email].downcase)
    if user && user.authenticate(params[:user][:password])
      reset_session
      session[:user_id] = user.id.to_s
      render status: :ok, json: { user: { name: user.name } }
    else
      render status: :not_found, json: { message: 'Incorrect credentials, try again.' }
    end
  end

  def destroy
    reset_session
    render status: :ok, json: { message: 'User logged out successfully' }
  end
end
