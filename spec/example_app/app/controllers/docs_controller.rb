class DocsController < ApplicationController
  def index
    render_page("README")
  end

  def show
    case params[:page]
    when "contributing", "CONTRIBUTING"
      render_page("CONTRIBUTING", "Contributing Guide")
    when "license", "LICENSE"
      render_page("LICENSE", "LICENSE")
    when "security", "SECURITY"
      render_page("SECURITY", "Security Policy")
    else
      render_page("docs/#{params[:page]}")
    end
  end

  private

  def render_page(name, title = nil)
    page = DocPage.find(name)

    title ||= page.title
    @page_title = [title, "Administrate"].compact.join(" - ")
    # rubocop:disable Rails/OutputSafety
    render layout: "docs", html: page.body.html_safe
    # rubocop:enable Rails/OutputSafety
  rescue DocPage::PageNotAllowed, DocPage::PageNotFound
    render(
      file: Rails.root.join("public", "404.html"),
      layout: false,
      status: :not_found
    )
  end
end
