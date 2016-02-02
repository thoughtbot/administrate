# Customizing attribute partials

Occasionally you might want to change how specific types of attributes appear
across all dashboards.
For example, you might want all `Number` values to round to three decimal points.

To get started, run the appropriate rails generator:

```bash
rails generate administrate:views:field number
```

This will generate three files:

- `app/view/fields/form/_number.html.erb`
- `app/view/fields/index/_number.html.erb`
- `app/view/fields/show/_number.html.erb`

The generated templates will have documentation
describing which variables are in scope.
The rendering part of the partial will look like:

```eruby
<%= field.data %>
```

Changing numbers to display to three decimal places might look like this:

```eruby
<%= field.data.round(3) %>
```

If you only want to change how an attribute appears
on a single page (e.g. `index`), you may delete the unnecessary templates.
