$(function () {
  showSwal = function (type, ISBN) {
    'use strict';
    if (type === 'passing-parameter-execute-cancel') {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger mr-2'
        },
        buttonsStyling: false,
      })

      swalWithBootstrapButtons.fire({
        title: '¿Estas seguro?',
        text: "¡Esta acción no se puede revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonClass: 'mr-2',
        confirmButtonText: '¡Si, eliminar!',
        cancelButtonText: '¡No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          window.ipcRender.invoke('deleteBook', ISBN).then((confirm) => {
            if (confirm == 1) {
              swalWithBootstrapButtons.fire({
                title: '¡Eliminado!',
                text: "Registro eliminado.",
                icon: 'success',
                confirmButtonClass: 'mr-2',
              }).then((result) => {
                history.go(0);
              });
            } else if (confirm == 0) {
              swalWithBootstrapButtons.fire(
                'Cancelado',
                'La información permanece segura :)',
                'error'
              );
            }
          });
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'La información permanece segura :)',
            'error'
          );
        }
      });
    }
  }
});