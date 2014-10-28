
class User < FokusModel

  self.primary_key = 'user_id'

  devise :database_authenticatable,
         :session_expirable,
         :rememberable,
         :registerable,
         :invitable,
         :confirmable,
         :recoverable,
         :trackable
         # :validatable

  attr_accessible :name, :email,
    :password, :password_confirmation,
    :remember_me

  has_many :project_user_grants
  has_many :project_user_grantings,
    :class_name => 'ProjectUserGrant',
    :source => 'grantor_user_id'

end

