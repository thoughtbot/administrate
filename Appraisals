appraise "sass-3-4" do
  gem "sass", "3.4.0"

  # using rails 4 as a base for this appraisal
  gem "rails", "~> 4.2"
  gem "rspec-rails", "~> 3.4.2"
end

appraise "bourbon-5" do
  gem "bourbon", "5.0.0.alpha.0"

  # using rails 4 as a base for this appraisal
  gem "rails", "~> 4.2"
  gem "rspec-rails", "~> 3.4.2"
end

appraise "rails-4" do
  gem "rails", "~> 4.2"
  gem "rspec-rails", "~> 3.4.2"
end

appraise "rails-5" do
  gem "rails", "5.0.0.rc1", "< 5.1"
  gem "rspec-rails", "~> 3.5.0.beta1"
  gem "kaminari", github: "amatsuda/kaminari", branch: "0-17-stable"

  # this fork has rails at >= 4.2, allowing rails5 to work.
  gem "administrate-field-image", github: "pedrocarmona/administrate-field-image"

  # rails 5+ extracts this gem, which is need for shoulda-matchers:
  gem "rails-controller-testing"
end
