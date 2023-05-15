"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReport = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const generator = (data) => {
    const allRows = [];
    const rowsHeader = `<div class="header">
    <span class="column">Stringer Number</span>
    <span class="column">Damage Type</span>
    <span class="column">Damage Dimensions</span>
    <span class="column">Inspector</span>
    <span class="column">Notes</span>
  </div>`;
    Object.keys(data).forEach((key) => {
        const currentItem = data[key];
        if (Array.isArray(currentItem)) {
            // Iterate through maximum 21 rows of data to paginate in print
            const rowElements = [];
            const pageMax = 21;
            for (let i = 0; i < currentItem.length / pageMax; i++) {
                for (const dataByKey of currentItem.splice(i * pageMax, pageMax)) {
                    const lineItem = ['<div class="row content-block">'];
                    Object.keys(dataByKey).forEach((dataKey) => {
                        const dataItem = dataByKey[dataKey];
                        lineItem.push('<span class="column">');
                        if (typeof dataItem === 'object') {
                            Object.keys(dataItem).forEach(iKey => {
                                if (typeof dataItem[iKey] === 'string') {
                                    lineItem.push(`<span class="cell">${dataItem[iKey]}</span>`);
                                }
                            });
                        }
                        else if (typeof dataItem === 'string') {
                            lineItem.push(dataItem);
                        }
                        lineItem.push('</span>');
                    });
                    lineItem.push('</div>');
                    rowElements.push(lineItem.join('\n'));
                }
                // Create HTML of generated rows
                const rowsClassname = ['rows'];
                if (i > 0) {
                    rowsClassname.push('rows--page-break');
                }
                const rowsElement = `<div class="${rowsClassname.join(' ')}">${rowsHeader}${rowElements}</div>`;
                allRows.push(rowsElement);
            }
        }
    });
    return allRows;
};
const createReport = (req, res) => {
    const { data } = req.body;
    const rows = generator(data);
    const dom = html(data, rows.join('\n'));
    fs_1.default.writeFile((0, path_1.dirname)('tmp/output.html'), dom, (err) => {
        if (err) {
            console.error(err);
        }
        else {
            return res.sendFile((0, path_1.dirname)('./tmp/output.html'));
        }
    });
    // const template = 
};
exports.createReport = createReport;
const html = (data, rows) => {
    return `<html>
    <head>${styles}</head>
    <body>
      <div class="grid">
        <header>
          <div class="logo">
            <img src="https://uploads-ssl.webflow.com/629fa03df5f9a77d536ecdd8/62a22ee9266e332cd4beb4b2_Rizse%20Logo%20-%20Nav%20Bar%20Shadow.png" />
          </div>
          <div class="title">
            <h2 id="title">${data.title}</h2>
            <p>
              Final approver:&nbsp;
              <strong id="finalApprover">${data.finalApprover}</strong>
            </p>
            <p>
              Final approver:&nbsp;
              <strong id="acModel">${data.acModel}</strong>
            </p>
          </div>
          <div class="details">
            <p>
              Tail Number:&nbsp;
              <strong id="tailNumber">${data.tailNumber}</strong>
            </p>
            <p>
              Report ID:&nbsp;
              <strong id="reportId">${data.reportId}</strong>
            </p>
            <p>
              Location:&nbsp;
              <strong id="location">${data.location}</strong>
            </p>
          </div>
        </header>
        <content>
          ${rows}
        </content>
        <footer>
        <div class="additional-notes">
          <strong>Additional Inspection Notes</strong>
          <p id="additionalInspectionNotes">${data.additionalInspectionNotes}</p>
        </div>
        <div class="summary">
          <div class="summary-header">
            <span class="column">Drone #</span>
            <span class="column">Inspection Date</span>
            <span class="column">Time Length</span>
            <span class="column">Report #</span>
            <span class="column">Inspector ID</span>
          </div>
          <div class="summary-details">
            <span class="column" id="droneNumber">${data.droneNumber}</span>
            <span class="column" id="inspectionDate">${data.inspectionDate}</span>
            <span class="column" id="timeLength">${data.timeLength}</span>
            <span class="column" id="reportNumber">${data.reportNumber}</span>
            <span class="column" id="inspectorId">${data.inspectorId}</span>
          </div>
        </div>
        <div></div>
        <div class="footer">
          <span class="column">&copy; <span id="current-year">${(new Date()).getFullYear()}</span> Rizse. All Rights Reserved</span>
          <span class="column">&nbsp;</span>
          <span class="column">Report generated on: <span id="current-date">${(new Date()).toLocaleDateString()}</span></span>
        </div>
      </footer>
      </div>
    </body>
  </html>`;
};
const styles = `<style>
  body {
    background-color: #1d2129;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .grid {
    /* aspect-ratio: 8.5 / 11; */
    background-color: #ffffff;
    /* box-shadow: 0 0 30px 14px rgb(0 0 0 / 14%); */
    box-sizing: border-box;
    /* margin: 2.5rem auto; */
    padding: 0;
    width: 265mm;
  }

  .grid header {
    column-gap: 3rem;
    display: grid;
    grid-template-columns: auto auto auto;
    margin-bottom: 2rem;
  }

  .grid header h2 {
    margin: 0;
  }

  .grid header p {
    margin: 0.5rem 0;
  }

  .grid header > div {
    text-align: center;
  }

  .grid header > div img {
    max-width: 90%;
  }

  .grid content {
    display: grid;
  }

  .grid content .header {
    border: 1px solid;
    font-weight: bold;
  }

  .grid content .rows {
    display: grid;
  }

  .grid content .rows--page-break {
    page-break-before: always;
  }

  .grid content .rows > div {
    display: grid;
    grid-template-columns: 3fr 3fr 6fr 3fr 5fr;
  }

  .grid content .rows .row {
    border: 1px solid;
    border-bottom: none;
    box-sizing: border-box;
  }

  .grid content .rows .row:last-child {
    border-bottom: 1px solid;
  }

  .grid .column {
    border-right: 1px solid;
    padding: 0.5rem;
  }

  .grid .column:last-child {
    border-right: none;
  }

  .grid .column .cell {
    margin-right: 0.5rem;
  }

  .grid footer {
    border: 1px solid;
    border-top: none;
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 2rem 16rem auto 2rem;
    page-break-before: always;
    width: 100%;
  }

  .grid footer .additional-notes {
    border-top: 1px solid;
    padding: 0.5rem;
  }

  .grid footer .summary {
    border: 1px solid;
    border-left: none;
    border-right: none;
    display: grid;
    grid-template-rows: 3fr 3fr;
  }

  .grid footer .summary-header {
    border-bottom: 1px solid;
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
    height: 100%;
  }

  .grid footer .summary-details {
    display: grid;
    grid-template-columns: 2fr 2fr 2fr 2fr 2fr;
  }

  .grid footer .footer {
    border-top: 1px solid;
    display: flex;
    height: 100%;
    justify-content: space-between;
  }
</style>`;
