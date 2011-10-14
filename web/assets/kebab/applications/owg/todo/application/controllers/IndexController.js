/**
 * Kebab Application Bootstrap Class
 *
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.todo.application.controllers
 * @author      Tayfun Öziş ERİKAN <tayfun.ozis.erikan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/cms/licensing
 */
KebabOS.applications.todo.application.controllers.Index = Ext.extend(Ext.util.Observable, {

    // Application bootstrap
    bootstrap: null,

    constructor: function(config) {

        // Base Config
        Ext.apply(this, config || {});

        // Call Superclass initComponent() method
        KebabOS.applications.todo.application.controllers.Index.superclass.constructor.apply(this, arguments);

        this.init();
    },

    // Initialize and define routing settings
    init: function() {
        
        this.bootstrap.layout.todoGridPanel.on('createTodo', this.showAddTodoWindowAction, this);
        this.bootstrap.layout.todoGridPanel.on('destroyTodo', this.destroyTodoAction, this);

        this.on('createTodo', this.createTodoAction, this);
    },

    // Actions -----------------------------------------------------------------

    /**
     * Create and show new window
     * @param data object
     */
    showAddTodoWindowAction: function(data) {

        var win;
        
        // create todoFormWindow instance
        if (!win) {

            win = new KebabOS.applications.todo.application.views.TodoFormWindow({
                title: Kebab.helper.translate('New Todo Item'),
                bootstrap: this.bootstrap
            }).show();
            
        } else {
            win.show();
        }

    },

    /**
     * Send todo data to server
     * @param form
     */
    createTodoAction: function(form) {

        if (form.getForm().isValid()) {

            // TodoFormWindow
            var win = form.ownerCt;

            form.getForm().submit({
                waitMsg: Kebab.helper.translate('Todo created...'),
                url: Kebab.helper.url('owg/todo'),
                method: 'POST',
                success : function() {
                    Kebab.helper.message(this.bootstrap.launcher.text, 'Operation was performed successfully');

                    // reset the form
                    form.getForm().reset();

                    // Reload the grid store
                    this.bootstrap.layout.todoGridPanel.getStore().reload();

                    // Close TodoFormWindow when records are updated or created...
                    win.close();
                },
                failure : function() {
                    Kebab.helper.message(this.bootstrap.launcher.text, 'Operation was not performed', true, 'ERR');
                },
                scope:this
            });
        }
    },

    /**
     * Delete todo record
     * @param rec
     */
    destroyTodoAction: function(rec) {

        // Confirmation
        Ext.Msg.show({
            icon: Ext.MessageBox.QUESTION,
            title: Kebab.helper.translate('Are you sure ?'),
            msg: '<strong>"' + rec.data.todo + '"</strong>' + Kebab.helper.translate(' record will be deleted.<br />Do you accept this ?'),
            buttons: Ext.Msg.YESNO,
            fn: commitChanges,
            scope:this
        });

        // Check message box status and commit changes to server.
        function commitChanges(btn) {
            if(btn == 'yes') {
                Ext.Ajax.request({
                    url: Kebab.helper.url('owg/todo'),
                    method: 'DELETE',
                    params: {id: rec.id},
                    success: function(){
                        Kebab.helper.message(this.bootstrap.launcher.text, 'Operation was performed successfully');
                        var store = this.bootstrap.layout.todoGridPanel.getStore();
                        store.remove(store.getById(rec.id));
                    },
                    failure: function(){
                        Kebab.helper.message(this.bootstrap.launcher.text, 'Operation was not performed', true, 'ERR');
                    },
                    scope:this
                });
            }
        }
    }
});
