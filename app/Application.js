/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('App3.Application', {
    extend: 'Ext.app.Application',

    name: 'App3',

    views: [
      'App3.view.login.Login',
      'App3.view.main.Main'
    ],

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    launch: function() {

      // Storage yang mau dipake bebas bisa pake apa aja, ex: Cookies, LocalStorage, etc.
      // Kita pakenya LocalStorage.
      var masukApp;
  
      // cek di localStorage variabel PenggunaMasuk (true / false) 
      // true: gunakan tampilan Main
      // false: gunakan tampilan Login
      masukApp = localStorage.getItem("PenggunaMasuk");
      Ext.widget(masukApp ? 'app-main' : 'app-login');
  
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
