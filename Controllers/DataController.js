import DataModel from "../Models/DataModel.js";
import DataView from "../Views/DataView.js";

class DataController {
  constructor() {
    this.model = new DataModel();
    this.view = new DataView();

    this.init();
  }

  async init() {
    await this.loadData();
    this.setupEventListeners();
  }

  async loadData() {
    const currentPage = this.model.getCurrentPage();
    const data = await this.model.fetchData(currentPage);
    this.view.renderTable(data);
    this.view.updatePaginationControls(currentPage, this.model.hasNextPage(data));
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

    // Si tienes búsqueda, agrégala aquí
    // ...
  }
}

new DataController();