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
    post = JSON.parse request.raw_post
    if User.first.languages.any? {|language| language.id === post["language_id"] }
      user_language = {}
    else
      user_language = UserLanguage.create(user_id: params[:user_id], language_id: params[:language_id]).language
    end

    render json: user_language
  end
end
