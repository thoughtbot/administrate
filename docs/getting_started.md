# Getting Started

Administrate is released as a Ruby gem, and can be installed on Rails
applications version 4.2 or greater.

Add the following to your Gemfile:

```ruby
# Gemfile
gem "administrate"
```

Re-bundle, then run the installer:

```bash
$ rails generate administrate:install
```

The installer adds some new routes to your `config/routes.rb`,
and creates a controller at `app/controllers/admin/application_controller.rb`

In addition, the generator creates a `Dashboard` and a `Controller` for each of
your ActiveRecord resources:

- `app/controllers/admin/foos_controller.rb`
- `app/dashboards/foo_dashboard.rb`

The `Admin::ApplicationController` can be customized to add
authentication logic, authorization, pagination,
or other controller-level concerns.

The routes can be customized to show or hide
different models on the dashboard.

Each `FooDashboard` specifies which attributes should be displayed
on the admin dashboard for the `Foo` resource.

Each `Admin::FooController` can be overwritten to specify custom behavior.

Once you have Administrate installed,
visit <http://localhost:3000/admin> to see your new dashboard in action.

## Create Additional Dashboards

In order to create additional dashboards, pass in the resource name to
the dashboard generator. A dashboard and controller will be created.

```bash
$ rails generate administrate:dashboard Foo
```

Add a route for the new dashboard.

```ruby
# config/routes.rb

namespace :admin do
  resources :foos
end
```

## Rails API

Since Rails 5.0, we've been able to have API only applications. Yet, sometimes
we still want to have an admin. To get this working, please update this config:

```ruby
# config/application.rb
config.api_only = false
```

That means, when your app _boots_, we'll have access to flashes and such. We
also don't use your `ApplicationController`. Instead, Administrate provides its
own. Meaning you're free to specify `ActionController::API` as your parent
controller to make sure no flash, session, or cookie middleware is used by your
API.
