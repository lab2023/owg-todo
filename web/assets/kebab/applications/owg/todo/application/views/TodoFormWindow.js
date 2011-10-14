/**
 * userManager Application TodoFormWindow class
 *
 * @category    Kebab
 * @package     Applications
 * @namespace   KebabOS.applications.userManager.application.view
 * @author      Tayfun Öziş ERİKAN <tayfun.ozis.erikan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/cms/licensing
 */
KebabOS.applications.todo.application.views.TodoFormWindow = Ext.extend(Ext.Window, {

    // Application Bootstrap
    bootstrap: null,
    action: null,

    initComponent: function() {

        this.formPanel = new KebabOS.applications.todo.application.views.TodoFormPanel();

        var config = {
            layout:'fit',
            width:400,
            height:200,
            iconCls: 'todo-application-gui-icon',
            border:false,
            resizable: false,
            maximizable: false,
            manager: this.bootstrap.app.getDesktop().getManager(),
            constrain:true,
            modal:true,
            items:[this.formPanel]
        };

        Ext.apply(this, config);

        KebabOS.applications.todo.application.views.TodoFormWindow.superclass.initComponent.apply(this, arguments);
    }

});