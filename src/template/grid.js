const populateData = (data) => {
  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      let listSize = 21
      // let lastIndex = 0

      for (let i = 0; i < data[key].length / listSize; i++) {
        const rows = document.createElement('div')
        rows.classList.add('rows')
        if (i > 0) {
          rows.classList.add('rows--page-break')
        }
        const rowsHeader = document.createElement('div')
        rowsHeader.classList.add('header')
        const headers = ['Stringer Number', 'Damage Type', 'Damage Dimensions', 'Inspector', 'Notes']
        for (const name of headers) {
          const header = document.createElement('span')
          header.classList.add('column')
          header.innerText = name
          rowsHeader.appendChild(header)
        }
        rows.appendChild(rowsHeader)

        for (const [index, dataByKey] of data[key].splice(i * listSize, listSize).entries()) {
          const lineItem = document.createElement('div')
          lineItem.classList.add('row')
          lineItem.classList.add('content-block')

          Object.keys(dataByKey).forEach(datakey => {
            const dataItem = dataByKey[datakey]
            const column = document.createElement('span')
            column.classList.add('column')

            if (typeof dataItem === 'object') {
              Object.keys(dataItem).forEach(ikey => {
                const cell = document.createElement('span')
                cell.classList.add('cell')

                if (typeof dataItem[ikey] === 'string') {
                  cell.innerText = dataItem[ikey]
                  column.appendChild(cell)
                }
              })
            } else if (typeof dataItem === 'string') {
              column.innerText = dataItem
            }

            lineItem.appendChild(column)
          })
          rows.appendChild(lineItem)
          // document.getElementById(key).appendChild(lineItem)
        }

        document.querySelector('content').appendChild(rows)
      }
    }
    if (typeof data[key] === 'object') {
      return populateData(data[key])
    } else {
      if (document.getElementById(key)) document.getElementById(key).innerText = data[key]
    }
  })
}

const data = fetch('../samples/data.json').then(async result => {
  const data = await result.json()

  await populateData(data)
  await setYear()
  await setDate()
})

const setYear = () => {
  document.getElementById('current-year').innerText = (new Date()).getFullYear()
}

const setDate = () => {
  document.getElementById('current-date').innerText = (new Date()).toLocaleDateString()
}