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
KebabOS.applications.todo.application.views.TodoGridPanel = Ext.extend(Ext.grid.EditorGridPanel, {

    // Application bootstrap
    bootstrap: null,

    initComponent: function() {

        // Create the grid data store
        this.store = new KebabOS.applications.todo.application.models.TodoGroupingDataStore({
            bootstrap:this.bootstrap
        });

        // grid base config
        var config = {
            border:false,
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

        this.addEvents('createTodo');

        KebabOS.applications.todo.application.views.TodoGridPanel.superclass.initComponent.apply(this, arguments);
    },

    /**
     * Initialize grid listeners
     */
    listeners: {
        afterRender: function(grid) {
            grid.getStore().load();
        }
    },

    /**
     * Build the grid columns
     */
    buildColumns: function() {
        
        return [{
            header: Kebab.helper.translate('ID'),
            dataIndex: 'id'
        },{
            header:  Kebab.helper.translate('Todo'),
            dataIndex: 'todo',
            editor: new Ext.form.TextField()
        },{
            header: Kebab.helper.translate('Due Date'),
            dataIndex: 'dueDate',
            editor: new Ext.form.DateField(),
            renderer: function(v) {
                return v.format('Y-d-m');
            }
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
            width: 180
        });

        var newTodoButton = {
            text: Kebab.helper.translate('Add New Todo'),
            iconCls: 'icon-add',
            handler: function() {
                this.fireEvent('addTodo');
            },
            scope: this
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
