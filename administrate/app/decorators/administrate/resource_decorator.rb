module Administrate
  class ResourceDecorator < SimpleDelegator
    def to_s
      if __getobj__.method(:to_s).owner == Kernel
        "#{__getobj__.class.to_s.titleize} ##{__getobj__.id}"
      else
        __getobj__.to_s
      end
    end
  end
end
