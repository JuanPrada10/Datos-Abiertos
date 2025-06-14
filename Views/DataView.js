class DataView {
  constructor() {
    this.tableBody = document.getElementById("contenido");
    this.prevButton = document.getElementById("prev");
    this.nextButton = document.getElementById("next");
    this.pageInfo = document.getElementById("currentPage");
  }

  renderTable(data) {
    this.tableBody.innerHTML = "";
    if (!data || data.length === 0) {
      this.tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-gray-500 py-4">No hay datos para mostrar</td>
        </tr>
      `;
      return;
    }
    data.forEach((item) => {
      const row = `
        <tr class="*:text-gray-900 *:first:font-medium dark:*:text-white">
          <td class="px-3 py-2 whitespace-nowrap text-center">${item.region || "-"}</td>
          <td class="px-3 py-2 whitespace-nowrap text-center">${item.c_digo_dane_del_departamento || "-"}</td>
          <td class="px-3 py-2 whitespace-nowrap text-center">${item.departamento || "-"}</td>
          <td class="px-3 py-2 whitespace-nowrap text-center">${item.c_digo_dane_del_municipio || "-"}</td>
          <td class="px-3 py-2 whitespace-nowrap text-center">${item.municipio || "-"}</td>
        </tr>`;
      this.tableBody.innerHTML += row;
    });
  }

  updatePaginationControls(currentPage, hasNextPage) {
    this.prevButton.disabled = currentPage === 1;
    this.nextButton.disabled = !hasNextPage;
    this.pageInfo.textContent = currentPage;
  }
}

export default DataView;

