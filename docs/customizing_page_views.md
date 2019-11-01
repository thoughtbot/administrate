# Customizing page views

In order to change the appearance of any page,
you can write custom Rails views.

## Customizing for all resources

The easiest way to get started is by using the built-in generators.
In order to change the appearance of views for all resource types,
call the generators with no arguments.

```bash
rails generate administrate:views:index
 # -> app/views/admin/application/index.html.erb
 # -> app/views/admin/application/_collection.html.erb

rails generate administrate:views:show
 # -> app/views/admin/application/show.html.erb

rails generate administrate:views:edit
 # -> app/views/admin/application/edit.html.erb
 # -> app/views/admin/application/_form.html.erb

rails generate administrate:views:new
 # -> app/views/admin/application/new.html.erb
 # -> app/views/admin/application/_form.html.erb

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
 # -> app/views/admin/users/index.html.erb
 # -> app/views/admin/users/_collection.html.erb

rails generate administrate:views:show User
 # -> app/views/admin/users/show.html.erb

rails generate administrate:views:edit User
 # -> app/views/admin/users/edit.html.erb
 # -> app/views/admin/users/_form.html.erb

rails generate administrate:views:new User
 # -> app/views/admin/users/new.html.erb
 # -> app/views/admin/users/_form.html.erb

rails generate administrate:views User
 # -> all of the above
```

Any changes to these template files
will *only* affect pages that display customers,
and will leave the show pages for other resources unchanged.

## Customizing layouts

Many developers need to customize the layouts of their admin dashboard.
It's as easy as passing in the "layout" keyword to the view generators.

```bash
rails generate administrate:views:layout
 # -> app/views/layouts/admin/application.html.erb
 # -> app/views/admin/application/_navigation.html.erb
 # -> app/views/admin/application/_javascript.html.erb
 # -> app/views/admin/application/_flashes.html.erb

 rails generate administrate:views:navigation
 # It only generates the sidebar partial
 # -> app/views/admin/application/_navigation.html.erb
```
