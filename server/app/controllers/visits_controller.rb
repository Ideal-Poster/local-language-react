class VisitsController < ApplicationController
  def create
    # byebug
    user = User.first
    location = Location.find(params[:id])
    visit = Visit.create(user: user, location: location)
    render json: visit
  end
end
