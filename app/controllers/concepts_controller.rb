
class ConceptsController < ApplicationController

  skip_before_filter :authenticate_user!, :only => [ :index, :show ]

  respond_to :html, :only => [ :index, :show ]

  def index
  end

  def show
    if linkable_id = params[:concept_link]
      concept_id = Linkable.find(linkable_id).try(:concept_id)
    else
      concept_id = params[:concept_id] || params[:id]
    end
    concept = Concept.find(concept_id)
    @concept_name = concept.name
    @concept_slug = concept.slug
  end

end

