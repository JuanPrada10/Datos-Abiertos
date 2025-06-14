import DataModel from "../Models/DataModel.js";
import DataView from "../Views/DataView.js";

class DataController {
  constructor() {
    this.model = new DataModel();
    this.view = new DataView();

    this.searchTerm = "";
    this.allData = [];

    this.init();
  }

  async init() {
    await this.loadData();
    this.setupEventListeners();
  }

  // async loadData() {
  //   const currentPage = this.model.getCurrentPage();
  //   try {
  //     const data = await this.model.fetchData(currentPage);
  //     this.allData = data;

  //     const filteredData = this.filterData(data, this.searchTerm);
  //     this.view.renderTable(filteredData);
  //     this.view.updatePaginationControls(
  //       currentPage,
  //       this.model.hasNextPage(data)
  //     );
  //   } catch (error) {
  //     this.view.showError("No se pudo cargar la información. Intenta más tarde.");
  //   }
  // }

  async loadData() {
  try {
    if (this.allData.length === 0) {
      this.allData = await this.model.fetchAllData();
    }

    const filteredData = this.filterData(this.allData, this.searchTerm);

    const start = (this.model.getCurrentPage() - 1) * this.model.limit;
    const end = start + this.model.limit;
    const paginatedData = filteredData.slice(start, end);

    this.view.renderTable(paginatedData);
    this.view.updatePaginationControls(
      this.model.getCurrentPage(),
      end < filteredData.length
    );
  } catch (error) {
    this.view.showError("No se pudo cargar la información.");
  }
}

    setupEventListeners() {
    this.view.prevButton.addEventListener("click", async () => {
      if (this.model.getCurrentPage() > 1) {
        this.model.setCurrentPage(this.model.getCurrentPage() - 1);
        await this.loadData();
      }
    });

    this.view.nextButton.addEventListener("click", async () => {
      this.model.setCurrentPage(this.model.getCurrentPage() + 1);
      await this.loadData();
    });

    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.addEventListener("input", async () => {
        this.searchTerm = searchInput.value;
        this.model.setCurrentPage(1); // Reinicia a la primera página
        await this.loadData();
      });
    }
  }

  // setupEventListeners() {
  //   this.view.prevButton.addEventListener("click", async () => {
  //     if (this.model.getCurrentPage() > 1) {
  //       this.model.setCurrentPage(this.model.getCurrentPage() - 1);
  //       await this.loadData();
  //     }
  //   });

  //   this.view.nextButton.addEventListener("click", async () => {
  //     this.model.setCurrentPage(this.model.getCurrentPage() + 1);
  //     await this.loadData();
  //   });

  //   // Filtro en vivo por municipio o departamento
  //   const searchInput = document.getElementById("searchInput");
  //   if (searchInput) {
  //     searchInput.addEventListener("input", () => {
  //       this.searchTerm = searchInput.value;
  //       const filtered = this.filterData(this.allData, this.searchTerm);
  //       this.view.renderTable(filtered);
  //     });
  //   }
  // }

  filterData(data, term) {
    if (!term) return data;

    const termLower = term.toLowerCase();

    return data.filter((item) =>
      (item.municipio && item.municipio.toLowerCase().includes(termLower)) ||
      (item.departamento && item.departamento.toLowerCase().includes(termLower))
    );
  }
}

new DataController();
