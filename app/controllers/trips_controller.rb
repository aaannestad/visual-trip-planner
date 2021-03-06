class TripsController < ApplicationController
  
  def new
  end

  def create
    @trip = Trip.create(trip_params)
    if @trip.save
      flash[:success] = 'Trip created!'
      redirect_to @trip
    else
      redirect_to root_path
    end
  end

  def show
    @trip = Trip.find_by id: params[:id]
  end

  def destroy
    @trip.delete
    redirect_to root_path
  end

  def api 
    @trip = Trip.find_by id: params[:id]
    render json: @trip
  end

  private
  def trip_params
    params.permit(:name, :start_date, :end_date)
  end

end
