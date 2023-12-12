RSpec::Matchers.define :to_sql do |sql|
  match do |actual|
    actual.to_sql == sql
  end
end
