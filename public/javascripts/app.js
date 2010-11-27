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

var FeatureStore = new FactoryStore({
    root: 'feature',
    url: '/features.json',
    storeId: 'id',
	autoLoad: false,
	autoSave: false,
	remoteSort: true,
	autoDestroy: false,
	baseParams: {sort: 'name', dir: 'ASC', project_id: 1},
	fields: [
		{name: 'id',         mapping: 'id'},
		{name: 'title',      mapping: 'title',      allowBlank: true},
		{name: 'project_id', mapping: 'project_id', allowBlank: true},
		{name: 'so_that',    mapping: 'so_that',    allowBlank: true},
		{name: 'as_a',       mapping: 'as_a',       allowBlank: true},
		{name: 'i_want',     mapping: 'i_want',     allowBlank: true},
		{name: 'created_at', mapping: 'created_at', allowBlank: true},
		{name: 'updated_at', mapping: 'updated_at', allowBlank: true},
		{name: 'status',     mapping: 'status',     allowBlank: true}
	]
});

var pagingBar = new Ext.PagingToolbar({
    pageSize: 5,
    store: FeatureStore,
    displayInfo: true,
    displayMsg: 'Displaying topics {0} - {1} of {2}'
});

Ext.onReady(function(){
    Ext.QuickTips.init();

    var grid = new Ext.grid.GridPanel({
        loadMask: {msg: 'Loading Features...'},
        renderTo: 'grid_features',
        store: FeatureStore,
        cm: new Ext.grid.ColumnModel({
            defaults: { width: 120, sortable: true},
            columns: [
                {id: 'id',      header: 'id', width: 20, dataIndex: 'id'},
                {header: 'title',      width: 200, dataIndex: 'title'}
                ,{header: 'project_id', width: 20, dataIndex: 'project_id'},
                {header: 'so_that',    width: 100, dataIndex: 'so_that'},
                {header: 'as_a',       width: 100, dataIndex: 'as_a'},
                {header: 'i_want',     width: 100, dataIndex: 'i_want'},
                // instead of specifying renderer: Ext.util.Format.dateRenderer('m/d/Y') use xtype
                {header: 'created_at', width: 130, dataIndex: 'created_at', xtype: 'datecolumn', format: 'd/m/y'},
                {header: 'updated_at', width: 130, dataIndex: 'updated_at', xtype: 'datecolumn', format: 'd/m/y'},
                {header: 'status',     width: 50, dataIndex: 'status'}
            ]
        }),
        viewConfig: {forceFit: true},
        sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
        width: 800, height: 300, frame: true, autoShow: true,
        title: 'Grid de Features',
        iconCls: 'icon-grid' , bbar: pagingBar
    });

    FeatureStore.load( {params: {sort: 'name', dir: 'ASC', project_id:"1"}} );
});

