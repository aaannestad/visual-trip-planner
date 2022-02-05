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

  def edit
    @event = Event.find(params[:id])
  end

  def destroy
    @event = Event.find(params[:id])
    if @event.destroy
      redirect_to @trip
    else
      redirect_to @event
    end
  end

  def update
    @event = Event.find(params[:id])
    if @event.update(event_params) #figure out how to not have empty field overwrite preexisting data with nil
      flash[:success] = 'Event updated!'
      redirect_to @trip
    else
      redirect_to edit_trip_event_path
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
    params.require(:event).permit(:id, :title, :kind, :trip_id, :start_time, :end_time)
    # params.permit(:id, :title, :kind, :trip_id, :start_time, :end_time)
    # params.require(:event).permit(:id, :title, :kind, :trip_id, :start_time, :end_time)
    params.permit(:id, :title, :kind, :trip_id, :start_time, :end_time)
  end

  def event_serialiser(events)
   events.map do |event| 
    if event.start_time == nil
      {}
    elsif event.kind == "Stay" #not sure if this'll be by type or by the all_day boolean that no event is using right now
    {
      id: event.id,
      title: event.title,
      start: event.start_time.to_date.to_s,
      end: event.end_time.to_date.to_s,
    }
    else
    {
      id: event.id,
      title: event.title,
      start: event.start_time.to_date.to_s + "T" + event.start_time.strftime("%H:%M:%S"),
      end: event.end_time.to_date.to_s + "T" + event.end_time.strftime("%H:%M:%S"),
    }
    end
   end
  end
end
