# Administrate (The Human Effort's Fork)

[![Circle CI](https://img.shields.io/circleci/project/thoughtbot/administrate/master.svg)](https://circleci.com/gh/thoughtbot/administrate/tree/master)
[![Gem Version](https://badge.fury.io/rb/administrate.svg)](https://badge.fury.io/rb/administrate)
[![Code Climate](https://codeclimate.com/github/thoughtbot/administrate/badges/gpa.svg)](https://codeclimate.com/github/thoughtbot/administrate)

A framework for creating flexible, powerful admin dashboards in Rails.
[Try the demo][demo].

Differences from Upstream (thoughtbot/administrate):

- Docker-based development environment.
- Supports changing the labels of fields.

We've submitted PRs for all features we've added, but so far none of
them have been taken in.  We're committed to making each change
available to our upstream source, but we're OK if they don't fit into
their mission.  Big thanks to Thoughtbot for putting together such a
useful gem!

## What Is Administrate?

Administrate is a library for Rails apps
that automatically generates admin dashboards.
Administrate's admin dashboards give non-technical users clean interfaces
that allow them to create, edit, search, and delete records
for any model in the application.

Administrate solves the same problem as [Rails Admin] and [ActiveAdmin],
but aims to provide a better user experience for site admins,
and to be easier for developers to customize.

To accomplish these goals, Administrate follows a few guiding principles:

- No DSLs (domain-specific languages)
- Support the simplest use cases, and let the user override defaults with
  standard tools such as plain Rails controllers and views.
- Break up the library into core components and plugins,
  so each component stays small and easy to maintain.

[Rails Admin]: https://github.com/sferik/rails_admin
[ActiveAdmin]: http://activeadmin.info/

## Getting Started

Add Administrate to your Gemfile:

```ruby
# Gemfile
gem "administrate", github: "thehumaneffort/administrate"
```

Re-bundle, then run the installer:

```bash
$ rails generate administrate:install
```

Restart your server, and visit http://localhost:3000/admin
to see your new dashboard in action.

To customize the appearance, behavior, and contents of the dashboard,
see the guides at https://administrate-prototype.herokuapp.com.

## Repository Structure

This repository contains both the source code for Administrate,
and a demo Rails app that uses Administrate.
The demo app is [hosted publicly on Heroku][demo].

- The gem's source code lives in the `app` and `lib` subdirectories.
- The demo app is nested within `spec/example_app`.

Rails configuration files have been changed
to recognize the app in the new location,
so running the server or deploying to Heroku works normally.

With this structure, developing a typical feature looks like:

- Add tests in `spec/`
- Implement a feature in `administrate/`
- Exercise the feature using the demo rails app (`spec/example_app/app/`)

## Contributing Guidelines

Use the following guides for getting things done, programming well, and
programming in style.

* [Protocol](http://github.com/thoughtbot/guides/blob/master/protocol)
* [Best Practices](http://github.com/thoughtbot/guides/blob/master/best-practices)
* [Style](http://github.com/thoughtbot/guides/blob/master/style)

[demo]: https://administrate-prototype.herokuapp.com/admin
