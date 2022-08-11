class DocPage
  class PageNotFound < StandardError
    def initialize(page)
      "Could not find page #{page.inspect}"
    end
  end

  class PageNotAllowed < StandardError
    def initialize(page)
      "Page #{page.inspect} is not allowed"
    end
  end

  class << self
    def find(page)
      full_path = Rails.root + "../../#{page}.md"
      raise PageNotFound.new(page) unless path_exists?(full_path)

      safe_path = filter_unsafe_paths(full_path)
      raise PageNotAllowed.new(page) unless safe_path

      text = File.read(safe_path)
      new(text)
    end

    private

    def path_exists?(full_path)
      File.exist?(full_path)
    end

    def doc_paths
      [
        Dir.glob(Rails.root + "../../**/*.md"),
        Dir.glob(Rails.root + "../../*.md"),
      ].join
    end

    def filter_unsafe_paths(full_path)
      doc_paths[full_path.to_s]
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
