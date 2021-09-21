class Api::V1::UsersController < ApplicationController
  
  def index
    @users = User.all
    render json: @users
  end

  def profile
    render json: { user: UserSerializer.new(current_user) }, status: :accepted
  end
  
  def create
    user = User.create(user_params)
    if user
      session[:user_id] = user.id
      render json: {
        status: :created,
        user: UserSerializer.new(user)
      }
    else
      render json: {
        status: :unprocessable_entity,
        error: 'failed to create user' }
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation, :email, :bio)
  end
end
