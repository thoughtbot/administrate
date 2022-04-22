$:.push File.expand_path("../lib", __FILE__)

require "administrate/version"

Gem::Specification.new do |s|
  s.name = "administrate"
  s.version = Administrate::VERSION
  s.authors = ["Nick Charlton", "Grayson Wright"]
  s.email = ["nick@nickcharlton.net", "grayson@thoughtbot.com"]
  s.homepage = "https://administrate-demo.herokuapp.com/"
  s.summary = "A Rails engine for creating super-flexible admin dashboards"
  s.license = "MIT"

  s.files = Dir["{app,lib,docs}/**/*", "config/locales/**/*", "LICENSE", "Rakefile"]

  s.add_dependency "actionpack", ">= 5.0"
  s.add_dependency "actionview", ">= 5.0"
  s.add_dependency "activerecord", ">= 5.0"

  s.add_dependency "jquery-rails", ">= 4.0"
  s.add_dependency "kaminari", ">= 1.0"
  s.add_dependency "sassc-rails", "~> 2.1"
  s.add_dependency "selectize-rails", "~> 0.6"

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
