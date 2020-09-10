module Admin
  class LogEntriesController < Admin::ApplicationController
    include Administrate::Punditize

    class PunditUser; end

    def pundit_user
      PunditUser.new
    end
  end
end
