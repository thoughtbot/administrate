$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "administrate/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "administrate"
  s.version     = Administrate::VERSION
  s.authors     = ["Grayson Wright"]
  s.email       = ["grayson@thoughtbot.com"]
  s.homepage    = "TODO"
  s.summary     = "TODO: Summary of Administrate."
  s.description = "TODO: Description of Administrate."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.0"

  s.add_development_dependency "sqlite3"
end
