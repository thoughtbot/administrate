require "rails_helper"

describe Administrate::ResourceDecorator do
  describe "#to_s" do
    context "when the resource does not have #to_s defined" do
      it "renders the class name and resource id" do
        model_class = Class.new do
          def self.to_s
            "SomeClass"
          end

          def id
            1
          end
        end

        model = model_class.new
        decorated_model = Administrate::ResourceDecorator.new(model)

        expect(decorated_model.to_s).to eq("Some Class #1")
      end
    end

    context "when the resource has a custom #to_s defined" do
      it "renders the resource using #to_s" do
        model_class = Class.new do
          def to_s
            "Woohoo!"
          end
        end

        model = model_class.new
        decorated_model = Administrate::ResourceDecorator.new(model)

        expect(decorated_model.to_s).to eq("Woohoo!")
      end
    end
  end
end
