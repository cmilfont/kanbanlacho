class FeaturesController < ApplicationController
  # GET /features
  # GET /features.json
  def index
    @features = Feature.all({:conditions => {:project_id => params[:project_id]}, :include => [:project] })

    respond_to do |format|
      format.html # index.html.erb
      format.json  {
        render :json => {
          :total => @features.size,
          :feature => @features,
          :success => true,
          :message => "Carregado com sucesso"
        }.to_json(:include => [:project])
      }
    end
  end

  # GET /features/1
  # GET /features/1.json
  def show
    @feature = Feature.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json  { render :json => {
          :total => 1,
          :feature => @feature,
          :success => true,
          :message => ""
      }}
    end
  end

  # GET /features/new
  # GET /features/new.json
  def new
    @feature = Feature.new

    respond_to do |format|
      format.html # new.html.erb
      format.json  { render :json => @feature }
    end
  end

  # GET /features/1/edit
  def edit
    @feature = Feature.find(params[:id])
  end

  # POST /features
  # POST /features.json
  def create
    @feature = Feature.new(params[:feature])

    respond_to do |format|
      if @feature.save
        format.html { redirect_to(@feature, :notice => 'Feature was successfully created.') }
          format.json  { render :json => {
              :feature => @feature,
              :success => true,
              :message => "Criado com sucesso"
              }.to_json(:include => [:project])
          }
      else
        format.html { render :action => "new" }
        format.json  { render :json => @feature.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /features/1
  # PUT /features/1.json
  def update
    @feature = Feature.find(params[:id])

    respond_to do |format|
      if @feature.update_attributes(params[:feature])
        format.html { redirect_to(@feature, :notice => 'Feature was successfully updated.') }
          format.json  { render :json => {
              :feature => @feature,
              :success => true,
              :message => "Atualizado com sucesso"
              }.to_json(:include => [:project])
          }
      else
        format.html { render :action => "edit" }
        format.json  { render :json => @feature.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /features/1
  # DELETE /features/1.json
  def destroy
    @feature = Feature.find(params[:id])
    @feature.destroy

    respond_to do |format|
      format.html { redirect_to(features_url) }
      format.json  { render :json => {
              :feature => [],
              :success => true,
              :message => "excluido com sucesso"
          } }
    end
  end
end

