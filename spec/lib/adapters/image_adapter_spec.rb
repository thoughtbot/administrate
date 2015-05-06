require "rails_helper"
require "adapters/image_adapter"

RSpec.describe ImageAdapter, type: :controller do
  describe "#render_show" do
    it "renders an image tag" do
      image = "http://placekitten.com/200/200"
      alt = "200"

      adapter = ImageAdapter.new(image, request)
      rendered = adapter.render_show

      expect(rendered).to eq "<img src=\"#{image}\" alt=\"#{alt}\" />"
    end
  end

  describe "#render_index" do
    it "renders an image tag" do
      image = "http://placekitten.com/200/200"
      alt = "200"

      adapter = ImageAdapter.new(image, request)
      rendered = adapter.render_index

      expect(rendered).to eq "<img src=\"#{image}\" alt=\"#{alt}\" />"
    end
  end

  describe "#render_form" do
    it "renders a text field" do
      image = "http://placekitten.com/200/200"
      form_object_double = double(text_field: image)

      adapter = ImageAdapter.new(image, request)
      rendered = adapter.render_form_field(form_object_double, :attribute)

      expect(rendered).to eq image
      expect(form_object_double).to have_received(:text_field).with(:attribute)
    end
  end
end
