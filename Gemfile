# vim:filetype=ruby

source 'https://rubygems.org'

gem 'rails', '3.2.19'

gem 'settingslogic'

# persistence

gem 'pg', :platforms => :ruby
gem 'activerecord-jdbcpostgresql-adapter', :platforms => :jruby
gem 'sequel'
gem 'with_advisory_lock'

# models

gem 'will_paginate'

# views

gem 'haml'
gem 'sass'
gem 'dimensions-rails'
gem 'rabl-rails'
gem 'kramdown'
gem 'haml-rails', :group => :development
gem 'html5-rails' # can't be in assets

# assets

group :assets do

  gem 'sass-rails'
  gem 'coffee-rails'
  gem 'uglifier'
  gem 'sprockets-sass'
  gem 'compass', '~> 0.13.alpha.0'
  gem 'compass-rails'
  gem 'compass-h5bp'
  gem 'susy'
  gem 'sassy-buttons'

  gem 'handlebars_assets',
    :git => 'git://github.com/teleological/handlebars_assets.git',
    :branch => 'patch-0-12'

  gem 'therubyracer',
    :platforms => :ruby,
    :require => 'v8'
  gem "therubyrhino",
    :platforms => :jruby,
    :require => 'rhino'

end

# authentication / authorization

gem 'devise', '2.2.3' # 2.2.4 breaks things
gem 'devise_invitable'
gem 'devise_session_expirable'

# misc

gem 'patience_diff',
  :git    => 'git://github.com/teleological/ruby_patience_diff.git',
  :branch => 'gemspec_included'

gem 'nokogiri'
gem 'htmlentities'

gem 'citeproc'
gem 'edtf',
  :git     => 'git://github.com/teleological/edtf-ruby.git',
  :branch  => '1-0-stable-gem'

# testing

group :test do
  gem 'machinist'
  gem 'webmock'
end

[:development, :test].tap do |test_group|
  gem 'rspec-rails',
    :group => test_group
  gem 'simplecov',
    :platforms => :ruby,
    :require   => false,
    :group     => test_group
  gem 'simplecov-rcov',
    :platforms => :ruby,
    :require   => false,
    :group     => test_group
  gem 'simplecov-rcov-text',
    :platforms => :ruby,
    :require   => false,
    :group     => test_group
  gem 'metric_fu',
    :platforms => :ruby,
    :git       => 'git://github.com/teleological/metric_fu.git',
    :branch    => 'liberal_dependencies',
    :group     => test_group
  gem 'puma',
    :group => test_group
end

gem 'rails-erd', :group => :development

