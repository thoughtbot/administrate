require "administrate/fields/password"
require "support/field_matchers"

describe Administrate::Field::Password do
  include FieldMatchers

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Password.new(:password, "hello", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/password/#{page}")
    end
  end

  it { should_permit_param(:foo, for_attribute: :foo) }

  describe "#truncate" do
    it "renders an empty password for nil" do
      password = Administrate::Field::Password.new(:password, nil, :show)

      expect(password.truncate).to eq("")
    end

    it "defaults to displaying up to 8 characters" do
      long_pwd = Administrate::Field::Password.new(:long_pwd, lorem(30), :show)

      expect(long_pwd.truncate).to eq("•" * 8)
    end

    context "with a `truncate` option" do
      it "shortens to the given length" do
        password = password_with_options(lorem(30), truncate: 20)

        expect(password.truncate).to eq("•" * 20)
      end
    end
  end

  def password_with_options(password, options)
    Administrate::Field::Password.new(:password, password, :page, options)
  end

  def lorem(n)
    "a" * n
  end
end
