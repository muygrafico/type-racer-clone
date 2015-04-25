# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

10.times do |user|
  User.create(name:Faker::Name.first_name, email:Faker::Internet.email, password:"12345678")
end

100.times do |races|
  Race.create(wpm:rand(30..110), accuracy:rand(89.00..100.00), finished_time:rand(20..120), user_id:rand(1..10))
end

20.times do |followers|
  User.find(rand(1..10)).follow(User.find(rand(1..10)))
end