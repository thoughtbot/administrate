require "administrate/field/image"

describe Administrate::Field::Image do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Image.new(:image, "/a.jpg", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/image/#{page}")
    end
  end
end
