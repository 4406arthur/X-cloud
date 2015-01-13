class CreateServices < ActiveRecord::Migration
  def change
    create_table :services do |t|
      t.integer :user_id
      t.string :service_id, :unique => true
      t.string :service_name
      t.string :folder_id
      t.timestamps
    end

    execute "ALTER TABLE services ADD UNIQUE KEY (service_id);"
  end
end
