class LocationsController < ApplicationController

  def index
    locations = Location.all
    locations
    render json: locations, include: :visits 
  end

  def create
    # byebug
    language = User.first.languages.select { |language| language.name == request.headers['currentLanguage'] }.first
    location = Location.new(location_params)
    # user = User.first

    if location.save
      LanguageLocation.create(language: language, location: location)
      location.user_visits = []
      render json: location, include: :user_visits
    else
      render json: {}
    end
  end

  def filter_by_language
    #stub
    locations = Language.find_by(name: request.headers[:currentLanguage]).locations
    visits = User.first.visits
    updated_locations = locations.map do |location|
      if visits.any? { |visit| visit[:location_id] == location.id }
        location.user_visits = visits.filter { |visit| visit.location_id == location[:id] }
        location
      else
        location.user_visits = []
        location
      end
    end

    # byebug
    render json: updated_locations, include: :user_visits
  end

  def filter_by_user
    #stub
    User.first
    render json: user.locations
  end

  def filter_by_friends
  end

  private

  def location_params
    params.require(:location).permit(:name, :lat, :lng, :description)
  end
end
