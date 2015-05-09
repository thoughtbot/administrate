# Administrate-prototype

This project is a demo app for Administrate.
Administrate is a library that makes it easy to create
flexible admin dashboards in Rails.

This demo app is a fairly standard e-commerce app,
similar to [ActiveAdmin's demo site](http://demo.activeadmin.info/).

Administrate is currently being developed in this repository,
and will be extracted into a gem when it is stable enough to stand on its own.

# Project architecture

## Application code

Located in the `app` directory.

This is code that a developer would write to get their admin dashboard set up.
It contains all domain-specific code.

- A user defines a dashboard for each model
  in `app/dashboards/model_dashboard.rb`.

## Library code

Located in the `lib` directory,
as well as in `app/controllers/dashboard_controller` and `app/views/dashboard`.

Library code is on track to be extracted into the Administrate gem,
and should not contain any domain-specific code.

In this demo app,
the lib files should contain no references to `Customer`, `Product`, `Order`,
or any of those models' attributes.

- [Pages] define how to display resources on a specific page.
- [Fields] define how to display an attribute on each page.

[Pages]: https://github.com/thoughtbot/administrate-demo/tree/master/lib/pages
[Fields]: https://github.com/thoughtbot/administrate-demo/tree/master/lib/fields

## Getting Started

After you have cloned this repo, run this setup script to set up your machine
with the necessary dependencies to run and test this app:

    % ./bin/setup

It assumes you have a machine equipped with Ruby, Postgres, etc. If not, set up
your machine with [this script].

[this script]: https://github.com/thoughtbot/laptop

After setting up, you can run the application using [foreman]:

    % foreman start

If you don't have `foreman`, see [Foreman's install instructions][foreman]. It
is [purposefully excluded from the project's `Gemfile`][exclude].

[foreman]: https://github.com/ddollar/foreman
[exclude]: https://github.com/ddollar/foreman/pull/437#issuecomment-41110407

## Guidelines

Use the following guides for getting things done, programming well, and
programming in style.

* [Protocol](http://github.com/thoughtbot/guides/blob/master/protocol)
* [Best Practices](http://github.com/thoughtbot/guides/blob/master/best-practices)
* [Style](http://github.com/thoughtbot/guides/blob/master/style)

## Deploying

If you have previously run the `./bin/setup` script,
you can deploy to staging and production with:

    $ ./bin/deploy staging
    $ ./bin/deploy production
