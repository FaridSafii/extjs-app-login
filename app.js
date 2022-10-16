/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'App3.Application',

    name: 'App3',

    requires: [
        // This will automatically load all classes in the App3 namespace
        // so that application classes do not need to require each other.
        'App3.*'
    ],

    // The name of the initial view to create.
    // mainView: 'App3.view.main.Main'
});
