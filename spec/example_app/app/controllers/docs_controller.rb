class DocsController < ApplicationController
  REDCARPET_CONFIG = {
    fenced_code_blocks: true,
    autolink: true,
  }.freeze

  def index
    render_markdown "README"
  end

  def show
    render_markdown "docs/#{params[:page]}"
  end

  private

  def render_markdown(file)
    text = File.read(Rails.root + "../../#{file}.md")
    renderer = Redcarpet::Render::HTML
    markdown = Redcarpet::Markdown.new(renderer, REDCARPET_CONFIG)
    render layout: "docs", html: markdown.render(text).html_safe
  end
end
