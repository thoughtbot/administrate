---
title: Normalized fields
---

Ruby and Rails are based on a number of normalized field classes,
and all are rendered by Administrate based on common, sensible designs.
Such fields include:

- `belongs_to`
- `boolean`
- `date_time`
- `date`
- `email`
- `has_many`
- `has_one`
- `number`
- `polymorphic`
- `select`
- `string`
- `text`

Perhaps you need change a field's display logic across all dashboard pages.
Perhaps all `Number` values should display three decimals.

Begin by running our generator:

```bash
rails generate administrate:views:field number
```

You should see:

- `app/view/fields/number/_form.html.erb`
- `app/view/fields/number/_index.html.erb`
- `app/view/fields/number/_show.html.erb`

You can change all fields by generating `all`:

```bash
rails generate administrate:views:field all
```

Each partial includes remarks on in-scope variables.
Each partial's rendering code looks roughly like:

```eruby
<%= field.data %>
```

You can render your three decimal places using:

```eruby
<%= field.data.round(3) %>
```

You can drop any partial you'd like to see remain unchanged.
