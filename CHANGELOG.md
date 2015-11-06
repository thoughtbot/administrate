# Administrate Changelog

## Key

* `[CHANGE]`: A breaking change. After an upgrade, your app may need
  modifications to keep working correctly.
* `[FEATURE]`: A non-breaking improvement to the app. Either introduces new
  functionality, or improves on an existing feature.
* `[UI]`: Non-breaking changes to the default user interface (HTML/CSS).
* `[BUGFIX]`: Fixes a bug with a non-breaking change.
* `[COMPAT]`: Compatibility improvements - changes to make Administrate more
  compatible with different dependency versions.
* `[DOC]`: Documentation changes. No changes to the library's behavior.

## Changes

### Upcoming Release

* [#142] [FEATURE] Translation: Brazilian Portuguese
* [#156] [COMPAT] Include missing `sass-rails` dependency in gemspec
* [COMPAT] Update repository structure so Bundler can pull the gem from github.
  (e.g. `gem "administrate", github: "thoughtbot/administrate"`)
* [COMPAT] Use ANSI SQL standards for case-insensitive search
* [DOC] Add Rubygems version badge to README
* [DOC] Add CircleCI badge to README
* [DOC] Add CodeClimate badge to README
* [UI] Preserve whitespace when rendering text fields
* [FEATURE] Add Spanish translation for i18n

### 0.1.0 (October 30, 2015)

* [CHANGE] Render views using local variables, not instance variables.
* [CHANGE] Rename `table` -> `collection` throughout the engine.
  * API for dashboard classes now relies on `COLLECTION_ATTRIBUTES` constant
  * Generated views now use the `_collection` partial instead of `_table`
* [FEATURE] Add a generator for copying field views to host application
* [FEATURE] Generated dashboards are more explicit,
  and more clearly define the API.
* [FEATURE] Add a generator for creating custom field types
* [FEATURE] Add generators for copying view templates into host application
* [FEATURE] Add sensible dynamic titles to the dashboard pages.
* [FEATURE] Add text field type.
* [UI] Give form and show pages more consistent label styles
* [UI] Fix checkbox styling and label alignment.
* [UI] Fix scrollbar issues on list pages.
* [BUGFIX] Fix missing `dropdown.svg` asset.
* [BUGFIX] Fix asset precompilation issue for `datetime_picker_rails` gem.
* [BUGFIX] Remove erroneous "Showing 5 of 1" messages
  from has_many relationships on the `show` page.
* [COMPAT] Use optimistic versioning for all dependencies.
* [DOC] Update README with a better description of the repo.
* [DOC] Move changelog to root of repository, improve labels, add key.
* [DOC] Add comments to all template files
  describing what variables will be available

### 0.0.12 (September 26, 2015)

* [FEATURE] Implement searching over string and email attributes
* [FEATURE] Add pagination to index views
  * Customizable by overriding `Admin::ApplicationController#records_per_page`
  * Customizable through HTTP param `per_page`
* [FEATURE] Add sorting by column
  * Clicking on the column header multiple times changes sort direction
* [FEATURE] Generate resource-specific controller subclasses.
* [FEATURE] Add a `limit` option to `Administrate::Field::HasMany`,
  with a default of 5.
  This option limits the number of items shown in the relationship table.
* [UI] Remove logo from the sidebar
* [UI] Fix alignment issue with string fields on show pages
* [BUGFIX] Fix a bug where `nil` in a string field would cause a 500 error.
* [BUGFIX] Stop supporting `has_one` fields, which crashed the `update` action

### 0.0.11 (September 16, 2015)

* [FEATURE] Add `Administrate::Field::Boolean` for displaying boolean data.
* [FEATURE] support a `class_name` option in `belongs_to` relationships.
  The class name is now detected by the dashboard generator.

### 0.0.10 (September 15, 2015)

* [FEATURE] support lookup for models that have a custom `to_param` method.
* [FEATURE] Truncate strings on index page,
  with an optional argument for truncation length
* [FEATURE] Generate a single controller to serve all resources,
  to reduce noise after running the install generator.
* [FEATURE] Add `Administrate::Field::DateTime`
  for displaying dates, times, and datetimes.
* [FEATURE] Add `Administrate::Field::Number`
  for displaying currency, integers, and floats.
  Supports options `prefix` and `decimals`.
* [FEATURE] Generate a single controller to serve all resources,
  to reduce noise after running the install generator.
* [FEATURE] Don't display redundant attributes for belongs_to relationships,
  such as `post_id` or `post_type`.
* [UI] Show whitespace in strings on `show` pages
* [BUGFIX] Squash several 500 errors caused by polymorphic relationships.

### 0.0.9 (September 3, 2015)

* [UI] Use a light background
* [UI] Improve element spacing on index page
* [UI] Improve flash message appearance
* [UI] make elements more consistent between index and show pages
* [BUGFIX] Improve development environment;
  developers can now edit Administrate-related files in their app
  without needing to restart their server afterwards.
* [BUGFIX] Stop flash from index page from persisting across requests

### 0.0.8 (August 28, 2015)

* [CHANGE] Change the `DashboardManifest` and `ModelDashboard` APIs
  to use constants instead of methods. Recognized constants are:
  * `ATTRIBUTE_TYPES`
  * `FORM_ATTRIBUTES`
  * `SHOW_PAGE_ATTRIBUTES`
  * `FORM_ATTRIBUTES`

### 0.0.7 (August 24, 2015)

* [CHANGE] use field classes for `attribute_types` instead of symbols.
  The new interface adds the `.with_options` class method,
  which allows developers to specify options that will be applied
  when the field object is initialized.
* [FEATURE] Support `has_one` relationships
* [FEATURE] Support `has_many :through` associations
  with a custom `source` option.
* [FEATURE] Support `has_many` associations
  with a custom `class_name` option.

### 0.0.6 (July 24, 2015)

* [FEATURE] Add an outline to links on their focus state
  to improve accessibility through keyboard navigation.
* [FEATURE] Limit index pages
  to displaying four columns of attributes by default,
  to reduce clutter and overflow in the first-run experience.
* [FEATURE] Limit index pages to showing 20 items by default.
  Developers can customize the action to update or remove the limit,
  or to implement pagination with the system of their choice.

### 0.0.5 (unreleased)

* [COMPAT] Administrate relies on the `&-suffix` feature of SASS,
  which was [released in 3.3.0], as well as using `&` in SassScript,
  which was [released in 3.4.0]. We've declared an explicit dependency
  on `sass ~> 3.4`.

[released in 3.3.0]: http://sass-lang.com/documentation/file.SASS_CHANGELOG.html#330_7_march_2014
[released in 3.4.0]: http://sass-lang.com/documentation/file.SASS_CHANGELOG.html#340_18_august_2014

### 0.0.4 (June 26, 2015)

* [FEATURE] Use [selectize.js](http://brianreavis.github.io/selectize.js/)
  to improve has_many form field interaction.
* [UI] remove the "Show" link from tables - it was redundant because
  clicking on the row itself took the user to the same place.

### 0.0.3 (June 16, 2015)

* [FEATURE] the `administrate:install` generator now runs
  the dashboard generator for each resource it finds.
* [COMPAT] Relax the required version of Neat down to ~> 1.1.0

### 0.0.2 (June 15, 2015)

* [BUGFIX] Re-package the gem from the correct directory to include generators.

### 0.0.1 (June 12, 2015)

**YANKED**: gem was packaged incorrectly, and generators weren't available.

* [FEATURE] First release!
