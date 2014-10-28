
class HomeController < ApplicationController

  skip_before_filter :authenticate_user!, :only => [ :index ]

  respond_to :html, :only => [ :index ]

  def index
  end

end

