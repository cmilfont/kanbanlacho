class CreateFeatures < ActiveRecord::Migration
  def self.up
    create_table :features do |t|
      t.belongs_to :project
      t.string :title
      t.string :as_a
      t.string :i_want
      t.string :so_that

      t.timestamps
    end
  end

  def self.down
    drop_table :features
  end
end
