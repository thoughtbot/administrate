---
title: Permissions
---

Administrate's base logic assumes any signed-in super-user
can access any record and run any operation.
You can manage permissions by placing logic in your controllers.

[Pundit] is a popular gem many people describe permissions rules in.
Administrate's Pundit plugin applies your permissions across your dashboards.
See the end of this page.

## Basic permissions

Permissions can be described in `Admin::ApplicationController`
or any subclass.

Here are some examples:

```ruby
# Used in `index` pages and `has_many` relations.
# Describes the records a user can access.
def scoped_resource
  super.where(user: current_user)
end

# A boolean permission based on a resource or action.
def authorized_action?(resource, action)
  current_user.can?(resource, action) # => true || false
end
```

Your controller's `authorize_resource(resource)` is called
upon any resource action,
and raises an error upon illegal access.

## Using Pundit

[Pundit] helps manage permissions,
and should you already be using pundit across your application,
simply add one line in your `Admin::ApplicationController`:

```ruby
include Administrate::Punditize
```

All policies in your main application code are applied on your dashboard pages.

### Scoped record boundaries

Pundit enables scoping a user's resources beyond normal program access rules.
As an example, a user can access any public record in main program screens,
and in your dashboards you need only display records the user has made.
In such cases, Administrate checks a `resolve_admin` in your policy's scope.

For example:

```ruby
class PostPolicy < ApplicationPolicy
  class Scope < Scope
    # applied across main app
    def resolve
      scope.all
    end

    # applied across dashboards
    def resolve_admin
      scope.where(owner: user)
    end
  end
end
```

[Pundit]: https://github.com/elabs/pundit
