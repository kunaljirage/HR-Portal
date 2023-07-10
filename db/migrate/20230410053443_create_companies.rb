class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.string :contact_no
      t.string :email
      t.string :address
      t.string :postal_code
      t.string :fax
      t.timestamps
    end
  end
end
