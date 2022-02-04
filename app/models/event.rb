class Event < ApplicationRecord
  belongs_to :trip
  validates :title, presence: true, length: { maximum: 50 }
  validates :start_time, presence: true
  validates :end_time, presence: true
end
