class Language < ApplicationRecord
  has_many :user_languages
  has_many :users, through: :user_languages

  has_many :language_locations
  has_many :locations, through: :language_locations
end
