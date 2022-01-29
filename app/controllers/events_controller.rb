class EventsController < ApplicationController

  before_action :load_trip
  def load_trip
    @trip = Trip.find(params[:trip_id])
  end

  def new
  end

  def create
    @event = @trip.events.build(event_params) #>.create in the end #event_params is missing trip_id, or something; the event gets built with trip_id: 1
    if @event.save
      flash[:success] = 'Event created!'
      redirect_to @trip #currently this gets passed a parameter 1, probably because of the above issue with parameters
    else
      redirect_to root_path
    end
  end

  #TEST ZONE
  # def index
  #   event_list = Event.where(trip_id: @trip[:id])
  #   event_list.to_json
  # end
  
  private
  def event_params
    params.permit(:title, :kind, :start_date, :end_date, :trip_id)
  end

end
