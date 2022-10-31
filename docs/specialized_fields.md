---
title: Specialized Fields
---

Should you be rendering an unusually-shaped model attribute,
you can add an `Administrate::Field`
describing the appearance of such attributes across your dashboards.

`Administrate::Field` descriptions include a Ruby class and `ERB` display code.

As an example, a `Field` can display a user's [Gravatar] based on an email.

[Gravatars]: https://gravatar.com/

Begin by running our generator:

```bash
rails generate administrate:field gravatar
```

You should see:

- `app/fields/gravatar_field.rb`
- `app/views/fields/gravatar_field/_show.html.erb`
- `app/views/fields/gravatar_field/_index.html.erb`
- `app/views/fields/gravatar_field/_form.html.erb`

Change `app/fields/gravatar_field.rb` and add some logic:

```ruby
# app/fields/gravatar_field.rb
require 'digest/md5'

class GravatarField < Administrate::Field::Base
  def gravatar_url
    email_address = data.downcase
    hash = Digest::MD5.hexdigest(email_address)
    "http://www.gravatar.com/avatar/#{hash}"
  end
end
```

Open up the `app/views/fields/gravatar_field/_show.html.erb` partial;
you should see:

```eruby
<%= field.to_s %>
```

Make a change so your code displays our desired image:

```eruby
<%= image_tag field.gravatar_url %>
```

Your remaining `.html.erb` partials describe your field on index and form pages.

## Using your field

Open up a dashboard file,
and add your field into the `ATTRIBUTE_TYPES` hash.
In our example, perhaps like:

```ruby
class UserDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    name: Field::String,
    email: GravatarField,    # Update this email to use your new field class
    # ...
  }
end
```
