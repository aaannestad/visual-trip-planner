class CreateTrips < ActiveRecord::Migration[6.1]
  def change
    create_table :trips do |t|
      t.string :name
      t.datetime :startdate
      t.datetime :enddate

      t.timestamps
    end
  end
end
