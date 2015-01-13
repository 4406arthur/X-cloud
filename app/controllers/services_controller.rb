class ServicesController < ApplicationController
  def create
  	Service.create(:user_id => params[:user_id], :service_id => params[:service_id], :service_name => params[:service_name] ,:folder_id => params[:folder_id])
    render :nothing => true
  end


  

end
