/* -----------------------------------------------------------------------------
 Kebab Project 1.5.x (Kebab Reloaded)
 http://kebab-project.com
 Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc.
 http://www.lab2023.com

 * LICENSE
 *
 * This source file is subject to the  Dual Licensing Model that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://www.kebab-project.com/cms/licensing
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to info@lab2023.com so we can send you a copy immediately.
 ----------------------------------------------------------------------------- */

Ext.namespace(
        'KebabOS.applications.todo',
        'KebabOS.applications.todo.application',
        'KebabOS.applications.todo.application.configs',
        'KebabOS.applications.todo.application.controllers',
        'KebabOS.applications.todo.application.languages',
        'KebabOS.applications.todo.application.layouts',
        'KebabOS.applications.todo.application.models',
        'KebabOS.applications.todo.application.views',
        'KebabOS.applications.todo.library'
        );

/**
 * Kebab Application Base Class
 *
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.todo.application
 * @author      Yunus ÖZCAN <yunus.ozcan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/cms/licensing
 */
KebabOS.applications.todo.application.Bootstrap = function() {

    Ext.apply(this, {

        // Application ID
        id: 'todo-application',

        // Application Launcher Settings
        launcher: {
            iconCls: 'todo-application-launcher-icon'
        }
    });

    KebabOS.applications.todo.application.Bootstrap.superclass.constructor.call(this);
}
