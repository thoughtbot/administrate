class DocsController < ApplicationController
  SPECIAL_FILES = [
    {
      file: 'CONTRIBUTING',
      page: 'contributing'
    },
    {
      file: 'README',
      page: 'index',
      home: true
    }
  ].freeze

  REDCARPET_CONFIG = {
    fenced_code_blocks: true,
    autolink: true,
  }.freeze

  def show
    render_correct_page
  end

  private

  def find_special_file
    params[:page].nil? ? retrieve_index_content : retrieve_everypage_content
  end

  def retrieve_index_content
    SPECIAL_FILES.find { |page| page[:page] == 'index' }
  end

  def retrieve_everypage_content
    SPECIAL_FILES.find { |page| page[:page] == params[:page] }
  end

  def render_correct_page
    if find_special_file
      render_page find_special_file[:file]
    else
      render_page "docs/#{params[:page]}"
    end
  end

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
    # @page_title = retrieve_index_content[:title]
    # @page_title_suffix = ""
    DocumentParser.new(text)
  end

  class DocumentParser
    def initialize(source_text)
      front_matter_parsed = FrontMatterParser::Parser.new(:md).call(source_text)
      @source_text = front_matter_parsed.content
      if front_matter_parsed.front_matter.empty?
        @metadata = {"home"=>true}
      else
        @metadata = front_matter_parsed.front_matter
      end
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
      metadata["home"] ? "Administrate" : " - Administrate"
    end

    private

    attr_reader :source_text, :metadata
  end
end
