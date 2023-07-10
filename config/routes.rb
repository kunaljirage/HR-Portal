Rails.application.routes.draw do
  root "pages#index"

  devise_for :users,
   controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
  }

  resources :user do
    collection do
      get '/user_count' => 'user#count'
      get '/job_profiles' => 'user#job_profiles'
      get '/generate_pdf/:id' => 'user#reporte'
      get '/user_profile/:id' => 'user#user_profile'
      post '/getAllDeduction' => 'user#getUserAllDeduction'
    end
  end

  resources :deduction

  resources :company

  match "*path", to:'pages#index', via: :all

end
