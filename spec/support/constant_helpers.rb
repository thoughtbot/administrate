module ConstantHelpers
  def remove_constants(*constants)
    constants.each do |const|
      *constant_holder, constant = const.to_s.split('::')

      if constant_holder.empty?
        constant_holder = Object
      else
        constant_holder = Object.const_get(constant_holder.join('::'))
      end

      constant_holder.send(:remove_const, constant)
    end
  rescue NameError => e
    $stderr.puts "Warning from ConstantHelpers::remove_constants:\n\t#{e}"
  end
end

RSpec.configure do |config|
  config.include ConstantHelpers
end
