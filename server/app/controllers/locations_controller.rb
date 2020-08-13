class LocationsController < ApplicationController
  def index
    locations = Location.all
    render json: locations
  end

  def filter_by_language
    #stub
    language = Language.find_by(name: "Manderine")
    render json: language.locations
  end

  def filter_by_user
    #stub
    user = User.first
    render json: user.locations
  end

  def filter_by_friends
  end
end
