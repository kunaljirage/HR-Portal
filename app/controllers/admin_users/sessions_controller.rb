# frozen_string_literal: true

class AdminUsers::SessionsController < Devise::SessionsController
  respond_to :json
  # before_action :configure_sign_in_params, only: [:create]

  def create
    user = AdminUser.find_for_database_authentication(email: params[:user] && params[:user][:email])
    if invalid_password?(user)
      respond_with_error 'Incorrect email or password', 401
    else
      sign_in(user)
      render json: { auth_token: user.authentication_token, user: },
             status: :created
    end
  end

  def destroy
    reset_session
  end

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  private

  def respond_with_error(message, status = 500)
    render json: { error: message }, status:
  end

  def invalid_password?(user)
    user.blank? || !user.valid_password?(params[:user][:password])
  end
end
