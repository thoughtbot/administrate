module Administrate
  module NamespacingHelpers
    DEFAULT_INDENT = " " * 2

    def dashboard_resources_hash
      output = [{}, []]
      dashboard_resources.each do |resource_path|
        split_path = resource_path.split("/")
        output = [
          add_namespace_to_hash(split_path, output[0]),
          add_resources_to_hash(split_path, output[1]),
        ]
      end
      output
    end

    def add_namespace_to_hash(split_path, current_state)
      if split_path.length > 1
        current_state[split_path[0]] ||= [{}, []]
        current_namespace = current_state[split_path[0]]
        current_namespace = [
          add_namespace_to_hash(split_path[1..], current_namespace[0]),
          add_resources_to_hash(split_path[1..], current_namespace[1]),
        ]
      end
      current_state
    end

    def add_resources_to_hash(split_path, current_state)
      if split_path.length == 1
        current_state.push(split_path[0])
      end
      current_state
    end

    def generate_resource_routes()
      namespace = dashboard_resources_hash()
      output_string = ""
      dashboard_resources_hash[1].each do |resource|
        output_string += "#{DEFAULT_INDENT}resources :#{resource}\n"
      end
      output_string += "\n#{generate_namespace_routes(namespace[0])}"
      output_string
    end

    def generate_namespace_routes(hash, indent = 1)
      output_string = ""
      indentation = DEFAULT_INDENT * indent
      hash.each do |namespace, namespace_resource|
        nested_namespaces = namespace_resource[0]
        nested_resources = namespace_resource[1]
        output_string += "#{indentation}namespace :#{namespace} do\n"
        nested_resources.each do |resource|
          resource_string = "#{DEFAULT_INDENT}resources :#{resource}"
          output_string += "#{indentation}#{resource_string}\n"
        end
        if !nested_namespaces.empty?
          namespaces_string = generate_namespace_routes(nested_namespaces, indent + 1)
          output_string += "\n#{namespaces_string}\n"
        end
        output_string += "#{indentation}end\n"
      end
      output_string
    end
  end
end