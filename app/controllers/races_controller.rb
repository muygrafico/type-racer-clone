class RacesController < ApplicationController
  before_filter :authenticate_user! , only: [:index,:create]
  def index
    @user = current_user
    joke = HTTParty.get('http://api.icndb.com/jokes/random')
    joke.each do | info |
      @joke = info[1]['joke']
    end
  end

  def create
    @race = Race.new(race_params)
    if @race.save
      render json: @race, status: 201
    else
      render json: @race.errors, status: 422
    end
  end

  private

  def race_params
    params.require(:race).permit(:wpm, :accuracy, :finished_time, :user_id)
  end

end
