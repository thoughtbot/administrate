require "administrate/field/belongs_to"
require "support/constant_helpers"
require "support/field_matchers"

describe Administrate::Field::BelongsTo do
  include FieldMatchers

  it { should_permit_param("foo_id", for_attribute: :foo) }
  it { should_permit_param("bar_id", for_attribute: "bar") }

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

  describe "primary_key option" do
    it "determines what primary key is used on the relationship for the form" do
      begin
        Foo = Class.new
        FooDashboard = Class.new
        uuid = SecureRandom.uuid
        allow(Foo).to receive(:all).and_return([Foo])
        allow(Foo).to receive(:uuid).and_return(uuid)
        allow(Foo).to receive(:id).and_return(1)
        allow_any_instance_of(FooDashboard).to(
          receive(:display_resource).and_return(uuid)
        )

        association =
          Administrate::Field::BelongsTo.with_options(
            primary_key: "uuid", class_name: "Foo"
          )
        field = association.new(:customers, [], :show)
        field.associated_resource_options

        expect(Foo).to have_received(:all)
        expect(Foo).to have_received(:uuid)
        expect(Foo).not_to have_received(:id)
      ensure
        remove_constants :Foo, :FooDashboard
      end
    end
  end
end
