import DataModel from "../Models/DataModel.js";
import DataView from "../Views/DataView.js";

class DataController {
  constructor() {
    this.model = new DataModel();
    this.view = new DataView();

    this.selectedMunicipio = "";
    this.selectedDepartment = "";
    this.selectedRegion = "";
    this.allData = [];

    this.init();
  }

  async init() {
    await this.loadData();
    this.setupEventListeners();
  }

  // async loadData() {
  //   try {
  //     if (this.allData.length === 0) {
  //       this.allData = await this.model.fetchAllData();
  //       this.populateDepartments(this.allData);
  //       this.populateRegions(this.allData);
  //     }

  //     const filteredData = this.filterData(
  //       this.allData,
  //       this.searchTerm,
  //       this.selectedDepartment,
  //       this.selectedRegion
  //     );

  //     const start = (this.model.getCurrentPage() - 1) * this.model.getLimit();
  //     const end = start + this.model.getLimit();
  //     const paginatedData = filteredData.slice(start, end);

  //     this.view.renderTable(paginatedData);
  //     this.view.updatePaginationControls(
  //       this.model.getCurrentPage(),
  //       end < filteredData.length
  //     );
  //   } catch (error) {
  //     this.view.showError("No se pudo cargar la información.");
  //   }
  // }

  async loadData() {
  try {
    if (this.allData.length === 0) {
      this.allData = await this.model.fetchAllData();
      this.populateDepartments(this.allData);
      this.populateRegions(this.allData);
      this.populateMunicipios(this.allData); // 👈 aquí
    }


    const filteredData = this.filterData(
      this.allData,
      this.selectedMunicipio,
      this.selectedDepartment,
      this.selectedRegion
    );


    console.log("Filtrados:", filteredData); // 👈 Agrega esto

    const start = (this.model.getCurrentPage() - 1) * this.model.getLimit();
    const end = start + this.model.getLimit();
    const paginatedData = filteredData.slice(start, end);

    console.log("Paginados:", paginatedData); // 👈 Y esto

    this.view.renderTable(paginatedData);
    this.view.updatePaginationControls(
      this.model.getCurrentPage(),
      end < filteredData.length
    );
  } catch (error) {
    console.error("ERROR:", error); // 👈 ¿sale algo aquí?
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

    const municipioSelect = document.getElementById("municipioSelect");
    if (municipioSelect) {
      municipioSelect.addEventListener("change", async () => {
        this.selectedMunicipio = municipioSelect.value;
        this.model.setCurrentPage(1);
        await this.loadData();
      });
    }


    const departmentSelect = document.getElementById("departmentSelect");
    if (departmentSelect) {
      departmentSelect.addEventListener("change", async () => {
        this.selectedDepartment = departmentSelect.value;
        this.model.setCurrentPage(1);
        await this.loadData();
      });
    }

    const regionSelect = document.getElementById("regionSelect");
    if (regionSelect) {
      regionSelect.addEventListener("change", async () => {
        this.selectedRegion = regionSelect.value;
        this.model.setCurrentPage(1);
        await this.loadData();
      });
    }

    const clearBtn = document.getElementById("clearFilters");
    if (clearBtn) {
      clearBtn.addEventListener("click", async () => {
        this.selectedMunicipio = "";
        this.selectedDepartment = "";
        this.selectedRegion = "";

        document.getElementById("municipioSelect").value = "";
        document.getElementById("departmentSelect").value = "";
        document.getElementById("regionSelect").value = "";

        this.model.setCurrentPage(1);
        await this.loadData();
      });
    }
  }

  filterData(data, municipio, departamento, region) {
    return data.filter((item) => {
      const matchesMunicipio =
        !municipio || (item.municipio && item.municipio === municipio);

      const matchesDepartment =
        !departamento || (item.departamento && item.departamento === departamento);

      const matchesRegion =
        !region || (item.region && item.region === region);

      return matchesMunicipio && matchesDepartment && matchesRegion;
    });
  }


  populateMunicipios(data) {
  const select = document.getElementById("municipioSelect");
  const municipios = [...new Set(data.map((d) => d.municipio).filter(Boolean))].sort();

  municipios.forEach((municipio) => {
    const option = document.createElement("option");
    option.value = municipio;
    option.textContent = municipio;
    select.appendChild(option);
  });
}


  populateDepartments(data) {
    const select = document.getElementById("departmentSelect");
    const values = [...new Set(data.map((d) => d.departamento).filter(Boolean))].sort();

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }

  populateRegions(data) {
    const select = document.getElementById("regionSelect");
    const values = [...new Set(data.map((d) => d.region).filter(Boolean))].sort();

    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });
  }
}

new DataController();
