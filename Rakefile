begin
  require 'bundler/setup'
rescue LoadError
  puts 'You must `gem install bundler` and `bundle install` to run rake tasks'
end

require 'rdoc/task'

require File.expand_path('../spec/example_app/config/application', __FILE__)

RDoc::Task.new(:rdoc) do |rdoc|
  rdoc.rdoc_dir = 'rdoc'
  rdoc.title    = 'Administrate'
  rdoc.options << '--line-numbers'
  rdoc.rdoc_files.include('README.rdoc')
  rdoc.rdoc_files.include('lib/**/*.rb')
end

Bundler::GemHelper.install_tasks

Rails.application.load_tasks
task(:default).clear
task default: [:spec]

if defined? RSpec
  task(:spec).clear
  RSpec::Core::RakeTask.new(:spec) do |t|
    t.verbose = false
  end
end

namespace :deploy do
  desc "Deploy the example app to Heroku staging"
  task :staging do
    exec %(git push staging `git subtree split --prefix spec/example_app`:master --force)
  end

  desc "Deploy the example app to Heroku production"
  task :production do
    exec %(git push production `git subtree split --prefix spec/example_app`:master --force)
  end
end

task default: "bundler:audit"
