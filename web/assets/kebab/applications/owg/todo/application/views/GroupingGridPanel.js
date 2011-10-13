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
                groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})',
                forceFit: true,
                hideGroupedColumn: true
            })
        };

        // Grid Column Model instance
        this.cm = new Ext.grid.ColumnModel({
            defaults: {
                sortable: true
            },
            columns: this.buildColumns()
        });

        this.tbar = this.buildTbar();
        this.bbar = this.buildBbar();

        Ext.apply(this, config);

        this.addEvents('addNewTodo');

        KebabOS.applications.todo.application.views.GroupingGridPanel.superclass.initComponent.apply(this, arguments);
    },

    listeners: {
        afterRender: function(grid) {
            grid.getStore().load();
        }
    },

    buildColumns: function() {
        return [{
            header: Kebab.helper.translate('ID'),
            dataIndex: 'id'
        },{
            header:  Kebab.helper.translate('Todo'),
            dataIndex: 'todo'
        },{
            header: Kebab.helper.translate('Due Date'),
            dataIndex: 'dueDate'
        },{
            header: Kebab.helper.translate('Status'),
            dataIndex: 'status'
        }];
    },

    /**
     * build BottomToolbar
     */
    buildTbar : function() {

        var searchField = new Ext.ux.form.SearchField({
            store: this.getStore(),
            emptyText: Kebab.helper.translate('Please type keyword here...'),
            width:180
        });

        var newTodoButton = {
            text: Kebab.helper.translate('Add New Todo'),
            iconCls: 'icon-add'
        };

        return [newTodoButton, '->', searchField];
    },

    /**
     * build BottomToolbar
     */
    buildBbar : function() {
        return new Kebab.library.ext.ExtendedPagingToolbar({
            store: this.getStore()
        });
    }

});
