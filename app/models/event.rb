class Event < ApplicationRecord
  belongs_to :trip
  validates :title, presence: true, length: { maximum: 50 }
end
