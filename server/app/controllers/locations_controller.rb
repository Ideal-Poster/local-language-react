class LocationsController < ApplicationController

  def index
    locations = Location.all
    locations
    render json: locations, include: :visits 
  end

  def create
    # Location.create()
  end

  def filter_by_language
    #stub
    locations = Language.first.locations
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
    render json: locations, include: :user_visits
  end

  def filter_by_user
    #stub
    User.first
    render json: user.locations
  end

  def filter_by_friends
  end

  # def user_locations
  #   # User.first.locations
  #   locations = Locations.all
  #   visits = User.first.visits
  #   updated_locations = locations.map do |location|
  #     if visits.any? { |visit| visit[:location_id] == location.id }
  #       location.user_visits = visits.filter { |visit| visit.location_id == location[:id] }
  #       location
  #     else
  #       location.user_visits = []
  #       location
  #     end
  #   end
  #   render json: locations, include: :user_visits
  # end

end
