---
title: Specialized Dashboards
---

Each resource can display any number of members on each page,
depending on screen size concerns.
You can change each page's displayed members
inside your `app/dashboards/record_dashboard.rb`.

You may originally see:

```ruby
require "administrate/base_dashboard"

class CustomerDashboard < Administrate::BaseDashboard
  ATTRIBUTE_TYPES = {
    id: Field::Number,
    name: Field::String,
    email: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    orders: Field::HasMany,
  }

  COLLECTION_ATTRIBUTES = [
    :id,
    :name,
    :email,
    :created_at,
    :updated_at,
    :orders,
  ]

  SHOW_PAGE_ATTRIBUTES = [
    :id,
    :name,
    :email,
    :created_at,
    :updated_at,
    :orders,
  ]

  FORM_ATTRIBUTES = [
    :name,
    :email,
    :orders,
  ]
end
```

You can change members displayed
on each `index`, `show`, and `form` page,
by adding or dropping member names as symbols in each corresponding array.

Your `ATTRIBUTE_TYPES` hash should describe
each member's shape, as dispalyed in each dashboard page.
You can choose any one of our `Field` classes, including:

- `Field::BelongsTo`
- `Field::Boolean`
- `Field::DateTime`
- `Field::Date`
- `Field::Email`
- `Field::HasMany`
- `Field::HasOne`
- `Field::Number`
- `Field::Polymorphic`
- `Field::Select`
- `Field::String`
- `Field::Text`
- `Field::Url`
- `Field::Password`

Many open-source plugins also add `Field` classes.

## Specializing Fields

### Setting Options

Each of the `Field` classes require options,
passed using a `.with_options` class method:

**Field::BelongsTo**

`:order` -
Choose a column used to order your records.
Your order applies both in a `show` page index,
and in a menu on record forms.
You can pass many columns as a phrase, including direction;
as an example, `"name, email DESC"`.

`:scope` -
Choose a scope inside a proc or lambda;
handy during preloading.
As an example: `.with_options(scope: -> { MyModel.includes(:rel).limit(5) })`

`:include_blank` -
Should your association `select` menu include a blank option? Normally `false`.

`:searchable` -
Should your association be considered during a search? Normally `false`.

`searchable_fields` -
Choose columns used in searches.
Use alongside `searchable: true`

As an example:

```ruby
  country: Field::BelongsTo.with_options(
    searchable: true,
    searchable_fields: ['name'],
  )
```

...enables searching a column called `name`,
inside your association `belongs_to :country`,
from the model your dashboard is describing.

**Field::HasMany**

`:limit` - A number of resources to display in the show view. Normally `5`.

`:sort_by` - Apply an order on your association inside `show` pages.

`:direction` - Choose an order direction; normally `:asc` or `:desc`.

**Field::HasOne**

`:searchable` -
Should your association be considered during searches? Normally `false`.

`searchable_fields` -
Choose columns used in searches, use alongside `searchable: true`.

As an example:

```ruby
  cities: Field::HasMany.with_options(
    searchable: true,
    searchable_fields: ['name'],
  )
```

...enables searching a column called `name`,
inside your association `has_many :cities`,
from the model your dashboard is describing.

**Field::Number**

`:searchable` -
Should your member be considered during searches?
Number fields are searched in a similar manner as phrases,
so you may see many poor responses. Normally `false`.

`:decimals` - Choose a number of decimals used in displays. Normally `0`.

`:prefix` - Prepend a phrase on your number. Normally `""`.

`:suffix` - Append a phrase on your number. Normally `""`.

`:format` - (deprecated; pass a proc in your `render` option.)
  Pass a hash describing an ActiveSupport formatter.
  See examples.

As an example, you might use the following to display U.S. currency:

```ruby
  unit_price: Field::Number.with_options(
    prefix: "$",
    decimals: 2,
  )

  # "$5.99"
```

Or, to display a distance in kilometers, using a space as the delimiter:
(deprecated)

