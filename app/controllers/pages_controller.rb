class PagesController < ApplicationController
  def index
    @lastplays = Race.all.order(created_at: :desc ).limit(10)
  end
  def leaderboard
    @counter = 0
    @races = Race.all.order(wpm: :desc).limit(10)
  end
end
