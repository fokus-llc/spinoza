
class ArticlesController < ApplicationController

  skip_before_filter :authenticate_user!, :only => [ :index, :show ]

  respond_to :html, :only => [ :index, :show, :new ]

  def index
    @project = params[:project]
    @entity_type = params[:entity_type]
    @document_type = params[:document_type]
  end

  def show
    @linkable_id = params[:document_link] || params[:id]
    @concept_slug = params[:concept]
    document_id = Linkable.where(:linkable_id => @linkable_id).first.try(:document_id)
    @editable = check_editable(document_id) && document_project_editable?(document_id)
  end

  def new
    unless @editable = user_signed_in?
      head :forbidden
    end
  end

  def edit
    @linkable_id = params[:document_link] || params[:id]
    document_id = Linkable.where(:linkable_id => @linkable_id).first.try(:document_id)
    unless @editable = check_editable(document_id)
      head :forbidden
    end
  end

  private

  def check_editable(document_id)
    Document.editable?(document_id, current_user.try(:id))
  end

  def document_project_editable?(document_id)
    true
  end

end

