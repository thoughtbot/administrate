class FilesController < ApplicationController
  def download
    filename = params[:filename]
    match = %r{receipt-(\d+)}.match(filename)
    if match
      payment_id = match[1]
      send_data("This is the receipt for payment ##{payment_id}", filename: "#{filename}.txt")
    else
      render status: 404, layout: false, file: Rails.root.join("public/404.html")
    end
  end
end
