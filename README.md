# Administrate

A Rails engine that helps you put together a super-flexible admin dashboard.
[Try the demo][demo].

![administrate](https://images.thoughtbot.com/announcing-administrate/DdP2CQfnSE23PI8AAnDc_Administrate.png)

## Guiding Principles

Administrate is heavily inspired by projects
like [Rails Admin] and [ActiveAdmin],
but aims to provide a better user experience for site admins,
and to be easier for developers to customize.

To do that, Administrate follows a few simple rules:

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
gem "administrate"
```

Re-bundle, then run the installer:

```bash
$ rails generate administrate:install
```

Restart your server, and visit http://localhost:3000/admin
to see your new dashboard in action.

To customize the appearance, behavior, and contents of the dashboard,
see the guides at http://administrate-docs.herokuapp.com.

## Repository Structure

This repository contains both the source code for Administrate,
and a demo Rails app that uses Administrate.
The demo app is [hosted publicly on Heroku][demo].

- The gem's source code lives in the `administrate` subdirectory.
- The demo app is at the repository root,
  in order to support deployment on Heroku.

With this structure, developing a typical feature looks like:

- Add tests in `spec/`
- Implement a feature in `administrate/`
- Exercise the feature using the root-level rails app (`app/`)

## Contributing Guidelines

Use the following guides for getting things done, programming well, and
programming in style.

* [Protocol](http://github.com/thoughtbot/guides/blob/master/protocol)
* [Best Practices](http://github.com/thoughtbot/guides/blob/master/best-practices)
* [Style](http://github.com/thoughtbot/guides/blob/master/style)

[demo]: https://administrate-prototype.herokuapp.com/admin
