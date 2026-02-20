require_relative "base"

module Administrate
  module Field
    class ActiveStorage < Administrate::Field::Base

      def self.permitted_attribute(attr, options = {})
        if options[:multiple]
          {attr => []}
        else
          attr
        end
      end

      def permitted_attribute
        self.class.permitted_attribute(
          attribute,
          multiple: many?
        )
      end

      # TODO: Add support for partial_prefixes in Base field class
      def sub_partial_path(path)
        "fields/active_storage/#{path}"
      end

      class PreviewRenderer
        attr_reader :field, :attachment
        def initialize(field, attachment, locals = {})
          @field = field
          @attachment = attachment
          @locals = locals
        end

        def render_in(view_context)
          return nil unless render?
          view_context.render(
            partial: partial_path,
            layout: layout_path,
            locals: {
              field: @field,
              attachment: @attachment,
              **@locals
            }
          )
        end

        def render?
          true
        end

        private
        def partial_name
          if attachment.image?
            :image
          elsif attachment.video?
            if attachment.previewable?
              :video_preview
            else
              :video
            end
          elsif attachment.audio?
            :audio
          elsif attachment.previewable?
            :preview
          else
            :file
          end
        end

        def partial_path
          field.sub_partial_path("preview/#{partial_name}")
        end

        def layout_path
          field.sub_partial_path("preview/layout")
        end
      end

      def preview_renderer(attachment, locals = {})
        PreviewRenderer.new(self, attachment, locals)
      end

      class ItemsRenderer
        attr_reader :field
        def initialize(field, locals = {})
          @field = field
          @locals = locals
        end

        def render_in(view_context)
          return nil unless render?
          view_context.render(
            partial: partial_path,
            layout: layout_path,
            collection: field.attachments,
            as: :attachment,
            locals: {
              field: field,
              variant: @locals.fetch(:variant, field.show_preview_variant),
              size: @locals.fetch(:size, field.show_preview_size),
              display_preview: @locals.fetch(:display_preview, field.show_display_preview?),
              preview_only: @locals.fetch(:preview_only, false)
            }
          )
        end

        def render?
          field.attached?
        end

        private
        def partial_path
          field.sub_partial_path("item/item")
        end

        def layout_path
          field.sub_partial_path("item/items_layout")
        end
      end

      def items_renderer(locals = {})
        ItemsRenderer.new(self, locals)
      end

      def index_display_preview?
        options.fetch(:index_display_preview, true)
      end

      def index_preview_size
        options.fetch(:index_preview_size, [150, 150])
      end

      def index_preview_variant
        options.fetch(:index_preview_variant, nil)
      end

      def index_preview_only?
        options.fetch(:index_preview_only, false)
      end

      def index_display_count?
        options.fetch(:index_display_count) { attached? && attachments.count != 1 }
      end

      def show_display_preview?
        options.fetch(:show_display_preview, true)
      end

      def show_preview_size
        options.fetch(:show_preview_size, [800, 800])
      end

      def show_preview_variant
        options.fetch(:show_preview_variant, nil)
      end

      def file_field_options
        {
          direct_upload: direct?,
          **(many? ? { include_hidden: false, multiple: true } : {}),
        }.merge options.fetch(:file_field_options, {})
      end

      def many?
        data.is_a? ::ActiveStorage::Attached::Many
      end

      def direct?
        options.fetch(:direct_upload, false)
      end

      # currently we are using Rails.application.routes.url_helpers
      # without including the namespace because it runs into an
      # exception

      # work around since calling data.preview(options)
      # returns "/images/<ActiveStorage::Preview>" which isnt the url
      def preview(attachment, options)
        Rails.application.routes.url_helpers.rails_representation_path(attachment.preview(options), only_path: true)
      end

      def variant(attachment, options)
        Rails.application.routes.url_helpers.rails_representation_path(attachment.variant(options), only_path: true)
      end

      def url(attachment)
        Rails.application.routes.url_helpers.rails_blob_path(attachment, only_path: true)
      end

      def blob_url(attachment)
        Rails.application.routes.url_helpers.rails_blob_path(attachment, disposition: :attachment, only_path: true)
      end

      def attached?
        data.present? && data.attached?
      end

      def attachments
        many? ? data.attachments : [data.attachment] if attached?
      end
    end
  end
end
