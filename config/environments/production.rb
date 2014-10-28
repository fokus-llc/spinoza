Spinoza::Application.configure do

  config.cache_classes = true

  config.consider_all_requests_local = false

  config.action_controller.perform_caching = true

  config.serve_static_assets = false

  config.assets.compress = false
  config.assets.compile = false
  config.assets.digest = true
  config.assets.precompile += %w( polyfills.js spinoza.js )

  config.i18n.fallbacks = true

  config.active_support.deprecation = :notify

  config.action_mailer.default_url_options = { :host => 'spinoza.io' }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.default :charset => "utf-8"

end
