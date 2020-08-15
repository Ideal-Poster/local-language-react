class VisitsController < ApplicationController
  belongs_to :users
  belongs_to :locations

  def create
    # byebug
    # user = User.first
    # Location.find(params[:id])
    # Visit.create(user)
  end
end
