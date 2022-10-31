# Administrate

[![CircleCI](https://img.shields.io/circleci/project/github/thoughtbot/administrate.svg)](https://circleci.com/gh/thoughtbot/administrate/tree/main)
[![Gem Version](https://badge.fury.io/rb/administrate.svg)](https://badge.fury.io/rb/administrate)
[![Code Climate](https://codeclimate.com/github/thoughtbot/administrate/badges/gpa.svg)](https://codeclimate.com/github/thoughtbot/administrate)
[![Reviewed by Hound](https://img.shields.io/badge/Reviewed_by-Hound-8E64B0.svg)](https://houndci.com)

Our engine helps you manage records in your Rails program.
[See a copy running online][online].

[online]: https://administrate-demo.herokuapp.com/admin

### Danger: breaking changes are common.

Administrate remains pre-1.0,
and breaking changes can occur as our designs respond
based on our user's needs.

Please pin on a "minor version" number,
should you need a more reliable application build.
Make sure you see remarks included in our [release log],
prior upgrading your dependency.

[release log]: https://github.com/thoughtbot/administrate/releases

![administrate](https://user-images.githubusercontent.com/11917/72203824-ec10f980-3468-11ea-9ac1-51cd28ff88b7.png)

## Administrate's Purpose

Administrate is a Rails-based engine,
made so coders can spend less energy modeling necessary
super-user dashboards across a broad range
of program shapes and sizes.

No special experience is needed by our dashboard's users,
and no special languages are required of our dashboard's coders.

Basic operations include adding, dropping, changing, searching records,
and permissions are managed in a simple class-based modeling layer.

Administrate had been preceded by [Rails Admin] and [ActiveAdmin],
and has been inspired in many areas by such approaches.
Administrate yearns for a more simple, common-ground approach
in describing and accomplishing common program use cases.

## Administrate's guiding principles

- No DSLs (domain-specific languages)

- Enable simple and common use cases,
  and encourage use case expansion
  based on usual Rails programming paradigms.

- Compose our engine based on small core classes,
  and encourage a plugin-based ecology made by our users.

[Rails Admin]: https://github.com/sferik/rails_admin
[ActiveAdmin]: http://activeadmin.info/

## Guides

To customize the appearance, behavior, and contents of the dashboard,
we publish a set [of guides for the current release][guides].

These guides are available as markdown files in the `docs` subdirectory of the
git repository, too.

Bleeding-edge changes are described in
our [prerelease guides].

[guides]: https://administrate-demo.herokuapp.com
[prerelease guides]: https://administrate-demo-prerelease.herokuapp.com

## Making changes

Please see [CONTRIBUTING.md](/CONTRIBUTING.md).

Grace Youngblood originally published Administrate in 2015,
and our code has since been guided by Nick Charlton and Pablo Brasero.
Many use cases are added, changed, and enhanced
by [open-source coders](https://github.com/thoughtbot/administrate/graphs/contributors).

## License

Administrate is Copyright © 2015-2019 thoughtbot.

Our code base comprises public open-source code,
and may be reshared based on conditions in our [LICENSE](/LICENSE.md).

## Born during Friday hours, in thoughtbot San Francisco.

![thoughtbot](https://thoughtbot.com/brand_assets/93:44.svg)

Administrate is managed and produced by thoughtbot, inc.
thoughtbot's names and logos are trademarks of thoughtbot, inc.

See [our published code][bases] or [hire us][hire]
to design, encode, and publish your programs.

[bases]: https://thoughtbot.com/community?utm_source=github
[hire]: https://thoughtbot.com?utm_source=github
