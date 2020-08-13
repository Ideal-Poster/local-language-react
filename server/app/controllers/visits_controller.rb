class VisitsController < ApplicationController
  belongs_to :users
  belongs_to :locations
end
