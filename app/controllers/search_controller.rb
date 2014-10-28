
class SearchController < ApplicationController

  skip_before_filter :authenticate_user!, :only => [ :index ]

  respond_to :html, :only => [ :index ]

  def index
    @query = params[:q]
    @pub_results =
      PublishedDefinition.
        where("title ILIKE '%'#{ PublishedDefinition.sanitize(@query) }'%'").
        order('published DESC').
        limit(10)
  end

end

