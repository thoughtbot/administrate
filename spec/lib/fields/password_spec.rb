require "administrate/field/password"
require "support/field_matchers"

describe Administrate::Field::Password do
  include FieldMatchers

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Password.new(:password, "my_password", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/password/#{page}")
    end
  end

  it { should_permit_param(:foo, for_attribute: :foo) }

  describe "#truncate" do
    it "renders an empty string for nil" do
      string = Administrate::Field::Password.new(:secret, nil, :show)

      expect(string.truncate).to eq("")
    end

    it "defaults to displaying up to 50 characters" do
      short = Administrate::Field::Password.new(:short_secret, lorem(30), :show)
      long = Administrate::Field::Password.new(:long_secret, lorem(60), :show)

      expect(short.truncate).to eq(lorem(30))
      expect(long.truncate).to eq(lorem(50))
    end

    context "with a `truncate` option" do
      it "shortens to the given length" do
        password = password_with_options(lorem(30), truncate: 20)

        expect(password.truncate).to eq(lorem(20))
      end

      it "different to default character" do
        password = password_with_options(lorem(30), character: "*")

        expect(password.truncate).to eq(lorem(30, "*"))
      end

      it "shortens to the given length & different to default character" do
        password = password_with_options(lorem(30),
                                         truncate: 10,
                                         character: "-")

        expect(password.truncate).to eq(lorem(10, "-"))
      end
    end
  end

  def password_with_options(string, options)
    Administrate::Field::Password.new(:string, string, :page, options)
  end

  def lorem(n, character = "•")
    character * n
  end
end
