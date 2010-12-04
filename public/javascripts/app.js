var grid;
var win;
Ext.form.Field.prototype.msgTarget = 'side';


var ProjectStore = new FactoryStore({
    root: 'project',
    url: '/projects.json',
    storeId: 'id',
	autoLoad: false,
	autoSave: false,
	remoteSort: true,
	autoDestroy: false,
	baseParams: {sort: 'name', dir: 'ASC'},
	fields: [
		{name: 'id',   mapping: 'id',   allowBlank: false},
		{name: 'name', mapping: 'name', allowBlank: true}
	]
});
ProjectStore.load();


var FeatureFields = [
	{name: 'id',           mapping: 'id'},
	{name: 'title',        mapping: 'title',        allowBlank: true},
	{name: 'project_id',   mapping: 'project_id',   allowBlank: true},
	{name: 'project_name', mapping: 'project.name', allowBlank: true},
	{name: 'so_that',      mapping: 'so_that',      allowBlank: true},
	{name: 'as_a',         mapping: 'as_a',         allowBlank: true},
	{name: 'i_want',       mapping: 'i_want',       allowBlank: true},
	{name: 'created_at',   mapping: 'created_at',   allowBlank: true},
	{name: 'updated_at',   mapping: 'updated_at',   allowBlank: true},
	{name: 'status',       mapping: 'status',       allowBlank: true}
];
var FeatureRecord = Ext.data.Record.create(FeatureFields);

var FeatureStore = new FactoryStore({
    root: 'feature',
    url: '/features.json',
    storeId: 'id',
	autoLoad: false,
	autoSave: false,
	remoteSort: true,
	autoDestroy: false,
	baseParams: {sort: 'name', dir: 'ASC', project_id: 1},
	fields: FeatureFields
});

var MilfontFormPanel = Ext.extend(Ext.FormPanel, {

    store: {},

    constructor: function(config) {
        config.monitorValid = true;
        config.xtype = 'form';
        config.width = 360;
        config.border = false;
        config.defaults = {width: 200, allowBlank: false};
        config.defaultType= 'textfield';
        var eu = this;

        config.buttons = [
          {
              formBind: true,
              text: 'Salvar',
              handler: function(button) {
                  objeto = button
                  var json = button.ownerCt.ownerCt.getForm().getValues();
                  console.log(objeto);
                  eu.store.add(new FeatureRecord(json) );
                  eu.store.save();
                  button.ownerCt.ownerCt.ownerCt.close();
              }
          }
        ];
        Ext.apply(this, config);
        MilfontFormPanel.superclass.constructor.call(this);
    }
});

var cadastrar = function(title) {
    var win = new Ext.Window({
       title: title,
       height: 200,
       width: 400,
       modal: true,
       items: [ new MilfontFormPanel({
            items: [
                {fieldLabel: 'Title',   name: 'title' },
                {fieldLabel: 'So That', name: 'so_that'},
                {fieldLabel: 'As a',    name: 'as_a'},
                {fieldLabel: 'I Want',  name: 'i_want'}
            ],
            store: FeatureStore
        })
       ]
    });
    win.show();
};

var pagingBar = new Ext.PagingToolbar({
    pageSize: 5,
    store: FeatureStore,
    displayInfo: true,
    displayMsg: 'Displaying topics {0} - {1} of {2}',
    items: [
        {
            xtype: 'button',
            text: 'Cadastrar',
            handler: cadastrar.createCallback('Cadastro')
        }
    ]
});

Ext.onReady(function(){
    Ext.QuickTips.init();

    grid = new Ext.grid.GridPanel({
        loadMask: {msg: 'Loading Features...'},
        renderTo: 'grid_features',
        store: FeatureStore,
        cm: new Ext.grid.ColumnModel({
            defaults: { width: 120, sortable: true},
            columns: [
                {id: 'id',      header: 'id', width: 20, dataIndex: 'id'},
                {header: 'title',      width: 200, dataIndex: 'title'}
                ,{header: 'Project', width: 150, dataIndex: 'project_name'},
                {header: 'So That',    width: 100, dataIndex: 'so_that'},
                {header: 'As a',       width: 100, dataIndex: 'as_a'},
                {header: 'I want',     width: 100, dataIndex: 'i_want'},
                // instead of specifying renderer: Ext.util.Format.dateRenderer('m/d/Y') use xtype
                {header: 'created_at', width: 130, dataIndex: 'created_at', xtype: 'datecolumn', format: 'd/m/yy'},
                {header: 'updated_at', width: 130, dataIndex: 'updated_at', xtype: 'datecolumn', format: 'd/m/yy'},
                {header: 'status',     width: 80, dataIndex: 'status'}
            ]
        }),
        viewConfig: {forceFit: true},
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        width: 800, height: 200, frame: true, autoShow: true,
        title: 'Grid de Features',
        iconCls: 'icon-grid' , bbar: pagingBar
    });

    FeatureStore.load( {params: {sort: 'name', dir: 'ASC', project_id:"1"}} );
});

