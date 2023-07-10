class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.references :company, foreign_key: true
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :email, null: false, default: ""
      t.text :encrypted_password
      t.string :contact_no
      t.string :address
      t.string :bank_name
      t.string :account_no
      t.string :ifsc_no
      t.string :job_profile
      t.integer :is_admin
      t.string :authentication_token
      t.text :encrypted_salary
      t.text :encrypted_salary_iv

      ## Recoverable
      t.string   :reset_password_token
      t.datetime :reset_password_sent_at

      ## Rememberable
      t.datetime :remember_created_at
      

      t.timestamps
    end
    add_index :users, :email,                unique: true
    add_index :users, :reset_password_token, unique: true
  end
end
