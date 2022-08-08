require "rails_helper"

describe Administrate::NotAuthorizedError do
  context "when the resource is a class or module" do
    it "produces a message mentioning it directly" do
      error = described_class.new(
        resource: Administrate,
        action: "foo",
      )
      expect(error.message).to eq(
        %{Not allowed to perform "foo" on Administrate},
      )
    end
  end

  context "when the resource is a string" do
    it "produces a message mentioning it directly" do
      error = described_class.new(
        resource: "User",
        action: "foo",
      )
      expect(error.message).to eq(%{Not allowed to perform "foo" on "User"})
    end
  end

  context "when the resource is a symbol" do
    it "produces a message mentioning it directly" do
      error = described_class.new(
        resource: :user,
        action: "foo",
      )
      expect(error.message).to eq(%{Not allowed to perform "foo" on :user})
    end
  end

  context "when the resource is something else" do
    it "produces a message that refers to the class of the resource" do
      class TestStuff; end

      error = described_class.new(
        resource: TestStuff.new,
        action: "foo",
      )
      expect(error.message).to eq(
        %{Not allowed to perform "foo" on the given TestStuff},
      )
    ensure
      remove_constants :TestStuff
    end
  end
end
