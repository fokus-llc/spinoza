
class ProjectRole < ActiveRecord::Base

  self.primary_key = 'project_role_id'

  MODE_PUBLISH = 020
  MODE_SUBMIT  = 002

  class << self

    def mode_for_project_and_user(project_id, user_id)
      roles = find_by_sql <<-SQL
        SELECT COALESCE(BIT_OR(project_mode), 0) AS mode
        FROM project_roles pr
        JOIN project_user_grants pug
          ON pr.project_role_id = pug.project_role_id
        WHERE pug.project_id = #{quote_value(project_id)}
          AND pug.user_id = #{quote_value(user_id)}
      SQL
      roles.first.mode.to_i
    end

    def mode_is_editable?(mode)
      (MODE_PUBLISH | MODE_SUBMIT) & mode != 0
    end

  end

end

