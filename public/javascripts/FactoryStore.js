var configStoreDefault ={
    root: 'data',
    url: '/direct',
    storeId: 'companies',
	autoLoad: false,
	autoSave: false,
	remoteSort: true,
	autoDestroy: false,
	baseParams: {sort: 'name', dir: 'ASC'},
	fields: [
		{name: 'id', mapping: '_id'},
		{name: 'name'},
		{name: 'price', type: 'float'},
		{name: 'change', type: 'float'},
		{name: 'pctChange', type: 'float'},
		{name: 'changedAt', type: 'date', dateFormat: 'time'}
	]
};

var FactoryStore = function(configStore) {

    var configStore = configStore || configStoreDefault;

	var reader = new Ext.data.JsonReader({
        id: 'id', root: configStore.root, totalProperty: 'total', successProperty: 'success', messageProperty: 'message'
        , fields: configStore.fields
        //, sortInfo: {field: 'name', direction: 'ASC'}
    });

    var temp = function() {
        console.log("arguments - begin");
        console.log(arguments);
        console.log("arguments - end");
    }

    var writer = new Ext.data.JsonWriter({
        encode: false,
        //writeAllFields : true,
        //listful : true,

      //updateRecord  : temp,
      //createRecord  : temp,
      //destroyRecord : temp

    });

    var proxy = new Ext.data.HttpProxy({
        //url: configStore.url
        api: {
            read: {url: configStore.url, method: 'GET'},
            create: {url: configStore.url, method: 'POST'},
            destroy: {url: configStore.url, method: 'DELETE'},
            update: {url: configStore.url, method: 'PUT'}
        }

    });

	var abstractStore = new Ext.data.Store({
        restful:true,
		//storeId: configStore.storeId,
		autoLoad: configStore.autoLoad,
		autoSave: configStore.autoSave,
		remoteSort: configStore.remoteSort,
		autoDestroy: configStore.autoDestroy,
		baseParams: configStore.baseParams,
		reader: reader,
		proxy: proxy,
		writer: writer,
	});

    return abstractStore;
};