```ruby
  distance: Field::Number.with_options(
    suffix: " km",
    decimals: 2,
    format: {
      formatter: :number_to_delimited,
      formatter_options: {
        delimiter: ' ',
      },
    },
  )

  # "2 000.00 km"
```

**Field::Polymorphic**

`:classes` -
Choose classes used in corresponding `<select/>` menus. Normally `[]`.

`:order` -
Order your association inside `<select/>` menus. Normally `nil`.

**Field::DateTime**

`:format` -
Pass a phrase recognized by `strftime`, used in rendering your member.

`:timezone` -
Choose a timezone your `Date` and `DateTime` members are based in.

**Field::Date**

`:format` -
Pass a phrase recognized by `strftime`, used in rendering your member.

**Field::Select**

`:collection` -
Choose options rendered in `<select/>` menus.
Pass an array or a proc/lambda. Normally `[]`.

Pass option labels as an array of pairs; `[[ form_value, label ], ...]`.

As an example:

```ruby
  currency = Field::Select.with_options(
    collection: [ ['usd', 'Dollar'], ['eur', 'Euro'], ['yen', 'Yen'] ]
  )
```

`:searchable` -
Should your member be considered during searches? Normally `true`.

`:include_blank` -
Should your `select` menu include a blank option? Normally `false`.

**Field::String**

`:searchable` -
Should your member be considered during searches? Normally `true`.

`:truncate` -
Choose size of phrase displayed on `index` page. Normally `50`.

**Field::Text**

`:searchable` -
Should your member be considered during searches? Normally `false`.

`:truncate` -
Choose size of phrase displayed on `index` page. Normally `50`.

**Field::Url**

`:searchable` -
Should your member be considered during searches? Normally `true`.

`:truncate` -
Choose size of phrase displayed on `index` page. Normally `50`.

`:html_options` -
Choose anchor options; as an example, `{ target: "_blank" }`. Normally `{}`.

**Field::Password**

`:searchable` -
Should your member be considered during searches? Normally `false`.

`:truncate` -
Choose size of phrase displayed on `index` page. Normally `50`.

`:character` -
Replace using some masking symbol. Normally `•`.

### Defining Labels

Change displayed labels on a member, using I18n:

```yaml
en:
  helpers:
    label:
      customer:
        name: Full Name
```


You can change labels used in displaying a resource on dashboard pages.
Assuming a users dashboard displaying "User #1",
replace such labels using your user's recorded name.

Add `display_resource` in your users dashboard.

```ruby
def display_resource(user)
  user.name
end
```

I18n can help change your dashboard's sidebar menu labels,
sub-header and search phrase.

```yaml
# config/locales/en.yml
en:
  activerecord:
    models:
      customer:
        one: Happy Customer
        other: Happy Customers
```

## Collection scopes

Resources can be screened using scopes.

(Deprecated; use `SEARCH_SCOPES`)
```ruby
COLLECTION_FILTERS = {
  inactive: ->(resources) { resources.where("login_at < ?", 1.week.ago) }
}
```

Your dashboard search should recognize:

```ruby
bob inactive:
```

...and display any users named "bob" unseen for a week.

You can manually pass a scope described on your model's class, such as:

```ruby
COLLECTION_FILTERS = {
  inactive: ->(resources) { resources.inactive }
}
```

Your search scopes can include a `call` passed in during search:

```ruby
COLLECTION_FILTERS = {
  age: ->(resources, call) { resources.where('age > ?', call.to_i) }
}
```

...so you can search your resource using 'age:21'.

## Form Attributes

Need a special field on `create`, unnecessary on `update`?

```ruby
FORM_ATTRIBUTES_NEW = [ :name, :email, :orders ]
FORM_ATTRIBUTES_EDIT = [ :orders ]
```

Using a similar approach, any action name can be handled using:
`"FORM_ATTRIBUTES_#{action.upcase}"`
