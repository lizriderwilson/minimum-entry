class Api::V1::SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { 
        status: :created,
        logged_in: :true,
        user: user
       }
    else
      render json: {
        status: 401
      }
    end
  end

end
