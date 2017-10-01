require "rails_helper"
require "generators/administrate/views/field_generator"
require "support/generator_spec_helpers"

describe Administrate::Generators::Views::FieldGenerator, :generator do
  context "for an existing field type" do
    describe "administrate:views:field field_name" do
      it "copies the `_show` partial into the app/views/fields directory" do
        expected_contents = contents_for_field_template(:string, :show)

        run_generator ["string"]
        contents = File.read(file("app/views/fields/string/_show.html.erb"))

        expect(contents).to eq(expected_contents)
      end

      it "copies the `_form` partial into the app/views/fields directory" do
        expected_contents = contents_for_field_template(:string, :form)

        run_generator ["string"]
        contents = File.read(file("app/views/fields/string/_form.html.erb"))

        expect(contents).to eq(expected_contents)
      end

      it "copies the `_index` partial into the app/views/fields directory" do
        expected_contents = contents_for_field_template(:string, :index)

        run_generator ["string"]
        contents = File.read(file("app/views/fields/string/_index.html.erb"))

        expect(contents).to eq(expected_contents)
      end
    end

    describe "administrate:views:field all" do
      let(:field_types) do
        Dir.entries("app/views/fields").reject { |name| name[0] == "." }
      end

      it "copies the `_show` partial for each field type" do
        run_generator ["all"]

        field_types.each do |field_type|
          expected_contents = contents_for_field_template(field_type, :show)
          contents = File.read(
            file("app/views/fields/#{field_type}/_show.html.erb"),
          )

          expect(contents).to eq(expected_contents)
        end
      end

      it "copies the `_form` partial for each field type" do
        run_generator ["all"]

        field_types.each do |field_type|
          expected_contents = contents_for_field_template(field_type, :form)
          contents = File.read(
            file("app/views/fields/#{field_type}/_form.html.erb"),
          )

          expect(contents).to eq(expected_contents)
        end
      end

      it "copies the `_index` partial for each field type" do
        run_generator ["all"]

        field_types.each do |field_type|
          expected_contents = contents_for_field_template(field_type, :index)
          contents = File.read(
            file("app/views/fields/#{field_type}/_index.html.erb"),
          )

          expect(contents).to eq(expected_contents)
        end
      end
    end
  end

  def contents_for_field_template(field_name, partial_name)
    File.read(
      "app/views/fields/#{field_name}/_#{partial_name}.html.erb",
    )
  end
end
