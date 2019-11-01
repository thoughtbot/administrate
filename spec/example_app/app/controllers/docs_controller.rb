class DocsController < ApplicationController
  REDCARPET_CONFIG = {
    fenced_code_blocks: true,
    autolink: true,
  }.freeze

  def index
    render_page "README"
  end

  def show
    render_page "docs/#{params[:page]}"
  end

  private

  def render_page(name)
    path = full_page_path(name)

    if File.exist?(path)
      render layout: "docs", html: render_markdown(path).html_safe
    else
      render file: "#{Rails.root}/public/404.html",
             layout: false,
             status: :not_found
    end
  end

  def full_page_path(page)
    Rails.root + "../../#{page}.md"
  end

  def render_markdown(path)
    text = File.read(path)
    renderer = Redcarpet::Render::HTML
    markdown = Redcarpet::Markdown.new(renderer, REDCARPET_CONFIG)

    markdown.render(text)
  end
end
