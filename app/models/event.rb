class Event < ApplicationRecord
  belongs_to :trip
  validates :name, presence: true, length: { maximum: 50 }
end
