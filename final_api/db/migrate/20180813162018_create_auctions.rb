class CreateAuctions < ActiveRecord::Migration[5.2]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :details
      t.string :end_date
      t.decimal :price, precision: 10, scale: 2

      t.timestamps
    end
  end
end
