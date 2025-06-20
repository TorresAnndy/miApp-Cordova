const API_URL = "https://crudcrud.com/api/edd09593e318424e92bf9d0d19096544/usuarios";

// Tabs
$(".tab").click(function () {
  $(".tab").removeClass("active");
  $(this).addClass("active");

  $(".panel").removeClass("active");
  $($(this).data("target")).addClass("active");

  if ($(this).data("target") === "#lista") {
    cargarUsuarios();
  }
});

// Crear usuario
$("#guardar").click(function () {
  const usuario = {
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    edad: $("#edad").val(),
    email: $("#email").val()
  };

  $.ajax({
    url: API_URL,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify(usuario),
    success: function () {
      alert("Usuario registrado");
      $("#nombre, #apellido, #edad, #email").val("");
    }
  });
});

// Leer usuarios
function cargarUsuarios() {
  $.ajax({
    url: API_URL,
    method: "GET",
    success: function (data) {
      $("#result").html("");
      data.forEach(function (u) {
        $("#result").append(`
          <div class="usuario">
            <strong>${u.nombre} ${u.apellido}</strong><br>
            Edad: ${u.edad}<br>
            Email: ${u.email}<br>
            <button onclick="eliminarUsuario('${u._id}')">Eliminar</button>
          </div>
        `);
      });
    }
  });
}

// Eliminar usuario
function eliminarUsuario(id) {
  $.ajax({
    url: API_URL + "/" + id,
    method: "DELETE",
    success: function () {
      alert("Usuario eliminado");
      cargarUsuarios();
    }
  });
}

document.addEventListener("deviceready", () => {
  // puedes precargar usuarios si quieres
});
