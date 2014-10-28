
class ProjectUserGrant < FokusModel

  belongs_to :project
  belongs_to :project_role
  belongs_to :user
  belongs_to :grantor_user, :class_name => 'User'

end

