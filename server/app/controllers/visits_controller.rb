class VisitsController < ApplicationController
  def create
    # byebug
    user = User.first
    location = Location.find(params[:id])
    visit = Visit.create(user: user, location: location)
    render json: visit
  end

  def index
    # visited_locations = User.first.visits.map do |visit|
    #   visit.location.user_visit = visit
    #   visit.location
    # end
    # render json: visited_locations, include: :user_visit
    # byebug



    # User.first.locations.select{|location| location.languages.any? {|language| language.name == request.headers["currentLanguage"]} }.count

    # total count
    visit_count = User.first.locations.select{|location| location.languages.any? {|language| language.name == request.headers["currentLanguage"]} }.count
    location_count = User.first.locations.select{|location| location.languages.any? {|language| language.name == request.headers["currentLanguage"]} }.uniq {|location| location.id }.count
    top_hangouts = User.first.locations
                    .select{|location| location.languages.any? {|language| language.name == request.headers["currentLanguage"]} }
                    .uniq {|location| location.id }
                    .sort_by{ |location| location.visits.count }
                    .reverse[0...5]


    # byebug

    render json: {
      visitCount: visit_count,
      locationCount: location_count,
      topHangouts: top_hangouts
    }

  end


end
