class EventAddTimes < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :start_time, :time
    add_column :events, :end_time, :time
  end
end
