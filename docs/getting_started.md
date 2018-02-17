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

You will also want to add a `root` route to show a dashboard when you go to `/admin`.

```ruby
Rails.application.routes.draw do
  namespace :admin do
    # Add dashboard for your models here
    resources :customers,
    resources :orders
  
    root to: "customers#index" # <--- Root route
  end
 end
 ```

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

## Keep Dashboards Updated as Model Attributes Change

If you've installed Administrate and generated dashboards and _then_ 
subsequently added attributes to your models you'll need to manually add 
these additions (or removals) to your dashboards.

Example:

```ruby
# app/dashboards/your_model_dashboard.rb

  ATTRIBUTE_TYPES = {
    # ...
    the_new_attribute: Field::String,
    # ...
  }.freeze
  
  SHOW_PAGE_ATTRIBUTES = [
    # ...
    :the_new_attribute,
    # ...
  ].freeze

  FORM_ATTRIBUTES = [
    # ...
    :the_new_attribute,
    # ...
  ].freeze
  
  COLLECTION_ATTRIBUTES = [
    # ...
    :the_new_attribute, # if you want it on the index, also.
    # ...
  ].freeze
```

It's recommended that you make this change at the same time as you add the 
attribute to the model.

The alternative way to handle this is to re-run `rails g administrate:install` and 
carefully pick through the diffs. This latter method is probably more cumbersome.

## Rails API

Since Rails 5.0, we've been able to have API only applications. Yet, sometimes
we still want to have an admin. 

To get this working, we recommend updating this config:

```ruby
# config/application.rb
config.api_only = false
```

That means, when your app _boots_, we'll have access to flashes and such. We
also don't use your `ApplicationController`. Instead, Administrate provides its
own. Meaning you're free to specify `ActionController::API` as your parent
controller to make sure no flash, session, or cookie middleware is used by your
API.

Alternatively, if your application needs to have `config.api_only = true`, we recommend you add the following lines to your `config/application.rb`

```ruby
# Enable Flash, Cookies, MethodOverride for Administrate Gem
config.middleware.use ActionDispatch::Flash
config.session_store :cookie_store
config.middleware.use ActionDispatch::Cookies
config.middleware.use ActionDispatch::Session::CookieStore, config.session_options
config.middleware.use ::Rack::MethodOverride
```

You must also ensure that the all the required controller actions are available and accessible as routes since generators in API-only applications only generate some of the required actions. Here is an example:

```ruby
# routes.rb
namespace :admin do
  resources name, only: %i(index show new create edit update destroy)
end

# names_controller.rb
# Ensure each of those methods are defined
```
