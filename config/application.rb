
require File.expand_path('../boot', __FILE__)

require 'rails/all'

if defined?(Bundler)
  Bundler.require(*Rails.groups(:assets => %w(development test)))
end

module Spinoza
  class Application < Rails::Application

    config.autoload_paths += %W(#{config.root}/lib)

    config.encoding = "utf-8"

    config.filter_parameters += [ :password, :password_confirmation ]

    config.active_support.escape_html_entities_in_json = true

    config.active_record.schema_format = :sql
    config.active_record.whitelist_attributes = false # true

    config.assets.enabled = true
    config.assets.version = '1.0'

  end
end

