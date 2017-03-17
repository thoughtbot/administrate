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
