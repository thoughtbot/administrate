require "administrate/field/select"
require "support/field_matchers"
require "pry"

describe Administrate::Field::Select do
  include FieldMatchers

  let(:persisted) do
    {
      string: 'approved',
      integer: 2,
      nil: nil
    }
  end

  let(:output) do
    {
      two: 2,
      approved: 'Approved!',
      no_status: 'No status',
      nil: nil
    }
  end

  let(:collections) do
    {
      empty: [],
      array_int: [1, 2, 3],
      arrays_str: [ ['Pending', 'submitted'], ['Approved!', 'approved'] ],
      arrays_sym: [ ['Pending', :submitted], ['Approved!', :approved] ],
      arrays_nil: [ ['No status', nil], ['Approved!', 'approved'] ],
      hash_str: { 'Pending' => 'submitted', 'Approved!' => 'approved' },
      hash_sym: { 'Pending' => :submitted, 'Approved!' => :approved },
      hash_nil: { 'No status' => nil, 'Approved!' => 'approved' }
    }
  end

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Select.new(:select, persisted[:string], page)

      path = field.to_partial_path

      expect(path).to eq("/fields/select/#{page}")
    end
  end

  it { should_permit_param(:foo, for_attribute: :foo) }

  describe "#selectable_options" do
    it "returns an empty array without options" do
      field = Administrate::Field::Select.new(:select, persisted[:string], :show)

      expect(field.selectable_options).to eq(collections[:empty])
    end

    context "with collection" do
      expected = {
        :empty => :empty,
        :array_int => :array_int,
        :arrays_str => :arrays_str,
        :arrays_sym => :arrays_sym,
        :arrays_nil => :arrays_nil,
        :hash_str => :arrays_str,
        :hash_sym => :arrays_sym,
        :hash_nil => :arrays_nil
      }

      expected.each do |in_key, out_key|
        it "`#{in_key}` returns collection `#{out_key}`" do
          field = select_with_options(persisted[:string], collection: collections[in_key])

          expect(field.selectable_options).to eq(collections[out_key])
        end
      end
    end
  end

  describe "#label_data" do
    it "returns nil without options" do
      field = Administrate::Field::Select.new(:select, persisted[:string], :show)

      expect(field.label_data).to eq(output[:nil])
    end

    context "with collection" do
      expected = {
        %i(empty string) => :nil,
        %i(array_int nil) => :nil,
        %i(array_int string) => :nil,
        %i(array_int integer) => :two,
        %i(arrays_str nil) => :nil,
        %i(arrays_str string) => :approved,
        %i(arrays_str integer) => :nil,
        %i(arrays_sym nil) => :nil,
        %i(arrays_sym string) => :approved,
        %i(arrays_sym integer) => :nil,
        %i(arrays_nil nil) => :no_status,
        %i(arrays_nil string) => :approved,
        %i(arrays_nil integer) => :nil,
        %i(hash_str nil) => :nil,
        %i(hash_str string) => :approved,
        %i(hash_str integer) => :nil,
        %i(hash_sym nil) => :nil,
        %i(hash_sym string) => :approved,
        %i(hash_sym integer) => :nil,
        %i(hash_nil nil) => :no_status,
        %i(hash_nil string) => :approved,
        %i(hash_nil integer) => :nil,
      }

      expected.each do |inputs, o_key|
        c_key, p_key = inputs
        it "`#{c_key}` and value `#{p_key}` returns output `#{o_key}`" do
          persisted_data = persisted[p_key]
          collection = collections[c_key]
          field = select_with_options(persisted_data, collection: collection)

          expect(field.label_data).to eq(output[o_key])
        end
      end
    end
  end

  def select_with_options(data, options)
    Administrate::Field::Select.new(:select, data, :page, options)
  end
end
