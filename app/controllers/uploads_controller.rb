class UploadsController < ApplicationController

  def create
    Upload.create(:user_id => params[:user_id], :gservice => params[:gservice], :dservice => params[:dservice], :gfid => params[:gfid], :dfid => params[:dfid] ,:fname => params[:fname], :mimetype => params[:mimetype])
    render :nothing => true
  end

  def destroy
    target = Upload.find( params[:id] )
    Upload.destroy(target)
    render :nothing => true   
  end

end
