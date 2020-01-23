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
      contents = parse_markdown(path)
      @page_title = contents.title
      # rubocop:disable Rails/OutputSafety
      render layout: "docs", html: contents.body.html_safe
      # rubocop:enable Rails/OutputSafety
    else
      render file: "#{Rails.root}/public/404.html",
             layout: false,
             status: :not_found
    end
  end

  def full_page_path(page)
    Rails.root + "../../#{page}.md"
  end

  def parse_markdown(path)
    text = File.read(path)
    MarkdownParser.new(text)
  end

  class MarkdownParser
    def initialize(source_text)
      @source_text = source_text
    end

    def body
      @body ||=
        begin
          renderer = Redcarpet::Render::HTML
          markdown = Redcarpet::Markdown.new(renderer, REDCARPET_CONFIG)

          markdown.render(source_text)
        end
    end

    def title
      @title ||=
        begin
          h1_match = @source_text.scan(/^# (.*)$/).first
          raise "Please provide an H1 heading for the page" if h1_match.empty?

          h1_match.first
        end
    end

    private

    attr_reader :source_text
  end
end
