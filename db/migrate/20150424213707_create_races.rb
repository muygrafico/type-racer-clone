class CreateRaces < ActiveRecord::Migration
  def change
    create_table :races do |t|
      t.integer :wpm
      t.decimal :accuracy
      t.integer :finished_time
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :races, :users
  end
end
