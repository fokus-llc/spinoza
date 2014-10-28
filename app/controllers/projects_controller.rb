
class ProjectsController < ApplicationController

  skip_before_filter :authenticate_user!, :only => [ :index, :show ]

  respond_to :html, :only => [ :index, :show ]

  def index
    @project_sort = params[:sort] || 'name'
  end

  def show
    @project_slug = params[:id]
  end

end

