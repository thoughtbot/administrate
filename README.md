# Administrate

[![CircleCI](https://img.shields.io/circleci/project/github/thoughtbot/administrate.svg)](https://circleci.com/gh/thoughtbot/administrate/tree/main)
[![Gem Version](https://badge.fury.io/rb/administrate.svg)](https://badge.fury.io/rb/administrate)

A framework for creating flexible, powerful admin dashboards in Rails.
[Try the demo][demo].

[demo]: https://administrate-demo.herokuapp.com/admin

[release notes]: https://github.com/thoughtbot/administrate/releases

![administrate](https://user-images.githubusercontent.com/11917/72203824-ec10f980-3468-11ea-9ac1-51cd28ff88b7.png)

## What's Administrate?

Administrate is a library for Rails that generates admin dashboards. These give
users clean interfaces that allow them to create, edit, search, and delete
records for any model in the application. Administrate aims to provide the best
user experience, and doing as much work as possible for you, whilst also being
flexible to customise.

To accomplish these goals, Administrate follows a few guiding principles:

* Stay as close to standard Rails as possible, keeping the
  Administrate-specific code as small as practical,
* Support the simplest use cases, and let the user override defaults with
  standard tools such as plain Rails controllers and views,
* Break up the library into core components and plugins, so each component
  stays small and pleasant to maintain.

## Documentation

To customize the appearance, behavior, and contents of the dashboard,
we publish a set [of guides for the current release][released_docs].

These guides are available as markdown files in the `docs` subdirectory of the
git repository, too.

We publish [docs for the upcoming release, which you can find at our prerelease
app][prerelease_docs].

[released_docs]: https://administrate-demo.herokuapp.com
[prerelease_docs]: https://administrate-demo-prerelease.herokuapp.com

## Contributing

Please see [CONTRIBUTING.md](/CONTRIBUTING.md).

Administrate was originally written by Grace Youngblood and is now maintained by
Nick Charlton. Many improvements and bugfixes were contributed by the [open
source
community](https://github.com/thoughtbot/administrate/graphs/contributors).

## License

administrate is Copyright © 2015 thoughtbot.
It is free software, and may be redistributed under the terms specified in the
[LICENSE](/LICENSE.md) file.

<!-- START /templates/footer.md -->
## About thoughtbot

![thoughtbot](https://thoughtbot.com/thoughtbot-logo-for-readmes.svg)

This repo is maintained and funded by thoughtbot, inc.
The names and logos for thoughtbot are trademarks of thoughtbot, inc.

We love open source software!
See [our other projects][community].
We are [available for hire][hire].

[community]: https://thoughtbot.com/community?utm_source=github
[hire]: https://thoughtbot.com/hire-us?utm_source=github

<!-- END /templates/footer.md -->
