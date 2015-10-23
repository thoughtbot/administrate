require "support/constant_helpers"
require "support/generator_spec_helpers"
require "generators/administrate/field/field_generator"

describe Administrate::Generators::FieldGenerator, :generator do
  describe "administrate:field field_name" do
    it "generates a field object" do
      begin
        run_generator ["foobar"]

        load file("app/fields/foobar_field.rb")
        field = FoobarField.new(:attr_name, "value", "show")

        expect(field.name).to eq("attr_name")
        expect(field.data).to eq("value")
        expect(field.to_s).to eq("value")
      ensure
        remove_constants :FoobarField
      end
    end

    it "generates a default `_index` partial" do
      field = double(to_s: "data")

      run_generator ["foobar"]
      erb = File.read(file("app/views/fields/foobar_field/_index.html.erb"))
      rendered = ERB.new(erb).result(binding).strip

      expect(rendered).to eq(field.to_s)
    end

    it "generates a default `_show` partial" do
      field = double(to_s: "data")

      run_generator ["foobar"]
      erb = File.read(file("app/views/fields/foobar_field/_show.html.erb"))
      rendered = ERB.new(erb).result(binding).strip

      expect(rendered).to eq(field.to_s)
    end

    it "generates a default `_form` partial" do
      f = double("form builder").as_null_object
      field = double(attribute: :attr_name)

      run_generator ["foobar"]
      erb = File.read(file("app/views/fields/foobar_field/_form.html.erb"))
      ERB.new(erb).result(binding).strip

      expect(f).to have_received(:label).with(:attr_name)
      expect(f).to have_received(:text_field).with(:attr_name)
    end
  end
end
