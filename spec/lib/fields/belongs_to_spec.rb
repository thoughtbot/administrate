require "administrate/field/belongs_to"
require "support/constant_helpers"
require "support/field_matchers"

describe Administrate::Field::BelongsTo do
  include FieldMatchers

  it { should_permit_param(:foo_id, for_attribute: :foo) }

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
        candidates = field.associated_resource_options

        expect(Foo).to have_received(:all)
        expect(candidates).to eq([nil])
      ensure
        remove_constants :Foo
      end
    end
  end
end
