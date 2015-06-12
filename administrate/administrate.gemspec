$:.push File.expand_path("../lib", __FILE__)

require "administrate/version"

Gem::Specification.new do |s|
  s.name = "administrate"
  s.version = Administrate::VERSION
  s.authors = ["Grayson Wright"]
  s.email = ["grayson@thoughtbot.com"]
  s.homepage = "https://administrate-docs.herokuapp.com/"
  s.summary = "A Rails engine for creating super-flexible admin dashboards"
  s.license = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "LICENSE", "Rakefile"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 4.2.0"
  s.add_dependency "neat", "~> 1.7.0"

  s.add_development_dependency "sqlite3"

  s.description = <<-DESCRIPTION
Administrate is heavily inspired by projects like Rails Admin and ActiveAdmin,
but aims to provide a better user experience for site admins,
and to be easier for developers to customize.

To do that, we're following a few simple rules:

- No DSLs (domain-specific languages)
- Support the simplest use cases,
  and let the user override defaults with standard tools
  such as plain Rails controllers and views.
- Break up the library into core components and plugins,
  so each component stays small and easy to maintain.
  DESCRIPTION
end
