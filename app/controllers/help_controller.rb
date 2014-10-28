
class HelpController < ApplicationController

  skip_before_filter :authenticate_user!

  respond_to :html

  SECTIONS = %w[ about ]

  def index
    render :action => SECTIONS[0]
  end

  def show
    section = whitelisted_section(params[:id])
    render :action => section
  end

  private

  def whitelisted_section(section)
    SECTIONS.include?(section) ? section : SECTIONS[0]
  end

end

