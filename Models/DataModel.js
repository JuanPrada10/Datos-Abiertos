class DataModel {
  constructor() {
    this.limit = 21;
    this.currentPage = 1;
    this.totalPages = 1;
    this.data = [];
    this.apiUrl = "https://www.datos.gov.co/resource/xdk5-pm3f.json";
  }

  async fetchAllData() {
    const url = `${this.apiUrl}?$limit=9999`; // todos los registros
    try {
      const response = await fetch(url);
      this.data = await response.json();
      return this.data;
    } catch (error) {
      console.error("Error al obtener todos los datos:", error);
      throw error;
    }
  }

  getLimit() {
    return this.limit;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  setCurrentPage(page) {
    this.currentPage = page;
  }

  hasNextPage(data) {
    return data.length === this.limit;
  }
}

export default DataModel;
