
class Linkable < FokusModel

  self.primary_key = 'linkable_id'

  belongs_to :concept
  belongs_to :document

end

