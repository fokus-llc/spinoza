
class Concept < FokusModel

  self.primary_key = 'concept_id'

  belongs_to :project

  has_one :linkable

end

