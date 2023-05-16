function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  // Ocultar todos los contenidos de las pestañas
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Eliminar la clase "active" de todos los enlaces de las pestañas
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Mostrar el contenido de la pestaña seleccionada y marcarla como activa
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";


}
  // pestaña 1 por defecto
  document.getElementById("Tab1").style.display = "block";
  document.getElementsByClassName("tablinks")[0].className += " active";