require "administrate/field/url"

describe Administrate::Field::Url do
  describe ".searchable?" do
    it "returns true" do
      expect(Administrate::Field::Url.searchable?).to be true
    end
  end

  describe "#to_partial_path" do
    it "returns a partial based on the page being rendered" do
      page = :show
      field = Administrate::Field::Url.new(:url, "https://thoughtbot.com", page)

      path = field.to_partial_path

      expect(path).to eq("/fields/url/#{page}")
    end
  end

  describe "#truncate" do
    it "renders an empty string for nil" do
      string = Administrate::Field::Url.new(:website, nil, :show)

      expect(string.truncate).to eq("")
    end

    it "defaults to displaying up to 50 characters" do
      base = "https://example.com/"
      short_url = base + ("a" * 10)
      long_url = base + ("a" * 40)
      short = Administrate::Field::Url.new(:homepage, short_url, :show)
      long = Administrate::Field::Url.new(:website, long_url, :show)

      expect(short.truncate).to eq(short_url)
      expect(long.truncate).to eq(long_url[0...50])
    end

    context "with a `truncate` option" do
      it "shortens to the given length" do
        base_url = "http://example.com/"
        url = Administrate::Field::Url.new(
          :url,
          base_url + "a",
          :page,
          truncate: base_url.length,
        )

        truncated = url.truncate

        expect(truncated).to eq(base_url)
      end
    end
  end
end
