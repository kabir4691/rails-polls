class UsersController < ApplicationController

  def create
    user_params = params.require(:user).permit(:name, :email, :password)
    @user = User.new(user_params)

    if @user.save
      render status: :ok, json: { user: { name: @user.name } }
    else
      render status: :forbidden, json: { message: @user.errors.full_messages.join("\n") }
    end
  end
end
