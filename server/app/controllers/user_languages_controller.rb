class UserLanguagesController < ApplicationController
  def index
    user =  User.first
    languages = user.user_languages.map do |user_language|
      user_language.language
    end
    render json: languages
  end

  def create
    user = User.first
    # byebug
    user_language = UserLanguage.create(user_id: params[:user_id], language_id: params[:language_id])
    render json: user_language.language
  end
end
