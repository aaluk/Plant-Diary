class Api::V1::PlantsController < ApplicationController
  before_action :set_plant, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token
  #get /plants
  def index
    @plants = PlantDatum.all.order("id DESC")
    render json: @plants
  end

  #get /plants/1
  def show
    if @plant
      render json: @plant
    else
      render json: @plant.errors
    end
  end

  #GET /plants/new
  def new
    @plant = PlantDatum.new
  end

  # Get /plants/1/edit
  def edit
  end

  #POST /plants
  def create
    @plant = PlantDatum.new(plant_params)

    @plant.save

  end

  #PATCH/UPDATE
  def update
  end

  #delete /plants/1
  def destroy
    @plant.destroy
    render json: { notice: 'Plant was successfully removed.'}
  end

  private
    def set_plant
      @plant = PlantDatum.find(params[:id])
    end

    def plant_params
      params.permit(:name, :plantSpecies, :waterFrequency, :startDate, :img)
    end

end
