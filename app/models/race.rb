# == Schema Information
#
# Table name: races
#
#  id            :integer          not null, primary key
#  wpm           :integer
#  accuracy      :decimal(, )
#  finished_time :integer
#  user_id       :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Race < ActiveRecord::Base
  belongs_to :user
end
