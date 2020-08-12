class CreateLanguageLocations < ActiveRecord::Migration[6.0]
  def change
    create_table :language_locations do |t|
      t.references :language, null: false, foreign_key: true
      t.references :location, null: false, foreign_key: true

      t.timestamps
    end
  end
end
