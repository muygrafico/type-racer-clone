class PagesController < ApplicationController
  def index
    @lastplays = Race.all.order(created_at: :desc ).limit(10)
  end
end
