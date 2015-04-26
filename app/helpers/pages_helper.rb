module PagesHelper
  def average_wpm
    if @user.races.count == 0
      average = 0
    else
      average = @user.races.average(:wpm).round
    end
  end

  def average_accuracy
    if @user.races.count == 0
      accuracy = 0
    else
      accuracy = @user.races.average(:accuracy).round(2)
    end
  end
end
