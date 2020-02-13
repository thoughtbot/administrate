---
title: Administrate
home: true
---

[![CircleCI](https://img.shields.io/circleci/project/github/thoughtbot/administrate.svg)](https://circleci.com/gh/thoughtbot/administrate/tree/master)
[![Gem Version](https://badge.fury.io/rb/administrate.svg)](https://badge.fury.io/rb/administrate)
[![Code Climate](https://codeclimate.com/github/thoughtbot/administrate/badges/gpa.svg)](https://codeclimate.com/github/thoughtbot/administrate)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

A framework for creating flexible, powerful admin dashboards in Rails.
[Try the demo][demo].

### Warning:

Administrate is still pre-1.0,
and there may be occasional breaking changes to the API.
Check the [release notes] for important updates.

[release notes]: https://github.com/thoughtbot/administrate/releases

![administrate](https://user-images.githubusercontent.com/11917/72203824-ec10f980-3468-11ea-9ac1-51cd28ff88b7.png)

## What Is Administrate?

Administrate is a library for Rails apps
that automatically generates admin dashboards.
Administrate's admin dashboards give non-technical users clean interfaces
that allow them to create, edit, search, and delete records
for any model in the application.

Administrate solves the same problem as [Rails Admin] and [ActiveAdmin],
but aims to provide a better user experience for site admins,
and to be easier for developers to customize.

To accomplish these goals, Administrate follows a few guiding principles:

- No DSLs (domain-specific languages)
- Support the simplest use cases, and let the user override defaults with
  standard tools such as plain Rails controllers and views.
- Break up the library into core components and plugins,
  so each component stays small and easy to maintain.

[Rails Admin]: https://github.com/sferik/rails_admin
[ActiveAdmin]: http://activeadmin.info/

## Getting Started

Administrate supports Rails from 4.2, up to 5.0 and beyond. We support Ruby
2.4 and up.

Add Administrate to your Gemfile and re-bundle:

```ruby
gem "administrate"
```

The included installer will create dashboards for each model in your
app, complete with routes:

```bash
$ rails generate administrate:install
```

Restart your server, and visit http://localhost:3000/admin
to see your new dashboard in action.

For more detailed instructions or to make it work with Rails API-only applications, please go through the ['Getting Started` guide](https://administrate-prototype.herokuapp.com/getting_started).

If your apps uses Sprockets 4, you'll need to add Administrate's assets to your `manifest.js` file. To do this, add these two lines to the file:

```
//= link administrate/application.css
//= link administrate/application.js
```

Otherwise, your app will show you this error:

```
Asset `administrate/application.css` was not declared to be precompiled in production.
Declare links to your assets in `app/assets/config/manifest.js`.
```

For more information on why this is necessary, see https://www.schneems.com/2017/11/22/self-hosted-config-introducing-the-sprockets-manifestjs

## Create Additional Dashboards

In order to create additional dashboards, pass in the resource name to
the dashboard generator. A dashboard and controller will be created.

```bash
$ rails generate administrate:dashboard Foo
```

## Documentation

To customize the appearance, behavior, and contents of the dashboard,
see the guides at
[https://administrate-prototype.herokuapp.com][prototype_heroku].
These guides are available as markdown files in the `docs` subdirectory of the
git repository, too.

## Contributing

Please see [CONTRIBUTING.md](/CONTRIBUTING.md).

administrate was originally written by Grayson Wright and is now maintained by
Nick Charlton. Many improvements and bugfixes were contributed by the [open
source
community](https://github.com/thoughtbot/administrate/graphs/contributors).

## License

administrate is Copyright © 2015-2019 thoughtbot.
It is free software, and may be redistributed under the terms specified in the
[LICENSE](/LICENSE.md) file.

## About thoughtbot

![thoughtbot](https://thoughtbot.com/brand_assets/93:44.svg)

administrate is maintained and funded by thoughtbot, inc.
The names and logos for thoughtbot are trademarks of thoughtbot, inc.

We love open source software!
See [our other projects][community] or
[hire us][hire] to design, develop, and grow your product.

[demo]: https://administrate-prototype.herokuapp.com/admin
[prototype_heroku]: https://administrate-prototype.herokuapp.com
[community]: https://thoughtbot.com/community?utm_source=github
[hire]: https://thoughtbot.com?utm_source=github
