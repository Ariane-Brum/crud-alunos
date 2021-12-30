const DataTable = {
  arrayDataTable: [
    {
      nome: "João",
      telefone: "99999-9999",
      dataNasc: "29/03/1989",
      nota1: 6,
      nota2: 7,
      nota3: 8,
    },
  ],
  addData(dado) {
    DataTable.arrayDataTable.push(dado);

    App.reload();
  },

  removeData(index) {
    DataTable.arrayDataTable.splice(index, 1);
    App.reload();
  },
};

const myDOM = {
  dataTableContainer: document.querySelector("#table-aluno tbody"),
  addDataTable(dado, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = myDOM.innerHTMLDataTable(dado, index);
    tr.dataset.index = index;

    myDOM.dataTableContainer.appendChild(tr);
  },

  innerHTMLDataTable(dado, index) {
    let media = `${((dado.nota1 + dado.nota2 + dado.nota3) / 3).toFixed(1)}`;
    const CSSclass = media >= 5 ? "aprovado" : "reprovado";

    const html = ` 
    
    <td class="nome">${dado.nome}</td>
    <td class="tel">${dado.telefone}</td>
    <td class="dtNascimento">${dado.dataNasc}</td>
    <td id="media" class=${CSSclass}>${media}</td>

    <td>
      <button aria-label="Remover Aluno" type="button" onclick="DataTable.removeData(${index})">
        <i class="fas fa-trash-alt"></i>
      </button>
    </td>
  `;

    return html;
  },

  clearData() {
    myDOM.dataTableContainer.innerHTML = "";
  },
};

const Utils = {
  formatNumberField(value) {
    value = Number(value.replace(/\,\./g, ""));
    return value;
  },

  formatDateField(date) {
    const splittedDate = date.split("-");
    return `${splittedDate[2]}/ ${splittedDate[1]}/ ${splittedDate[0]}`;
  },

  formatTelField(tel) {
    const currentText = tel;
    let newText = currentText.replace(/\-/g, "");
    const isCel = currentText.length === 9;
    if (isCel) {
      const parte1 = currentText.slice(0, 5);
      const parte2 = currentText.slice(5, 9);
      newText = `${parte1}-${parte2}`;
    } else {
      const parte1 = currentText.slice(0, 4);
      const parte2 = currentText.slice(4, 8);
      newText = `${parte1}-${parte2}`;
    }

    return newText;
  },
};

const Form = {
  nome: document.querySelector("input#nome"),
  telefone: document.querySelector("input#telefone"),
  dataNasc: document.querySelector("input#dataNasc"),
  nota1: document.querySelector("input#nota1"),
  nota2: document.querySelector("input#nota2"),
  nota3: document.querySelector("input#nota3"),

  getValues() {
    return {
      nome: Form.nome.value,
      telefone: Form.telefone.value,
      dataNasc: Form.dataNasc.value,
      nota1: Form.nota1.value,
      nota2: Form.nota2.value,
      nota3: Form.nota3.value,
    };
  },

  validateFields() {
    const { nome, telefone, dataNasc, nota1, nota2, nota3 } = Form.getValues();

    if (
      nome.trim() === "" ||
      telefone.trim() === "" ||
      dataNasc.trim() === "" ||
      nota1.trim() === "" ||
      nota2.trim() === "" ||
      nota3.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos.");
    } else {
      alert("Aluno cadastrado com sucesso!");
    }
  },

  formatValues() {
    let { nome, telefone, dataNasc, nota1, nota2, nota3 } = Form.getValues();
    nota1 = Utils.formatNumberField(nota1);
    nota2 = Utils.formatNumberField(nota2);
    nota3 = Utils.formatNumberField(nota3);
    dataNasc = Utils.formatDateField(dataNasc);
    telefone = Utils.formatTelField(telefone);

    return {
      nome,
      telefone,
      dataNasc,
      nota1,
      nota2,
      nota3,
    };
  },

  clearFields() {
    Form.nome.value = "";
    Form.telefone.value = "";
    Form.dataNasc.value = "";
    Form.nota1.value = "";
    Form.nota2.value = "";
    Form.nota3.value = "";
  },

  submit(event) {
    event.preventDefault();

    try {
      Form.validateFields();
      const arrayDataTable = Form.formatValues();
      // salvar
      DataTable.addData(arrayDataTable);
      Form.clearFields();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    DataTable.arrayDataTable.forEach((dado, index) => {
      myDOM.addDataTable(dado, index);
    });
  },
  reload() {
    myDOM.clearData();
    App.init();
  },
};

App.init();
