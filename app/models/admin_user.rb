class AdminUser < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  before_save :ensure_authentication_token_is_present

  def ensure_authentication_token_is_present
    return unless authentication_token.blank?

    self.authentication_token = generate_authentication_token
  end

  def generate_authentication_token
    loop do
      token = Devise.friendly_token
      break token unless AdminUser.where(authentication_token: token).first
    end
  end

end
