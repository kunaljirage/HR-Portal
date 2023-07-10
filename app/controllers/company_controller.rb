class CompanyController < ApplicationController
    
    def create
        company=Company.new({name:params[:name],contact_no:params[:contact_no],email:params[:email],address:params[:address],postal_code:params[:postal_code],fax:params[:fax]})
        company.save
        render json:{'success':true,'company':company}, status: :ok
    end

    def index
        companies=Company.all.select(:id, :name)
        render json:{'companies':companies}, status: :ok
    end
end
