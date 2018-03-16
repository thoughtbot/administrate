RSpec.shared_context "OrderDashboard uses decoration" do
  let(:order_decorator_class) do
    Class.new do
      def initialize(order) end
    end
  end

  before do
    allow_any_instance_of(OrderDashboard).to(
      receive(:decorate_resource) do |order|
        order_decorator_class.new(order)
      end
    )
  end
end
