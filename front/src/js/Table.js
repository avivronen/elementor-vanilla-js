class Table {

    headers = [];
    values  = [];
    tableHTML = '';

    constructor(headers, values) {
        this.headers = headers;
        this.values = values;
        this._buildTable();
    }

    _buildTable() {
        this.tableHTML += `<table><thead><tr>`;
        this.headers.forEach((header) => {
            this.tableHTML += `<th>${header}</th>`;
        })
        this.tableHTML += `</tr></thead>`;

        this.values.forEach((row) => {
           this.tableHTML += `<tr>`;
           row.forEach((value) => {
               this.tableHTML += `<td>${value}</td>`;
           });
           this.tableHTML += `</tr>`;
        });

        this.tableHTML += `</tbody></table>`;
    }
}

export default Table;