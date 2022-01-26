class CreatePlantData < ActiveRecord::Migration[7.0]
  def change
    create_table :plant_data do |t|
      t.string :name
      t.string :plantSpecies
      t.integer :waterFrequency
      t.string :startDate
      t.string :img

      t.timestamps
    end
  end
end
