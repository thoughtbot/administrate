RSpec.shared_examples "field_with_scope_option" do |field_class|
  describe "scope option" do
    it "provides resource options through a model scope" do
      begin
        ScopeTest = Class.new
        allow(ScopeTest).to receive(:test_scope).and_return([])
        allow(ScopeTest).to receive(:all).and_return([])

        association = field_class.with_options(scope: :test_scope)
        field = association.new(:scope_test, [], :show)
        field.associated_resource_options

        expect(ScopeTest).to have_received(:test_scope)
        expect(ScopeTest).not_to have_received(:all)
      ensure
        remove_constants :ScopeTest
      end
    end
  end
end
