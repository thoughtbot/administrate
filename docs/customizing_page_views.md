# Customizing page views

In order to change the appearance of any page,
you can write custom Rails views.

## Customizing for all resources

The easiest way to get started is by using the built-in generators.
In order to change the appearance of views for all resource types,
call the generators with no arguments.

```bash
rails generate administrate:views:index
 # -> app/views/administrate/application/index.html.erb
 # -> app/views/administrate/application/_table.html.erb

rails generate administrate:views:show
 # -> app/views/administrate/application/show.html.erb

rails generate administrate:views:edit
 # -> app/views/administrate/application/edit.html.erb
 # -> app/views/administrate/application/_form.html.erb

rails generate administrate:views:new
 # -> app/views/administrate/application/new.html.erb
 # -> app/views/administrate/application/_form.html.erb

rails generate administrate:views
 # -> all of the above
```

The generators copy over the default views that Administrate uses,
so you have a good starting point for customizations.
Feel free to change up the file type,
add extra sections to the page,
or blow it all away for your own custom look.

## Customizing for a specific resource

In order to change a dashboard page for a single type of resource,
pass in the resource name to the view generators.

```bash
rails generate administrate:views:index User
 # -> app/views/administrate/users/index.html.erb
 # -> app/views/administrate/users/_table.html.erb

rails generate administrate:views:show User
 # -> app/views/administrate/users/show.html.erb

rails generate administrate:views:edit User
 # -> app/views/administrate/users/edit.html.erb
 # -> app/views/administrate/users/_form.html.erb

rails generate administrate:views:new User
 # -> app/views/administrate/users/new.html.erb
 # -> app/views/administrate/users/_form.html.erb

rails generate administrate:views User
 # -> all of the above
```

Any changes to these template files
will *only* affect pages that display customers,
and will leave the show pages for other resources unchanged.
