class PagesController < ApplicationController
  def index
  end
  def leaderboard
    @counter = 0
    @races = Race.all.order(wpm: :desc).limit(10)
  end
end
