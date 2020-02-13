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
      contents = parse_document(path)
      @page_title = contents.title
      @page_title_suffix = contents.title_suffix
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

  def parse_document(path)
    text = File.read(path)
    DocumentParser.new(text)
  end

  class DocumentParser
    def initialize(source_text)
      front_matter_parsed = FrontMatterParser::Parser.new(:md).call(source_text)
      @source_text = front_matter_parsed.content
      @metadata = front_matter_parsed.front_matter
    end

    def body
      @body ||=
        begin
          renderer = Redcarpet::Render::HTML
          markdown = Redcarpet::Markdown.new(renderer, REDCARPET_CONFIG)

          source_text_with_heading = <<~MARKDOWN
            # #{title}

            #{source_text}
          MARKDOWN

          markdown.render(source_text_with_heading)
        end
    end

    def title
      metadata["title"]
    end

    def title_suffix
      metadata["home"] ? "" : " - Administrate"
    end

    private

    attr_reader :source_text, :metadata
  end
end
