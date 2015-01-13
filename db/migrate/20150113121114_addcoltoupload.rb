class Addcoltoupload < ActiveRecord::Migration
  def change
    add_column :uploads, :gservice, :string
    add_column :uploads, :dservice, :string
    add_column :uploads, :gfid, :string
    add_column :uploads, :dfid, :string
    add_column :uploads, :fname, :string
    add_column :uploads, :type, :string
  end
end
