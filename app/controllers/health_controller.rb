
class HealthController < ApplicationController

  skip_before_filter :authenticate_user!

  def show
    head :ok
  end

end

