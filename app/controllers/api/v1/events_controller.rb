class Api::V1::EventsController < ApplicationController
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token
  #get /plants
  def index
    @events = PlantEvent.all
    render json: @events
  end

  #get /plants/1
  def show
    if @event
      render json: @event
    else
      render json: @event.errors
    end
  end

  #GET /plants/new
  def new
    @event = PlantEvent.new
  end

  # Get /plants/1/edit
  def edit
  end

  #POST /plants
  def create
    @event = PlantEvent.new(event_params)

    @event.save

  end

  #PATCH/UPDATE
  def update
    PlantEvent.find(params[:id]).update(completed: params[:completed])
  end

  #delete /plants/1
  def destroy
    @event.destroy
    render json: { notice: 'Plant was successfully removed.'}
  end

  private
    def set_event
      @event = PlantEvent.find(params[:id])
    end

    def event_params
      params.permit(:name, :plantSpecies, :waterFrequency, :nextWater, :completed)
    end

end
