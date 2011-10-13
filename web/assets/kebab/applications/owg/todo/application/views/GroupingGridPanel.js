/**
 * Application GroupingGridPanel class
 *
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.todo.application.views
 * @author      Tayfun Öziş ERİKAN <tayfun.ozis.erikan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/cms/licensing
 */
KebabOS.applications.todo.application.views.GroupingGridPanel = Ext.extend(Ext.grid.GridPanel, {

    // Application bootstrap
    bootstrap: null,
    border:false,

    initComponent: function() {

        this.store = new KebabOS.applications.todo.application.models.GroupingDataStore({
            bootstrap:this.bootstrap
        });

        // grid config
        var config = {
            stripeRows: true,
            loadMask: true,
            view: new Ext.grid.GroupingView({
                emptyText:  'Record not found...',
                groupTextTpl: '{text}',
                forceFit: true,
                hideGroupedColumn: true
            })
        };

        Ext.apply(this, config);

        this.columns = [{
            header   : 'ID',
            dataIndex: 'id',
            sortable:true
        },{
            header   : 'Title',
            dataIndex: 'title',
            sortable:true
        },{
            header   : 'Description',
            dataIndex: 'description',
            sortable:true
        }];
        
        KebabOS.applications.todo.application.views.GroupingGridPanel.superclass.initComponent.apply(this, arguments);
    },
    
    listeners: {
        afterRender: function() {
            this.store.load();
        }
    }
});
