require "administrate/field/base"

module Administrate
  module Field
    class ReceiptLink < Base
      def data
        "/files/receipts/#{filename}"
      end

      def filename
        "receipt-#{resource.id}.txt"
      end
    end
  end
end
