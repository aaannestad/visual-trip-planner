class Trip < ApplicationRecord
  # belongs_to :user
  validates :name, presence: true, length: { maximum: 50 }
  # validates_date :start_date # figure this out later
  # validates_date :end_date
  has_many :events
end
