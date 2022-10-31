---
title: Begin Here
---

Administrate is a Rails engine released as a Ruby gem,
and can be added on Rails 5.0 or higher applications.
Ruby should be 2.7 or higher.

Begin by adding our gem:

```ruby
# Gemfile
gem "administrate"
```

Re-bundle, and run our generator:

```bash
$ bundle install
$ rails generate administrate:install
```

You should see some routes appear in `config/routes.rb`,
and a controller in `app/controllers/admin/application_controller.rb`

You should also see a `Dashboard` and a `Controller` class,
per each of your ActiveRecord resources:

- `app/controllers/admin/records_controller.rb`
- `app/dashboards/record_dashboard.rb`

You can change `Admin::ApplicationController`,
and add session logic, permissions, pagination,
or handle similar controller concerns.

You should also add a `root` route,
so your base `/admin` URL displays a dashboard.

```ruby
Rails.application.routes.draw do
  namespace :admin do
    # Add dashboard for your models here
    resources :customers
    resources :orders

    root to: "customers#index" # <--- Root route
  end
 end
```

Your dashboards are displayed or hidden based on your routes.

Each `RecordDashboard` specifies which attributes should be displayed
on the admin dashboard for the `Record` resource.

Each `Admin::RecordsController` can be changed based on your business logic.

Once Administrate has been added,
see your dashboard on <http://localhost:3000/admin>.

### Asset errors?

Are you using Sprockets 4?
Add Administrate's assets to your `manifest.js` file:

```
//= link administrate/application.css
//= link administrate/application.js
```

Unless you do, you may see an error:

```
Asset `administrate/application.css` was not declared to be precompiled in production.
Declare links to your assets in `app/assets/config/manifest.js`.
```

You can read Richard Schneeman describing such a problem;
["Self Hosted Config: Introducing the Sprockets manifest.js"][schneems].

[schneems]: https://www.schneems.com/2017/11/22/self-hosted-config-introducing-the-sprockets-manifestjs

## Add more dashboards

You can make more dashboards by passing a resource name
during dashboard generation.
A dashboard and controller are added.

```bash
$ rails generate administrate:dashboard Record
```

You should manually add a route addressing your dashboard.

```ruby
# config/routes.rb

namespace :admin do
  resources :records
end
```

## Specialized namespace

You can use a namespace besides `Admin`, such as `Console`.
Such changes also appear in your dashboard routes.

```sh
rails generate administrate:install --namespace=console
```

## Upgrade dashboards as your models change.

Plans change. So do your models.
Once you add administrate and generate your dashboards,
any additional changes in your model's attributes
require corresponding manual changes in your dashboards.

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

In cases your dashboards and models become un-synchronized,
you can re-run `rails g administrate:install`,
and examine applied changes using `git diff`.
