if RUBY_VERSION >= "2.6.0"
  if Rails.version < "5"
    module ActionController
      class TestResponse < ActionDispatch::TestResponse
        def recycle!
          @mon_mutex_owner_object_id = nil
          @mon_mutex = nil
          initialize
        end
      end
    end
  end
end
