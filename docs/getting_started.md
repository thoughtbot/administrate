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

The installer creates a few files.
Two of them are standard for any installation:

- `app/controllers/admin/application_controller.rb`
- `app/dashboards/dashboard_manifest.rb`

In addition, the generator creates a `Dashboard` and a `Controller` for each of
your ActiveRecord resources:

- `app/controllers/admin/foos_controller.rb`
- `app/dashboards/foo_dashboard.rb`

The `Admin::ApplicationController` can be customized to add
authentication logic, authorization, pagination,
or other controller-level concerns.

The `DashboardManifest` can be customized to show or hide
different models on the dashboard.

Each `FooDashboard` specifies which attributes should be displayed
on the admin dashboard for the `Foo` resource.

Each `Admin::FooController` can be overwritten to specify custom behavior.

The installer will also add a line to your `config/routes.rb` file:

```ruby
DashboardManifest.new.dashboards.each do |dashboard_resource|
  resources dashboard_resource
end

root controller: DashboardManifest.new.root_dashboard, action: :index
```

Feel free to customize these routes to your heart's content,
then visit <http://localhost:3000/admin> to see your new dashboard in action.
