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
    * http://www.kebab-project.com/licensing
    * If you did not receive a copy of the license and are unable to
    * obtain it through the world-wide-web, please send an email
    * to info@lab2023.com so we can send you a copy immediately.
----------------------------------------------------------------------------- */

/**
 * RESTfulGroupingDataStore extend by Ext.data.GroupingStore
 * 
 * @category    Kebab (kebab-reloaded)
 * @package     Kebab
 * @namespace   Kebab.library
 * @author      Tayfun Öziş ERİKAN <tayfun.ozis.erikan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/licensing
 */
Ext.namespace('Kebab.library.ext');
Kebab.library.ext.RESTfulGroupingDataStore = Ext.extend(Ext.data.GroupingStore, {
    
    // RESTful enable
    restful: true,    
    
    // Autoload enable
    autoLoad: false,
    
    // Autodestroy enable
    autoDestroy: true,
    
    // Remote sort enable
    remoteSort: true,
    
    // Autosave default disable
    autoSave: false,
    
    // Batch editing default enable
    batch: false,
    
    // System REST API
    restAPI: 'api/url',
    
    // Json Reader Config
    readerConfig: {            
        idProperty: 'id',
        root: 'data',
        totalProperty: 'total',
        messageProperty: 'notifications'
    },
    
    readerFields: [
        {name: 'id', type: 'int'},
        {name: 'title', type: 'string', allowBlank: false},
        {name: 'description', type: 'string'}
    ],

    groupField: 'title',
    
    sortInfo:{field:'title',direction:'ASC'},
    
    // Store Constructor
    constructor : function() {
        
        // HTTP Proxy
        this.proxy = new Ext.data.HttpProxy({
            url : Kebab.helper.url(this.restAPI)
        });
        
        // JSON Reader
        this.reader = new Ext.data.JsonReader(
            this.readerConfig, 
            this.buildReaderFields()
        );
        
        // JSON Writer
        this.writer = new Ext.data.JsonWriter({
            encode: true,
            writeAllFields: false
        });
        
        // Base Config
        var config = {
            proxy: this.proxy,
            reader: this.reader,
            writer: this.writer
        };
        
        // Merge initialConfig and base config
        Ext.apply(this, config);
        
        // Call Superclass initComponent() method
        Kebab.library.ext.RESTfulGroupingDataStore.superclass.constructor.apply(this, arguments);
    },
    
    buildReaderFields: function() {        
        return this.readerFields;
    },
    
    listeners : {
        write : function(){
            this.reload();
        }
    }
});