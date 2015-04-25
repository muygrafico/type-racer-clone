class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def follow
    @user = User.find(params[:id])
    puts @user
    current_user.follow(@user)

    redirect_to @user
  end

  def unfollow
    @user = User.find(params[:id])
    current_user.stop_following(@user)

    redirect_to @user
  end
end
