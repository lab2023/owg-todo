/**
 * userManager Application InviteUserForm class
 *
 * @category    Kebab
 * @package     Applications
 * @namespace   KebabOS.applications.userManager.application.views
 * @author      Yunus ÖZCAN <yunus.ozcan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/cms/licensing
 */
KebabOS.applications.todo.application.views.TodoFormPanel = Ext.extend(Ext.form.FormPanel, {

    initComponent: function() {
        
        // form config
        var config = {
            labelAlign: 'top',
            defaultType: 'textfield',
            bodyStyle: 'padding:5px 10px;',
            defaults: {
                anchor: '100%'
            },
            items:[{
                fieldLabel: Kebab.helper.translate('Your todo here'),
                allowBlank: false,
                name: 'todo'
            },{
                fieldLabel: Kebab.helper.translate('Due Date'),
                name: 'dueDate',
                format: 'Y-m-d',
                xtype: 'datefield'
            }],
            buttons: [{
                text: Kebab.helper.translate('Create'),
                iconCls: 'icon-accept',
                handler : function() {
                    this.ownerCt.bootstrap.defaultController.fireEvent('createTodo', this);
                },
                scope: this
            },{
                text: Kebab.helper.translate('Cancel'),
                iconCls: 'icon-cancel',
                handler : function() {
                    this.ownerCt.close();
                },
                scope:this
            }]
        };

        Ext.apply(this, config);

        KebabOS.applications.todo.application.views.TodoFormPanel.superclass.initComponent.apply(this, arguments);
    },

    listeners: {
        afterRender: function(form) {
            if (form.ownerCt.action == 'update') {
                form.getForm().load({
                    url: Kebab.helper.url('owg/todo') + '/' + form.ownerCt.todoId,
                    method: 'GET'
                });
            }
        }
    }
});