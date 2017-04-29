require "rails_helper"

describe OrderDashboard do
  let(:dashboard) { OrderDashboard.new }

  describe "#permitted_attributes" do
    it "returns the attribute name by default" do
      expect(dashboard.permitted_attributes).to include(:address_line_one)
    end

    it "returns the attribute_id name for belongs_to relationships" do
      expect(dashboard.permitted_attributes).to include(:customer_id)
    end
  end

  describe 'methods for decorating' do
    let(:method_added_by_decorator) { :address }

    describe '#prepare_resource_for_display' do
      let(:resource) { create(:order) }

      context 'when #decorate_resource is not defined' do
        before do
          dashboard.instance_eval { undef :decorate_resource }
        end

        it 'returns undecorated resource' do
          resource = dashboard.prepare_resource_for_display(resource)
          expect(resource).to_not respond_to(method_added_by_decorator)
        end
      end

      context 'when #decorate_resource is defined' do
        it 'returns decorated resource' do
          resource = dashboard.prepare_resource_for_display(resource)
          expect(resource).to respond_to(method_added_by_decorator)
        end
      end
    end

    describe '#prepare_collection_for_display' do
      let(:resources) { [create(:order)] }

      context 'when #decorate_resource is not defined' do
        before do
          dashboard.instance_eval { undef :decorate_resource }
        end

        it 'returns undecorated resources' do
          resource = dashboard.prepare_collection_for_display(resources).first
          expect(resource).to_not respond_to(method_added_by_decorator)
        end
      end

      context 'when #decorate_resource is defined' do
        it 'returns decorated resources' do
          resource = dashboard.prepare_collection_for_display(resources).first
          expect(resource).to respond_to(method_added_by_decorator)
        end
      end
    end

  end

end
