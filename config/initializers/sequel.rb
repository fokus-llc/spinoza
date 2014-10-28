
require 'sequel'

Sequel::Model.plugin :active_model

module Spinoza::Sequel

  mattr_accessor :config
  mattr_accessor :db

  module_function

  def configure!
    app_config = Rails.application.config
    env_db_config = app_config.database_configuration.dup[Rails.env]
    if defined?(RUBY_PLATFORM) && RUBY_PLATFORM == 'java'
      driver = env_db_config['adapter']
      env_db_config['adapter'] = 'jdbc'
      env_db_config['uri'] = "jdbc:#{driver}:///#{env_db_config['database']}"
    else
      env_db_config['adapter'].sub!(/postgresql/,'postgres')
    end
    self.config = env_db_config
  end

  def connect!
    self.db = Sequel.connect(config)
    self.db.logger = Rails.logger
    self.db.sql_log_level = :debug
    self.db
  end

end

Spinoza::Sequel.configure!
Spinoza::Sequel.connect!

