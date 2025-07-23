document.getElementById('registroForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombres = document.getElementById('nombres').value.trim();
  const apellidos = document.getElementById('apellidos').value.trim();
  const rut = document.getElementById('rut').value.trim();
  const nacimiento = document.getElementById('nacimiento').value.trim();
  const taller = document.getElementById('taller').value.trim();
  const correo = document.getElementById('correo').value.trim();

  if (!nombres || !apellidos || !rut || !nacimiento || !taller || !correo) {
    alert("Todos los campos son obligatorios, excepto observaciones.");
    return;
  }

  if (!/^[0-9]{7,8}-[0-9kK]$/.test(rut)) {
    alert("El RUT debe tener el formato correcto (ej: 12345678-9 o 12345678-K).");
    return;
  }

  const [rutBody, dv] = rut.split("-");
  if (calcularDV(rutBody) !== dv.toUpperCase()) {
    alert("El dígito verificador del RUT no es válido.");
    return;
  }

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nacimiento)) {
    alert("La fecha debe tener el formato dd/mm/aaaa.");
    return;
  }

  const [dia, mes, anio] = nacimiento.split("/").map(Number);
  if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 0 || anio > 9999) {
    alert("La fecha de nacimiento no es válida.");
    return;
  }

  const edad = calcularEdad(dia, mes, anio);
  if (edad < 14) {
    alert("Debes tener al menos 14 años para postular.");
    return;
  }

  const correoRegex = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9]+$/;
  if (!correoRegex.test(correo)) {
    alert("El correo debe tener un formato válido: direccion@dominio.pais");
    return;
  }

  alert("Formulario enviado correctamente (simulado).");
});

function calcularDV(rut) {
  let suma = 0;
  let multiplo = 2;

  for (let i = rut.length - 1; i >= 0; i--) {
    suma += parseInt(rut[i]) * multiplo;
    multiplo = multiplo < 7 ? multiplo + 1 : 2;
  }

  const resto = suma % 11;
  const dv = 11 - resto;

  if (dv === 11) return "0";
  if (dv === 10) return "K";
  return dv.toString();
}

function calcularEdad(d, m, a) {
  const hoy = new Date();
  let edad = hoy.getFullYear() - a;

  if (
    hoy.getMonth() + 1 < m ||
    (hoy.getMonth() + 1 === m && hoy.getDate() < d)
  ) {
    edad--;
  }

  return edad;
}
