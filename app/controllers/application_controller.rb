
class ApplicationController < ActionController::Base

  before_filter :authenticate_user!
  before_filter :configure_client

  protect_from_forgery

  wrap_parameters false # don't wrap json input in controller-named root object

  private

  def configure_client
    @data_url = URI(Fokus::Config.lenzensleijper_url)
  end

end

