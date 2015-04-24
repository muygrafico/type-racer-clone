class RacesController < ApplicationController
  before_filter :authenticate_user! , only: [:index,:create]
  def index
    @user = current_user
  end

  def create
  end
end
