require "administrate/field/base"

module Administrate
  module Field
    class ReceiptLink < Base
      def data
        "/files/receipts/#{filename}"
      end

      def filename
        "receipt-#{resource.id}.pdf"
      end
    end
  end
end
