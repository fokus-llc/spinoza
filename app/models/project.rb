
class Project < FokusModel

  self.primary_key = 'project_id'

  has_many :documents
  has_many :project_user_grants
  has_many :users,
    :through => :project_user_grants

  def editable_by_user?(user_id = nil)
    mode = self.class.mode_for_user(id, user_id)
    ProjectRole.mode_is_editable?(mode)
  end

  class << self

    def mode(project_id)
      Project.where(:project_id => project_id).
        pluck(:default_mode).first
    end

    def mode_for_user(project_id, user_id = nil)
      project_mode = mode(project_id)
      user_mode = user_id.present? ?
        ProjectRole.mode_for_project_and_user(project_id, user_id) : 0
      project_mode | user_mode
    end

  end

end

