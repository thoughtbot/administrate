module ConstantHelpers
  def remove_constants(*constants)
    constants.each { |const| Object.send(:remove_const, const) }
  end
end

RSpec.configure do |config|
  config.include ConstantHelpers
end
