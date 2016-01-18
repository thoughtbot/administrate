class DocsController < ApplicationController
  def index
    render file: "README"
  end

  def show
    render file: "docs/#{params[:page]}"
  end
end
