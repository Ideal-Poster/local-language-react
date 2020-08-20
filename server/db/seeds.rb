# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

languages = %w{ Mandarin Cantonese Hindi Arabic Portuguese French Korean German Polish Somali }

# bob =  User.create(name: 'bob')
# jivanta = User.create(name: 'jivant')

5.times do
  User.create(name: Faker::Internet.username)
end

languages.each do |language|
  Language.create(name: language)
end

# UserLanguage.create(user: bob, language: chinese)
# UserLanguage.create(user: jivanta, language: chinese)
7.times do
  UserLanguage.create(user: User.all.sample, language: Language.all.sample)
end

# chinese_locations = [
#   {lat: 40.72448553795292, lng: -73.99979419042967 },
#   {lat: 40.734482035662616, lng: -73.9840383282451 },
#   {lat: 40.74592765026943, lng: -73.99450967223925 },
#   {lat: 40.745017275752154, lng: -73.97665688903612 },
#   {lat: 40.754250496596796, lng: -73.9727086773662 }
# ]


100.times do
  Location.create(
    name: Faker::Restaurant.name,
    lat: rand(40.6202634021034..40.823562134692665),
    lng: rand(-74.07335109045408..-73.86409587194822)
  )
end

# location_1 = Location.create(name: "store", lat: 40.72448553795292, lng: -73.99979419042967)
# location_2 = Location.create(name: "store1", lat: 40.734482035662616, lng: -73.9840383282451)
# location_3 = Location.create(name: "store2", lat: 40.74592765026943, lng: -73.99450967223925)
# location_4 = Location.create(name: "store3", lat: 40.745017275752154, lng: -73.97665688903612)
# location_5 = Location.create(name: "store4", lat: 40.754250496596796, lng: -73.9727086773662)
200.times do
  LanguageLocation.create(language: Language.all.sample, location: Location.all.sample)
end


# LanguageLocation.create(language: chinese, location: location_1)
# LanguageLocation.create(language: chinese, location: location_2)
# LanguageLocation.create(language: chinese, location: location_3)
# LanguageLocation.create(language: chinese, location: location_4)
# LanguageLocation.create(language: spanish, location: location_1)
# LanguageLocation.create(language: spanish, location: location_5)

400.times do
  Visit.create(user: User.all.sample, location: Location.all.sample)
end


# Visit.create(user: bob, location: location_1)
# Visit.create(user: bob, location: location_2)
# Visit.create(user: bob, location: location_4)
# Visit.create(user: bob, location: location_4)
# Visit.create(user: bob, location: location_4)



# Visit.create(user: jivanta, location: location_1)
# Visit.create(user: jivanta, location: location_3)
# Visit.create(user: jivanta, location: location_5)




