class Product < ApplicationRecord
  def self.policy_class=(policy)
    @policy_class = policy
  end

  def self.policy_class
    @policy_class ||= ProductPolicy
  end

  has_many :line_items, dependent: :destroy
  has_many :pages, dependent: :destroy
  has_one :product_meta_tag, dependent: :destroy

  before_validation :trim_image_url

  validates :description, presence: true
  validates :image_url, presence: true, format: %r{\Ahttps?://}
  validates :name, presence: true
  validates :price, presence: true
  validates :release_year,
            numericality: {
              less_than_or_equal_to: ->(_product) { Time.current.year },
            },
            allow_blank: true
  validates :slug, uniqueness: true
  validates :product_meta_tag, presence: true, on: :some_unclear_situation
  validate :valid_slug

  accepts_nested_attributes_for :product_meta_tag

  def name=(value)
    self.slug = value.to_s.parameterize
    super(value)
  end

  def to_param
    slug
  end

  def valid_slug
    if slug.blank?
      errors.add :name, "must have letters or numbers for the URL"
    end
  end

  private

  def trim_image_url
    image_url&.strip!
  end
end
