---
title: Customizing date, datetime, and time formats
---

Administrate uses its own default I18n formats for date, datetime, and time
fields. This lets you customize formats in the admin interface without
changing the formats used elsewhere in your application.

Add the following keys to the relevant locale file:

```yml
en:
  date:
    formats:
      administrate_date_default: "%m/%d/%Y"
  time:
    formats:
      administrate_datetime_default: "%a, %b %-d, %Y at %r"
      administrate_time_default: "%I:%M%p"
```

For example, a Japanese locale can place AM/PM before the time:

```yml
ja:
  time:
    formats:
      administrate_time_default: "%p %I:%M"
```

To use an I18n format for an individual dashboard attribute, pass its name as
a symbol to `format` with `with_options`:

```ruby
ATTRIBUTE_TYPES = {
  published_at: Field::DateTime.with_options(format: :short),
}.freeze
```

Passing a format string to `format` continues to use that string directly:

```ruby
ATTRIBUTE_TYPES = {
  published_at: Field::DateTime.with_options(format: "%Y-%m-%d"),
}.freeze
```

If an Administrate-specific format is not configured, Administrate uses Rails'
existing default format.
