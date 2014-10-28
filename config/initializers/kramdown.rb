
module Kramdown::Options

  define(:revision, Object, nil, <<-EOF) { |val| val }
A Revision object for citation and link lookups.
  EOF

end

class Kramdown::Parser::FokusMarkdown < Kramdown::Parser::Kramdown

  def initialize(source, options)
    super
    @span_parsers.unshift(:citations)
  end

  CITATIONS_MATCHER = /\{\{(.*?)\}\}/

  def parse_citations
    @src.pos += @src.matched_size
    if revision = options[:revision]
      if cite_name = @src[1].presence
        # puts "name #{cite_name}"
        if citation = revision.citation_for_name(cite_name)
          @tree.children << citation_element(citation)
        end # else display broken citation?
      end
    end
  end

  def citation_element(cite)
    Element.new(:raw,
                '<span class="fg-citation" '+
                %Q{data-citation-id="#{cite.id}">}+
                '[' + cite.name + ']' +
                '</span>')
  end

  define_parser(:citations, CITATIONS_MATCHER) # , '{{')

end

class Kramdown::Converter::FokusMarkdownHtml < Kramdown::Converter::Html
end

