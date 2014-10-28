
module FokusSpecHelpers

  def sign_in(resource_or_scope, resource=nil)
    scope    ||= Devise::Mapping.find_scope!(resource_or_scope)
    resource ||= resource_or_scope

    warden.instance_variable_get(:@users).delete(scope)
    serialized = warden.session_serializer.store(resource, scope)

    if resource.respond_to?(:session_expired?)
      sess = (warden.raw_session["warden.user.#{scope}.session"] ||= {})
      sess['last_request_at'] = Time.now.utc
    end

    serialized
  end

end

RSpec.configure do |config|
  config.include FokusSpecHelpers
end

