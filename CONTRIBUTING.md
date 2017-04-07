# Contributing

We love pull requests from everyone.
By participating in this project,
you agree to abide by the thoughtbot [code of conduct].

We expect everyone to follow the code of conduct
anywhere in thoughtbot's project codebases,
issue trackers, chatrooms, and mailing lists.

1. Fork the repo.

2. Run `./bin/setup`.

3. Run the tests. We only take pull requests with passing tests, and it's great
   to know that you have a clean slate:
   `bundle exec rake && bundle exec appraisal rake`

4. Add a test for your change. Only refactoring and documentation changes
   require no new tests. If you are adding functionality or fixing a bug,
   we need a test!

5. Make the test pass.

6. Write a [good commit message][commit].

7. Push to your fork and submit a pull request.

Others will give constructive feedback.
This is a time for discussion and improvements,
and making the necessary changes will be required before we can
merge the contribution.

## Performance Improvements

Improving our users' experience should be the primary goal of any optimization.

If you contribute a performance improvement,
you must submit performance profiles
that show that your optimizations
make a significant impact
on Administrate's request times.

Request-level profiles are our best measure
of how users experience our app.
Many other performance measurements,
such as benchmarks,
can give inaccurate impressions
of an optimization's overall impact.

Tools like [Rack MiniProfiler] are helpful
for generating request-level performance profiles.

## Security

For security inquiries or vulnerability reports, please email
<security@thoughtbot.com>.
If you'd like, you can use our [PGP key] when reporting vulnerabilities.

[code of conduct]: https://thoughtbot.com/open-source-code-of-conduct
[commit]: http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html
[Rack MiniProfiler]: https://github.com/MiniProfiler/rack-mini-profiler
[PGP key]: https://thoughtbot.com/thoughtbot.asc

