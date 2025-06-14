const limit = 21;
let currentPage = 1;
let totalPages = 1;
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const pageInfo = document.getElementById("currentPage");

function mostrarTabla(filtrados) {
  const cuerpo = document.getElementById("contenido");
  cuerpo.innerHTML = "";
  filtrados.forEach((item) => {
    const fila = `
          <tr class="*:text-gray-900 *:first:font-medium dark:*:text-white">
            <td class="px-3 py-2 whitespace-nowrap text-center">${
              item.region || "-"
            }</td>
            <td class="px-3 py-2 whitespace-nowrap text-center">${
              item.c_digo_dane_del_departamento || "-"
            }</td>
            <td class="px-3 py-2 whitespace-nowrap text-center">${
              item.departamento || "-"
            }</td>
             <td class="px-3 py-2 whitespace-nowrap text-center">${
               item.c_digo_dane_del_municipio || "-"
             }</td>
            <td class="px-3 py-2 whitespace-nowrap text-center">${
              item.municipio || "-"
            }</td>
        </tr>`;
    cuerpo.innerHTML += fila;
  });
}

// Obtener datos de la API
const getData = (page) => {
  const offset = (page - 1) * limit;
  const url = `https://www.datos.gov.co/resource/xdk5-pm3f.json?$limit=${limit}&$offset=${offset}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      datos = data;
      mostrarTabla(datos);
      prevButton.disabled = page === 1;
      nextButton.disabled = data.length < limit;
      pageInfo.textContent = `${page}`;
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
};
getData(currentPage);

prevButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    getData(currentPage);
  }
});

nextButton.addEventListener("click", () => {
  currentPage++;
  getData(currentPage);
});
