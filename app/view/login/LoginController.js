Ext.define('App3.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    onLoginClick: function() {
   // mendefinisikan variabel me dengan this (this = tampilan Login)
    var me = this,
      username = me.lookup('txtuserid').getValue(),
      password = me.lookup('txtpassword').getValue();

    // tampilkan pesan loading
    Ext.MessageBox.show({
      msg: 'Harap tunggu.',
      progressText: 'Memuat...',
      width: 300,
      wait: {
        interval: 100
      },
      animateTarget: true
    });

    // Set timer lamanya menampilkan pesan loading
    me.timer = Ext.defer(function() {
      // kirim ke SERVICE PHP
      Ext.Ajax.request({
        url: 'http://localhost:8000/api/checkUser',
        method: 'post',
        params: {
          email: username,
          password: password
        },
        success: function(response) {
          me.timer = null;
          Ext.MessageBox.hide();

          var resp = Ext.decode(response.responseText, true);
          if (resp !== null) {
            if (resp.code == '200') {
              // menggunakan localstorage browser
              // PenggunaMasuk = true artinya user sudah login
              // PenggunaMasuk = false artinya user belum login / logout
              localStorage.setItem("PenggunaMasuk", true);

              // set timernya menjadi kosong
              me.timer = null;

              // sembunyikan pesan loading
              Ext.MessageBox.hide();

              // Hapus tampilan Login
              me.getView().destroy();

              // ganti dengan tampilan Main
              Ext.widget('app-main');
            } else {
              Ext.Msg.alert('Gagal login', resp.message);
            }
          } else {
            Ext.Msg.alert('Gagal login', response.responseText);
          }
        },
        failure: function(response, opts) {
          me.timer = null;
          Ext.MessageBox.hide();
          var resp = Ext.decode(response.responseText, true);
          if (resp !== null) {
            Ext.Msg.alert('Gagal login', resp.message);
          } else {
            Ext.Msg.alert(response.responseText);
          }
        }
      });

    }, 300);
  },
});
