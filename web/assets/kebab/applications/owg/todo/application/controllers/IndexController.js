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
        
        this.bootstrap.layout.todoGridPanel.on('addTodo', this.showAddTodoWindowAction, this);
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
                title: Kebab.helper.translate('Add new todo item'),
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
                url: Kebab.helper.url('owg/todo'),
                method: 'POST',
                success : function() {
                    Kebab.helper.message(this.bootstrap.launcher.text, 'Success');

                    // reset the form
                    form.getForm().reset();

                    // Reload the grid store
                    this.bootstrap.layout.todoGridPanel.getStore().reload();

                    // Close TodoFormWindow when records are updated or created...
                    win.close();
                },
                failure : function() {
                    Kebab.helper.message(this.bootstrap.launcher.text, 'Failure', true);
                },
                scope:this
            });
        }
    }
});
