module ConstantHelpers
  def remove_constants(*constants)
    constants.each { |const| Object.send(:remove_const, const) }
  rescue NameError => e
    $stderr.puts "Warning from ConstantHelpers::remove_constants:\n\t#{e}"
  end
end

RSpec.configure do |config|
  config.include ConstantHelpers
end
