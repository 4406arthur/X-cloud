class HomeController < ApplicationController
  

  
  def index
  	if user_signed_in?
  		@files = current_user.uploads
  	end

  end

  def recent

  end

  def search

  end  
  



end
