class Location < ApplicationRecord
  attr_accessor :user_visits
  attr_accessor :user_visit
  
  has_many :visits
  has_many :users, through: :visits

  has_many :user_languages
  has_many :languages, through: :user_languages

end
