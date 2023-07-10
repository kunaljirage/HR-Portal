class CreateDeductions < ActiveRecord::Migration[6.1]
  def change
    create_table :deductions do |t|
      t.references :user, foreign_key: true
      t.integer :house_rent_allowances, :default => 0
      t.integer :conveyance_allowances, :default => 0
      t.integer :medical_allowances, :default => 0
      t.integer :spcial_allowances, :default => 0
      t.integer :epf_deduction, :default => 0
      t.integer :health_insurance_deduction, :default => 0
      t.integer :professional_tax_deduction, :default => 0
      t.integer :tds_deduction, :default => 0
      t.string  :payroll_month

      t.timestamps
    end
  end
end
