
Rails.application.config.generators do |g|
  g.template_engine   :haml
  g.stylesheet_engine :scss
  g.test_framework :rspec, :fixture => true, :views => false
  g.fixture_replacement :machinist, :dir => 'spec/support/blueprints'
  g.javascript_engine :js
end

