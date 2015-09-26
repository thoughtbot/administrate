require "spec_helper"
require "administrate/fields/has_one"
require "support/constant_helpers"

describe Administrate::Field::HasOne do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      field = Administrate::Field::HasOne.new(:owner, owner, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/has_one/#{page}")
    end
  end

  describe "class_name option" do
    it "determines what dashboard is used to present the association" do
      begin
        Foo = Class.new
        allow(Foo).to receive(:all).and_return([])

        association = Administrate::Field::HasOne.
          with_options(class_name: "Foo")
        field = association.new(:customers, [], :show)
        candidates = field.candidate_records

        expect(Foo).to have_received(:all)
        expect(candidates).to eq([])
      ensure
        remove_constants :Foo
      end
    end
  end
end
