function mostrarTabla(filtrados) {
  const cuerpo = document.getElementById("contenido");
  cuerpo.innerHTML = "";
  filtrados.forEach((item) => {
    const fila = `
          <tr class="*:text-gray-900 *:first:font-medium dark:*:text-white">
            <td class="px-3 py-2 whitespace-nowrap">${item.region || "-"}</td>
            <td class="px-3 py-2 whitespace-nowrap ">${
              item.c_digo_dane_del_departamento || "-"
            }</td>
            <td class="px-3 py-2 whitespace-nowrap">${
              item.departamento || "-"
            }</td>
             <td class="px-3 py-2 whitespace-nowrap ">${
               item.c_digo_dane_del_municipio || "-"
             }</td>
            <td class="px-3 py-2 whitespace-nowrap">${
              item.municipio || "-"
            }</td>
        </tr>`;
    cuerpo.innerHTML += fila;
  });
}

// Obtener datos de la API
fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json?$limit=20")
  .then((response) => response.json())
  .then((data) => {
    datos = data;
    console.log(datos);
    mostrarTabla(datos);
  })
  .catch((error) => {
    console.error("Error al obtener los datos:", error);
  });
