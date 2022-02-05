class AddTripsToEvents < ActiveRecord::Migration[6.1]
  def change
    add_reference :events, :trip, null: false, foreign_key: true
  end
end
