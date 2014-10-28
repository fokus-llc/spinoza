
module Fokus
  class Config < Settingslogic

    source File.join(Rails.root, 'config', 'application.yml')
    namespace Rails.env
    load!

  end
end

