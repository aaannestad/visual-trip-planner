class EventsController < ApplicationController

  before_action :load_trip
  def load_trip
    @trip = Trip.find(params[:trip_id])
  end

  def new
  end

  def create
    @event = @trip.events.build(event_params) 
    if @event.save
      flash[:success] = 'Event created!'
      redirect_to @trip 
    else
      redirect_to root_path
    end
  end

  def index
    @events = Event.where(trip_id: @trip[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render :json => event_serialiser(@events)}
    end
  end
  
  private
  def event_params
    params.permit(:title, :kind, :trip_id, :start_time, :end_time)
  end

  def event_serialiser(events)
   events.map do |event| 
    if event.kind == "Stay" #not sure if this'll be by type or by the all_day boolean that no event is using right now
    {
      title: event.title,
      start: event.start_time.to_date.to_s,
      end: event.end_time.to_date.to_s
    }
    else
    {
      title: event.title,
      start: event.start_time.to_date.to_s + "T" + event.start_time.strftime("%H:%M:%S"),
      end: event.end_time.to_date.to_s + "T" + event.end_time.strftime("%H:%M:%S"),
    }
    end
   end
  end
end
