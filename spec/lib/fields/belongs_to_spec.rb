require "spec_helper"
require "administrate/fields/belongs_to"
require "support/constant_helpers"

describe Administrate::Field::BelongsTo do
  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      owner = double
      field = Administrate::Field::BelongsTo.new(:owner, owner, page)

      path = field.to_partial_path

      expect(path).to eq("/fields/belongs_to/#{page}")
    end
  end

  describe "class_name option" do
    it "determines what dashboard is used to present the association" do
      begin
        Foo = Class.new
        allow(Foo).to receive(:all).and_return([])

        association = Administrate::Field::BelongsTo.
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
