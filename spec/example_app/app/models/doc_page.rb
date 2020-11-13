class DocPage
  class << self
    def find(page)
      full_path = Rails.root + "../../#{page}.md"

      if File.exist?(full_path)
        text = File.read(full_path)
        new(text)
      end
    end
  end

  def initialize(text)
    @text = text
  end

  def title
    document.title
  end

  def body
    document.body
  end

  private

  attr_reader :text

  def document
    @document ||= DocumentParser.new(text)
  end

  class DocumentParser
    def initialize(source_text)
      parsed_document = FrontMatterParser::Parser.new(:md).call(source_text)
      @source_text = parsed_document.content
      @metadata = parsed_document.front_matter
    end

    def body
      @body ||=
        begin
          renderer = Redcarpet::Render::HTML
          markdown = Redcarpet::Markdown.new(renderer, redcarpet_config)

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

    private

    attr_reader :source_text, :metadata

    def redcarpet_config
      {
        fenced_code_blocks: true,
        autolink: true,
      }
    end
  end
end
