
class FokusModel < ActiveRecord::Base

  self.abstract_class = true
  before_create :remove_blank_attributes_with_defaults

  def remove_blank_attributes_with_defaults
    [ 'row_created', 'created', 'status' ].each do |att|
      @attributes.delete(att) if @attributes[att].blank?
    end
  end

end

