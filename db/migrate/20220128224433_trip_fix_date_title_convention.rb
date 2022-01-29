class TripFixDateTitleConvention < ActiveRecord::Migration[6.1]
  def change
    rename_column :trips, :startdate, :start_date
    rename_column :trips, :enddate, :end_date
  end
end
