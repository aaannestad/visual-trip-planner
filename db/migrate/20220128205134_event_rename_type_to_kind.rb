class EventRenameTypeToKind < ActiveRecord::Migration[6.1]
  def change
    rename_column :events, :type, :kind #type is apparently reserved for single-table inheritance stuff
  end
end
