class AlterColumnRacesAccuracy < ActiveRecord::Migration
  def change
    def change
      def self.up
          change_table :races do |t|
            t.change :accuracy, :decimal, :precision => 10, :scale => 2
          end
        end
        def self.down
          change_table :products do |t|
            t.change :accuracy, :decimal
          end
        end
    end
  end
end
