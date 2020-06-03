---
title: Authorization
---

The default configuration of Administrate is "authenticate-only" - once a
user is authenticated, that user has access to every action of every object.

You can add more fine-grained authorization by overriding methods in the
controller.

## Using Pundit

If your app already uses [Pundit](https://github.com/elabs/pundit) for
authorization, you can add this line to `Admin::ApplicationController`:

```ruby
include Administrate::Punditize
```

This will use a default set of policies to determine if the current user
is able to view a given record or perform a given action. Custom policies
can be enabled by defining policy classes under `policies/admin` extending
`Admin::ApplicationPolicy`.

## Authorization without Pundit

If you use a different authorization library, or you want to roll your own,
you just need to override a few methods in your controllers or
`Admin::ApplicationController`. For example:

```ruby
# Limit the scope of the given resource
def scoped_resource
  super.where(user: current_user)
end

# Raise an exception if the user is not permitted to access this resource
def authorize_resource(resource)
  raise "Erg!" unless show_action?(params[:action], resource)
end

# Hide links to actions if the user is not allowed to do them
def show_action?(action, resource)
  current_user.can? action, resource
end
```
