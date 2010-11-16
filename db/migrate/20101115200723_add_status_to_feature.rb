class AddStatusToFeature < ActiveRecord::Migration
  def self.up
    add_column :features, :status, :string
  end

  def self.down
    remove_column :features, :status
  end
end

