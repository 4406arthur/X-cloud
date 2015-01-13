class FixcolnameonUpload < ActiveRecord::Migration
  def change
    rename_column :uploads, :type, :mimetype
  end
end
