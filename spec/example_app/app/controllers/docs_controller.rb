class DocsController < ApplicationController
  def index
    render_page("README")
  end

  def show
    case params[:page]
    when "contributing"
      render_page("CONTRIBUTING", "Contributing Guide")
    when "license", "LICENSE"
      render_page("LICENSE", "LICENSE")
    else
      render_page("docs/#{params[:page]}")
    end
  end

  private

  def render_page(name, title = nil)
    page = DocPage.find(name)

    if page
      title = title || page.title
      @page_title = [title, "Administrate"].compact.join(" - ")
      # rubocop:disable Rails/OutputSafety
      render layout: "docs", html: page.body.html_safe
      # rubocop:enable Rails/OutputSafety
    else
      render file: Rails.root.join("public", "404.html"),
             layout: false,
             status: :not_found
    end
  end
end
