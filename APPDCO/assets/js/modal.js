document.addEventListener("DOMContentLoaded", function () {
        const modals = {
          socio: document.getElementById("modal-socio"),
          donativos: document.getElementById("modal-donativos"),
        };

        document
          .getElementById("btn-socio")
          .addEventListener("click", function () {
            modals.socio.style.display = "block";
          });

        document
          .getElementById("btn-donativos")
          .addEventListener("click", function () {
            modals.donativos.style.display = "block";
          });

        const closeButtons = document.querySelectorAll(".close-modal");
        closeButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            for (const key in modals) {
              modals[key].style.display = "none";
            }
          });
        });

        window.addEventListener("click", function (event) {
          for (const key in modals) {
            if (event.target === modals[key]) {
              modals[key].style.display = "none";
            }
          }
        });
      });