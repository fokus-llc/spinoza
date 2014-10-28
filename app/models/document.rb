
class Document < FokusModel

  self.primary_key = 'document_id'

  belongs_to :document_type
  belongs_to :project

  has_one :linkable

  class << self

    def editable?(document_id, user_id = nil)
      project = project_for_document(document_id)
      project.editable_by_user?(user_id)
    rescue
      false
    end

    def project_for_document(document_id)
      Project.joins(:documents).
        where("documents.document_id" => document_id).
        first!
    end

  end

end

