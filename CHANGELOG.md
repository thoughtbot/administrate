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
* `[I18n]`: Internationalization. Changes to translations or localizations.
* `[OPTIM]`: Optimization or performance increase.
* `[DOC]`: Documentation changes. No changes to the library's behavior.

## Changes

### 0.10.0 (April 20, 2018)

* [BUGFIX] [#1121] Fix a bug where polymorphic fields could throw an exception.
* [BUGFIX] [#1129] Include time for date_time field in index.
* [i18n] [#1132] Add missing Russian locale error message.
* [DOC] [#1131] Document that numbers are searchable.
* [DOC] [#1145] Add `.byebug_history` and `gemfiles/.bundle/` to .gitignore.
* [COMPAT] [#1148] Support Rails 5.2.
* [DOC] [#1119] Add link to Authorization documentation.
* [BUGFIX] [#1107] Exclude routes with modules, but no namespace.
* [i18n] [#1117] Add translation for Albanian language.
* [i18n] [#1115] Translate error message to Japanese.
* [DOC] [#1106] Update Customizing Views docs with sidebar generator.
* [FEATURE] [#1005] Add ability to search through association fields.
* [FEATURE] [#1059] Use associated_class to render belongs_to links.
* [FEATURE] [#961] Show errors when has_many restrict_with_error.
* [FEATURE] [#1104] Add `scope` option to Field::BelongsTo.
* [BUGFIX] [#1070] Use application timezone by default for DateTime fields.
* [FEATURE] [#998] Add a password field type.
* [FEATURE] [#903] Added Time Field.
* [COMPAT] [#1103] Use cross-DB way to cast search queries to strings.

### 0.9.0 (February 17, 2018)

* [COMPAT] [#1098] Update all the dependent gems.
* [COMPAT] [#1099] Update shoulda-matchers from 2.8.0 to 3.1.2.
* [DOC] [#1081] Update Field::Polymorphic doc to include order option.
* [COMPAT] [#1095] Upgrade nokogiri to 1.8.2.
* [i18n] [#1094] Translate form error keys in French.
* [COMPAT] [#1079] Cast all search queries to text.
* [COMPAT] [#1077] Switch out squiggly-heredoc for Ruby 2.2 support.
* [COMPAT] [#1077] Add Ruby 2.2.9 to Circle and clarify support.
* [BUGFIX] [#1076] [#1078] Fix issues with flaky tests due to ordering
* [COMPAT] [#1075] Upgrade Circle CI Postgres to 10.1.
* [COMPAT] [#1032] Add additional Rubies to CI using Workflows.
* [COMPAT] [#1074] Upgrade to Ruby 2.5.0.
* [BUGFIX] [#1046] Fix wrong variable name in new_resource key.
* [i18n] [#1055] Singularize field name in HasMany index partial.
* [BUGFIX] [#1068] Only define Punditize if Pundit has been loaded.
* [COMPAT] [#1067] Include pundit in the Gemfiles.
* [i18n] [#1056] Don't pluralise "New [resource]" buttons.
* [i18n] [#1057] Translate form error keys in Catalan.
* [i18n] [#1054] Add missing keys to Catalan.
* [DOC] [#1040] Add a note about adding to Dashboards.
* [BUGFIX] [#1028] Fix of class_name option on has_one fields.
* [DOC] [#1052] Fix Typo in Changelog.
* [FEATURE] [#999] Order attributes by association if it exists.
* [DOC] [#1039] Merge both Field::BelongsTo options_with sections.
* [i18n] [#1041] Improve German translation of form.errors.
* [i18n] [#1004] Add form I18n keys to non-default locales.
* [i18n] [#1004] Add show-/new-/edit- _resource I18n keys non-default locales.
* [i18n] [#1004] Add and improve I18n for application templates.
* [FEATURE] [#971] Add authorization features and a Pundit mixin.
* [DOC] [#1031] Switch to Circle 2.0.
* [FEATURE] [#1009] Option for Date(Time) objects be **in a timezone**.
* [COMPAT] [#1027] Add hardcoded development secret_key_base.
* [FEATURE] [#1020] Add support for editing polymorphic fields.
* [FEATURE] [#956] Add namespace option to generators.
* [DOC] [#1018] Remove suggestion than rerunning install works.
* [COMPAT] [#1016] FactoryGirl is now FactoryBot.
* [FEATURE] [#992] Improve field generators.
* [DOC] [#1008] Adding instructions for getting started with API-only apps.
* [i18n] [#988] Adds Catalan locales.
* [FEATURE] [#1000] Add test coverage to ApplicationHelper#sort_order.
* [UI] [#987] Fix cell sort indicator positioning.
* [i18n] [#981] Add localization for Bosnian language.
* [BUGFIX] [#982] Update name of specification example.
* [DOC] [#980] Update copyright range.
* [DOC] [#976] Explain that installer requires models.
* [COMPAT] [#977] Update gems for CVE-2017-9050.
* [BUGFIX] [#967] Change const_get to constantize to fix undefined method.
* [DOC] [#972] Fix interpolation highlighting at documentation examples.
* [FEATURE] [#807] Add foreign key option to Fields.
* [FEATURE] [#939] Add order option for belongs_to field.
* [DOC] [#946] Document renaming dashboards.
* [DOC] [#942] Add IntelliJ-generated files to .gitignore.
* [DOC] [#940] Add instructions of how to disable some actions.
* [UI] [#933] Switch to thoughtbot hosted seed images.
* [FEATURE] [#934] Support for models with uncountable inflections.

### 0.8.1 (July 14, 2017)

* [BUGFIX] [#935] Move normalize.css out of vendor.

### 0.8.0 (July 14, 2017)

* [FEATURE] [#788] Allow resource to be accessed from field.
* [OPTIM] [#859] Remove dependency on remote images in tests.
* [BUGFIX] [#771] Handle case where `Field::HasMany` data is nil.
* [FEATURE] [#801] Add HasOne support as nested form.
* [FEATURE] [#926] Accepts string instead of symbol on order.
* [DOC] [#928] Fix partial name in view customization docs.
* [BUGFIX] [#927] Remove rails-controller-testing gem to fix specs with Rails
  4.2.
* [BUGFIX] [#925] Silence ActiveRecord migration output during specs.
* [CHANGE} [#924] Replace dashboard_class method with a delegate.
* [BUGFIX] [#594] Fix Label Translation Lookup for has_many Collections.
* [CHANGE] [#914] Allow custom scope for dashboards.
* [CHANGE] [#916] Adds `_stylesheet` to the resources to be generated.
* [UI] [#554] Make it easier to override Sass variables.
* [FEATURE] [#910] Allow custom scope for dashboard resource.
* [FEATURE] [#871] Add support for namespaced models.
* [I18n] [#904] Improve Korean translation for search input.
* [UI] [#881] Redesign search.
* [I18n] [#902] Fixes to Dutch translation.
* [COMPAT] [#887] Update autoprefixer-rails >= 6.0.
* [UI] [#896] Make entire search bar clickable.
* [I18n] [#891] Add translation for search input.
* [UI] [#886] Fix `aria-labelledby` on tables.
* [UI] [#884] Add `aria-sort` attribute to table headers.
* [UI] [#882] Update normalize.css and change how we include it.
* [OPTIM] [#898] Retroactively set migration versions.
* [FEATURE] [#856] Allow Rails 5.1 usage.
* [DOC] [#885] Update and test documentation navigation.
* [UI] [#880] Use SVG `symbol` for icon system.
* [CHANGE] [#883] Nested collection links should honour routes.
* [UI] [#879] Remove unused SVG asset.
* [DOCS] [#877] Add appraisal and foreman commands to docs.
* [I18n] [#873] Add support for cyrillic search.
* [CHANGE] [#857] Abstract model classes should be skipped without warning.

### 0.7.0 (May 08, 2017)

* [CHANGE] [#789] Remove Bourbon.
* [CHANGE] [#789] Remove Neat.
* [UI] [#874] Clean up base form styles.
* [BUGFIX] [#872] Fix flaky failure by resetting column information.
* [BUGFIX] [#872] Properly reset routes after each test.
* [BUGFIX] [#872] Fix delayed_job failures.
* [BUGFIX] [#872] Migrate DB in CI.
* [UI] [#868] Add ARIA landmark roles.
* [UI] [#868] Use a hyphen separator in page titles.
* [UI] [#868] Add link underlines.
* [UI] [#389] Applies a margin-bottom to attribute labels.
* [UI] [#867] Refine look-and-feel.
* [DOC] [#870] Document front-end architecture.
* [DOC] [#869] Update SCSS-Lint configuration.
* [UI] [#861] Tweak primary navigation.
* [UI] [#863] Redesign focus outline styles.
* [i18n] [#570] Localise Dates.
* [UI] [#515] Wrap unsupported form field notes in proper divs.
* [DOC] [#568] Update customizing_dashboards.md.
* [UI] [#482] Wrap table cell contents instead of CSS truncation.
* [CHANGE] [#854] Remove worker from Procfile.
* [CHANGE] [#851] Remove dependency from ActionMailer.

### 0.6.0 (May 02, 2017)

* [CHANGE] [#845] Remove delayed_job_active_record dependency.
* [CHANGE] [#817] Improve performance for n+1s.
* [DOC] [#844] Remove the word "simply".
* [CHANGE] [#791] Remove unneeded Rails dependencies.
* [CHANGE] [#810] Add `sort_by` and `direction` option for HasMany field.
* [CHANGE] [#842] Add support for big decimals in formatting numbers.
* [CHANGE] [#793] Update Ruby to 2.4.1 and use .ruby-version on CircleCI.
* [CHANGE] [#820] Remove markdown-rails and high_voltage.
* [CHANGE] [#824] Install the latest bundler version on CI.
* [CHANGE] [#824] Remove the web-console gem.
* [CHANGE] [#823] Do not redirect to show page when selecting text.
* [CHANGE] [#830] Add table name to search query.
* [CHANGE] [#841] When the number data is a float, default to the decimal amount.
* [CHANGE] [#698] Place Resource in the right namespace.
* [CHANGE] [#698] Change sidebar partial to work w/namespaced models.
* [BUGFIX] [#698] Fix inferred path issue w/name-spaced resources.
* [CHANGE] [#822] Upgrade webmock to make compatible with Ruby 2.4.
* [i18n] [#838] Improve translations for pl/uk.
* [DOC] [#839] Add instructions on how to add dashboards
* [DOC] [#837] Make path to documentation more noticeable
* [i18n] [#826] Fixes some broken ja translations.
* [DOC] [#821] Document how to use with Rails API.
* [CHANGE] [#818] Update administrate-field-image to 1.1.0.
* [DOC] [#815] Remove the last .keep.
* [BUGFIX] [#814] Use an array of includes instead of a regex for Sass.
* [BUGFIX] [#813] Wrap class_name arguments in strings.
* [DOC] [#812] Remove some .keeps.
* [UI] [#797] Stop using Sass glob importing.
* [Docs] [#809] Add missing `suffix` docs for number field.
* [i18n] [#803] Fix some broken zh-TW translations.

### 0.5.0 (Mar 27, 2017)

* [i18n] [#786] Backfill the missing translations (some from Google Translate).
* [CHANGE] [#795] Loosen and update jquery-rails.
* [CHANGE] [#792] Content with .preserve-whitespace should wrap.
* [BUGFIX] [#611] Javascript: Fix row-click handler.
* [CHANGE] [#569] Loosen normalize-rails required version.
* [DOC] [#532] Add a short section about how to report vulnerabilities.
* [CHANGE] [#784] Drop refills as a dependency.
* [CHANGE] [#784] Change bourbon to be at least beta.6.
* [FEATURE] [#505] let routes generator indent all routes.
* [FEATURE] [#746] Add suffix/postfix option to number field.
* [DOC] [#508] Add example of how to use a custom field.
* [i18n] [#602] Adding Portuguese locale.
* [i18n] [#603] Update administrate.pt-BR.yml.
* [CHANGE] [#634] Add and set PLURAL_MANY_COUNT to 2.1.
* [DOC] [#684] Add instructions on how to add dashboards.
* [FEATURE] [#780] Add Sentry for the prototype app.
* [i18n] [#772] Merge the existing translations before testing.
* [DOC] [#783] Change README to use `0.4.0`.
* [DOC] [#778] Clarify the version requirements.
* [DOC] [#779] Update .rubocop.yml to follow thoughtbot/guides.
* [DOC] [#781] Update readme screenshot.
* [BUGFIX] [#559] Fix #558 : Wrong constant name guess.
* [DOC] [#769] Mention guides in doc/ subdirectory.
* [DOC] [#469] Path to custom attribute type updated in docs.
* [CHANGE] [#774] Update Kaminari `~> 0.16` -> `>= 1.0`.
* [DOC] [#776] Include docs in gem (via gemspec file listing).
* [DOC] [#540] example on how to use custom file types.
* [CHANGE] [#767] Add auto-prefixer.
* [i18n] [#344] Add missing translations on edit/new/show actions.
* [i18n] [#344] Add some action translations to administrate.en.
* [i18n] [#344] Add some action translations to administrate.pt-BR.
* [DOC] [#457] Document how to change resource labels in collections.
* [FEATURE] [#466] Allow preloading has_many records.
* [i18n] [#764] Add Korean i18n.
* [FEATURE] [#597] Allow to limit route actions.
* [BUGFIX] [#687] Fix broken sort arrow svg in the resource table.
* [DOC] [#627] add doc for customizing admin dashboard layouts.
* [BUGFIX] [#642] Add missing multiplier option for number fields.
* [BUGFIX] [#465] Inline controller's `permitted_attributes` method.
* [FEATURE] [#760] Add refills and refill-styled flashes.
* [FEATURE] [#736] Paginate has_many show view.
* [CHANGE] [#759] Update instances of bourbon to 5.0.0.beta.7; sass to ~>3.4.

### 0.4.0 (Mar 03, 2017)

* [DOC] Use Kaminari syntax in controller's comment hint.
* [#747] [CHANGE] Fix a bug where `administrate:views` was creating the wrong
  paths.
* [#739] [#743] [BUGFIX] Dependent destroy demo app models.
* [CHANGE] Remove boilerplate references to staging/production.
* [CHANGE] Improve the `bin/` commands.
* [#733] [CHANGE] Switch `administrate-field-image` to use the new release.
* [#704] [I18n] Fix a typo on pt-BR translation for polymorphic.
* [#730] [FEATURE] Hide the Search Bar when no attributes are searchable.
* [#732] [I18n] Improve Japanese locales.
* [#729] [FEATURE] Allow `primary_key` option on relationships instead of
  hardcoding `id`.
* [#728] [DOCS] Improve the docs around authentication.
* [#727] [FEATURE] Add a link to show resource from the collection table.
* [#726] [BUGFIX] Check for PhantomJS in the setup script.
* [#721] [CHANGE] Use `count(:all)` for associations in HasMany fields.
* [#683] [CHANGE] Add Bourbon as an explicit dependency.
* [#713] [CHANGE] Avoid writing to `routes.rb` when no models exist.
* [#704] [I18n] Fix word on pt-BR translation

### 0.3.0 (Oct 28, 2016)

* [#127] [UI] Add button to clear the search
* [#656] [COMPAT] Add Rails 5 support

### 0.2.2 (May 21, 2016)

* [#560] [BUGFIX] Fix LoadError for apps that don't use images

### 0.2.1 (May 18, 2016)

* [#573] [FEATURE] Render custom javascripts and stylesheets to the page
  by registering them with Administrate in an initializer.
  For example, you can create `config/initializers/administrate.rb`
  with the contents:
    ```
    Administrate::Engine.add_javascript "my_plugin/script"
    Administrate::Engine.add_stylesheet "my_plugin/styles"
    ```
* [#567] [FEATURE] Add a partial for rendering HTML links to stylesheets.
  This is useful for plugin developers,
  as well as people who want to add custom stylesheets on a page-by-page basis
  using `content_for(:stylesheet)`.
* [#492] [FEATURE] Translate attribute labels on show and index pages.
  To customize an attribute label, add translations according to the structure:
    ```
    en:
      helpers:
        label:
          customer:
            name: Full Name
    ```

### 0.2.0 (April 20, 2016)

* [#476] [CHANGE] Extract `Administrate::Field::Image` into its own gem.
  Users who have image fields in their dashboards
  should add to their `Gemfile`:
  ```ruby
  gem "administrate-field-image"
  ```

### 0.1.5 (April 1, 2016)

* [master] [BUGFIX] Protect from CSRF attacks [CVE-2016-3098]
* [#422] [FEATURE] Add a `Select` field for displaying a drop-down menu of
  options on form pages.
  Options:
  ```ruby
  Field::Select.with_options(collection: [:foo, :bar])
  ```
* [#458] [BUGFIX] Update the custom field generator to match the new HTML
  structure of forms
* [#513] [OPTIM] Freeze constants in generated dashboard classes

### 0.1.4 (February 20, 2016)

* [#464] [CHANGE] Replace the DashboardManifest with explicit Rails routes.
  * Run `rails generate administrate:routes` to generate the default routes.
* [#467] [CHANGE] Update the internal field path to fit Ruby conventions
  ```ruby
  # Change any instances of this...
  require "administrate/fields/base"
  # ...to this:
  require "administrate/field/base"
  ```

### 0.1.3 (January 22, 2016)

* [#269] [FEATURE] Add a generator for copying default layout files
* [#328] [FEATURE] Add a generator for copying default sidebar partial
* [#362] [FEATURE] Add a generator for only the dashboard manifest.
  Customizing this manifest before running the `administrate:install` generator
  will change which dashboards get generated.
* [#295] [FEATURE] Add dashboard detection for ActiveRecord::Enum fields.
* [#364] [FEATURE] Improve dashboard generator by explicitly listing out the
  generated `SHOW_PAGE_ATTRIBUTES` array elements.
* [#416] [UI] Add an accessibility label to the search input
* [#411] [UI] Use tabular figures in table cells
* [#409] [UI] Use default system fonts
* [#424] [BUGFIX] Fix a bug where running `rails destroy GENERATOR_NAME`
  would not work for several of the generators
* [#390] [BUGFIX] Fix timestamp deprecation warnings
* [#365] [COMPAT] Remove dependency on `inline_svg`
* [#396] [I18n] Ukrainian
* [#297] [I18n] Italian
* [#307] [I18n] Fix German grammatical errors
* [#363] [DOC] Move documentation into main repository, at the root URL
* [#395] [DOC] Update inline documentation for collection partial
* [#387] [DOC] Fix incorrect path for generators in the docs

### 0.1.2 (December 09, 2015)

* [#251] [FEATURE] Raise a helpful error when an attribute is missing from
  `ATTRIBUTE_TYPES`
* [#298] [FEATURE] Support ActiveRecord model I18n translations
* [#312] [FEATURE] Add a `nil` option to `belongs_to` form fields
* [#282] [FEATURE] Running the install generator multiple times
  no longer generates duplicate routes
* [#231] [UI] Fix layout issue on show page where a long label next to an empty
  value would cause following fields on the page to be mis-aligned.
* [#309] [UI] Fix layout issue in datetime pickers where months and years
  would not wrap correctly.
* [#306] [UI] Wrap long text lines (on word breaks) on show pages
* [#214] [UI] Improve header layout when there is a long page title
* [#198] [UI] Improve spacing around bottom link in sidebar
* [#206] [UI] Left-align checkboxes in boolean form fields
* [#315] [UI] Remove the `IDS` suffix for `HasMany` form field labels
* [#259] [BUGFIX] Make installation generator more robust
  by ignoring dynamically generated, unnamed models
* [#243] [BUGFIX] Fix up a "Show" button on the edit page that was not using the
  `display_resource` method.
* [#248] [BUGFIX] Improve polymorphic relationship's dashboard class detection.
* [#247] [BUGFIX] Populate `has_many` and `belongs_to` select boxes
  with the current value of the relationship.
* [#217] [I18n] Dutch
* [#263] [I18n] Swedish
* [#272] [I18n] Danish
* [#270] [I18n] Don't apologize about missing relationship support.
* [#237] [I18n] Fix broken paths for several I18n files (de, es, fr, pt-BR, vi).
* [#266] [OPTIM] Save a few database queries by using cached counts

### 0.1.1 (November 12, 2015)

* [#191] [CHANGE] Improve API for specifying how resources are displayed
  across the dashboard.
  * Models are now displayed with a sensible default - (e.g. "User #2")
  * Users can define `ModelDashboard#display_resource(resource)` for custom
    display behavior
  * Users who have generated views for the following field types
    may need to update them to take advantage of the new API:
    * HasOne
    * HasMany
    * Polymorphic
    * BelongsTo
* [#126] [UI] Preserve whitespace when rendering text fields
* [#194] [BUGFIX] Don't clear out datetime values in form fields
* [#193] [BUGFIX] Don't assume that unrecognized db column types are searchable
* [#124] [BUGFIX] Better detection of application models
* [#156] [COMPAT] Include missing `sass-rails` dependency in gemspec
* [#174] [COMPAT] Make several missing dependencies explicit.
* [#144] [COMPAT] Update repository structure so Bundler can pull the gem from github.
  (e.g. `gem "administrate", github: "thoughtbot/administrate"`)
* [#166] [COMPAT] Use ANSI SQL standards for case-insensitive search
* [#223] [I18n] Vietnamese
* [#161] [I18n] Mandarin Chinese
* [#196] [I18n] Taiwanese Mandarin
* [#142] [I18n] Brazilian Portuguese
* [#171] [I18n] Polish
* [#153] [I18n] Russian
* [#148] [I18n] French
* [#147] [I18n] German
* [#154] [I18n] Spanish
* [#120] [DOC] Add Rubygems version badge to README
* [#165] [DOC] Add CircleCI badge to README
* [#119] [DOC] Add CodeClimate badge to README

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
