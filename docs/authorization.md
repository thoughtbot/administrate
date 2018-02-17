# Authorization

The default configuration of Administrate is "authenticate-only" - once a
user is authenticated, that user has access to every action of every object.

You can add more fine-grained authorization by overriding methods in the
controller.

## Using Pundit

If your app already uses [Pundit](https://github.com/elabs/pundit) for
authorization, you just need to add one line to your
`Admin::ApplicationController`:

```ruby
include Administrate::Punditize
```

This will use all the policies from your main app to determine if the
current user is able to view a given record or perform a given action.

### Further limiting scope

You may want to limit the scope for a given user beyond what they
technically have access to see in the main app. For example, a user may
have all public records in their scope, but you want to only show *their*
records in the admin interface to reduce confusion.

In this case, you can add an additional `resolve_admin` to your policy's
scope and Administrate will use this instead of the `resolve` method.

For example:

```ruby
class PostPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.all
    end
    
    def resolve_admin
      scope.where(owner: user)
    end
  end
end
```

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
