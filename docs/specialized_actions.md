---
title: Specialized actions
---

Once you add Administrate dashboards in your program,
you should see a bare controller per each of your program's resources.
Each controller on generation looks like:

```ruby
# app/controllers/admin/records_controller.rb

class Admin::RecordsController < Admin::ApplicationController

  # Overwrite any of the RESTful controller actions to implement custom behavior
  # For example, you may want to send an email after a record is updated.
  #
  # def update
  #   record = Record.find(params[:id])
  #   record.update(params[:record])
  #   send_record_updated_email
  # end

  # Override this method to specify custom lookup behavior.
  # This will be used to set the resource for the `show`, `edit`, and `update`
  # actions.
  #
  # def find_resource(param)
  #   Record.find_by!(slug: param)
  # end

  # Override this if you have certain roles that require a subset
  # this will be used to set the records shown on the `index` action.
  #
  # def scoped_resource
  #  if current_user.super_admin?
  #    resource_class
  #  else
  #    resource_class.with_less_stuff
  #  end
  # end
end
```

## Customizing Actions

You can globally disable an action,
by dropping corresponding routes in `config/routes.rb`,
as is normal in Rails.
For example:

```ruby
Rails.application.routes.draw do
  # ...
  namespace :admin do
    # ...

    # Payments can only be listed or displayed
    resources :payments, only: [:index, :show]
  end
end
```

## Specialized ordering

You can order records on index actions
by changing `default_sorting_attribute` or `default_sorting_direction`,
in your dashboard controller:

```ruby
def default_sorting_attribute
  :age
end

def default_sorting_direction
  :desc
end
```

## Redirect once action is done

You can redirect after the actions `create`, `update` and `destroy` by changing
`after_resource_created_path`,
`after_resource_updated_path`,
or `after_resource_destroyed_path`:

```ruby
    def after_resource_destroyed_path(_requested_resource)
      { action: :index, controller: :some_other_resource }
    end

    def after_resource_created_path(requested_resource)
      [namespace, requested_resource.some_other_resource]
    end

    def after_resource_updated_path(requested_resource)
      [namespace, requested_resource.some_other_resource]
    end
```
