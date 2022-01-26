class CreatePlantEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :plant_events do |t|
      t.string :name
      t.string :plantSpecies
      t.integer :waterFrequency
      t.string :nextWater
      t.boolean :completed

      t.timestamps
    end
  end
end
