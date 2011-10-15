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
            bootstrap: this.bootstrap,
            autoSave: true
        });

        // grid base config
        var config = {
            border:false,
            trackMouseOver:true,
            stripeRows: true,
            clicksToEdit: true,
            loadMask: true,
            view: new Ext.grid.GroupingView({
                emptyText:  'Record not found...',
                groupTextTpl: '<span class="todo-status">{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})</span>',
                forceFit: true,
                showGroupName: false
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

        this.getView().getRowClass = function(rec) {
            var status = rec.get('status') ? 'active' : 'complated';
            return 'todo-' + status;
        };

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

        // Initialize grid filfers
        var filters = new Ext.ux.grid.GridFilters({
            encode: true,
            filters: [{
                type: 'string',
                dataIndex: 'todo'
            },{
                type: 'boolean',
                dataIndex: 'status'
            }]
        });

        // Add grid filter plug-in
        this.plugins = [filters];
        
        return [{
            header:  Kebab.helper.translate('Todo'),
            dataIndex: 'todo',
            filterable: true,
            width: .6,
            editor: new Ext.form.TextField()
        },{
            header: Kebab.helper.translate('Created At'),
            dataIndex: 'created_at',
            align: 'center',
            width: .1,
            renderer: function(v) {
                return v.format('Y-m-d');
            }
        },{
            header: Kebab.helper.translate('Due Date'),
            dataIndex: 'dueDate',
            align: 'center',
            width: .1,
            editor: new Ext.form.DateField({format: 'Y-m-d'}),
            renderer: function(v) {

                var today = new Date().format('Y-m-d'),
                    val =  v ? v.format('Y-m-d') : 'No due date';

                return (val == today) ? // Due data warning
                    '<span style="color:red;">' + val + '</span>' : val;
            }
        },{
            header: Kebab.helper.translate('Status'),
            dataIndex: 'status',
            filterable: true,
            width: .1,
            xtype:'checkcolumn',
            align: 'center',
            renderer: function(v) {
                var status = v ? 'Active' : 'Complated';
                return '<span class="status-check-column">' + Kebab.helper.translate(status) + '</span>';
            }
        },{
            width:.05,
            align:'center',
            xtype: 'actioncolumn',
            items: [{
                tooltip: Kebab.helper.translate('Delete this todo'),
                handler: function(grid, index, recId, o, e) {
                    var rec = grid.getStore().getAt(index);
                    this.onDestroyTodo(rec);
                },
                getClass: function(v, meta, rec) {
                    return 'icon-delete action-column';
                },
                scope:this
            }]
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
            handler: this.onCreateTodo,
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
    },

    /**
     * Fire create todo event
     */
    onCreateTodo: function() {
        this.fireEvent('createTodo');
    },

    /**
     * Fire destroy todo event
     * @param rec data
     */
    onDestroyTodo: function(rec) {
        this.fireEvent('destroyTodo', rec);
    }

});
