class Location < ApplicationRecord
  has_many :visits
  has_many :visits, through: :users
end
