
module ApplicationHelper

  def rabl(obj, template)
    RablRails.render(obj, template, :format => :json)
  end

  def application_name
    "Spinoza"
  end

  def html_title
    [
      application_name,
      ': ',
      page_title
    ].join('')
  end

  def page_title
    @page_title || action_title
  end

  def action_title
    [
      controller.controller_name.titleize,
      ' - ',
      controller.action_name.titleize
    ].join('')
  end

  def body_dom_id
    controller_dom_id
  end

  def controller_dom_id
    [ 'fv-',  controller.controller_name ].join('')
  end

  def body_dom_class
    action_dom_class
  end

  def action_dom_class
    [ 'fv-',  controller.action_name ].join('')
  end

  def user_can_create_article?
    user_signed_in?
  end

  def api_token_hash
    current_user.api_token if user_signed_in?
  end

end

