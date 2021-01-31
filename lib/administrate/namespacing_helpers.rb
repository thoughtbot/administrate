module Administrate
  module NamespacingHelpers
    DEFAULT_INDENT = " " * 2

    def dashboard_resources_hash
      output = [{}, []]
      dashboard_resources.each do |resource_path|
        path = resource_path.split("/")
        output = [
          add_namespace_to_hash(path, output[0]),
          add_resources_to_hash(path, output[1]),
        ]
      end
      output
    end

    def add_namespace_to_hash(path, current_state)
      if path.length > 1
        current_state[path[0]] ||= [{}, []]
        current_state[path[0]] = [
          add_namespace_to_hash(path[1..], current_state[path[0]][0]),
          add_resources_to_hash(path[1..], current_state[path[0]][1]),
        ]
      end
      current_state
    end

    def add_resources_to_hash(path, current_state)
      if path.length == 1
        current_state.push(path[0])
      end
      current_state
    end

    def generate_resource_routes
      namespace = dashboard_resources_hash
      output_string = ""
      namespace[1].each do |resource|
        output_string += "#{DEFAULT_INDENT}resources :#{resource}\n"
      end
      output_string += "\n#{generate_namespace_routes(namespace[0])}"
      output_string
    end

    def generate_namespace_routes(hash, indent = 1)
      output_string = ""
      indentation = DEFAULT_INDENT * indent
      hash.each do |namespace, namespace_resource|
        namespaces = namespace_resource[0]
        resources = namespace_resource[1]
        output_string += "#{indentation}namespace :#{namespace} do\n"
        resources.each do |resource|
          resource_string = "#{DEFAULT_INDENT}resources :#{resource}"
          output_string += "#{indentation}#{resource_string}\n"
        end
        if !namespaces.empty?
          namespaces_string = generate_namespace_routes(namespaces, indent + 1)
          output_string += "\n#{namespaces_string}\n"
        end
        output_string += "#{indentation}end\n"
      end
      output_string
    end
  end
end
