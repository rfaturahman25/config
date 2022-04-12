let configList = [];
let configName = "";
let configUrl = "";

function handleDelete(idx = 0) {
  delete configList[idx]
  renderConfigList()
}

function handleAddRow() {
  configList = [...configList, "="]
  renderConfigList()
}

function handleEditKey(e) {
  const idx = parseInt(e.target.id.split("-")[1])
  const key = e.target.value
  const vArr = configList[idx].split("=")
  vArr[0] = key
  configList[idx] = vArr.join("=")
  renderConfigList()
}

function handleEditValue(e) {
  const idx = parseInt(e.target.id.split("-")[1])
  const value = e.target.value
  const vArr = configList[idx].split("=")
  vArr[1] = value
  configList[idx] = vArr.join("=")
  renderConfigList()
}

function createUnsetButton(idx = 0) {
  const deleteButton = $(`<button id="delete-btn-${idx}">Unset</button>`)
  $(deleteButton).click(() => handleDelete(idx));

  const tdButton = $(`<td></td>`)
  tdButton.append(deleteButton)

  return tdButton
}

function renderConfigList() {
  const IPTablesEl = $('#iptables-body')
  $('#iptables-body tr').remove()

  let i = 0;
  configList.forEach((ip, idx) => {
    if(!ip) {
      return
    }
    const tr = $(`<tr class="ip-row"></tr>`)
    const ipArr = ip.split("=")

    const keyEl = $(`<td><input value="${ipArr[0]}" id="key-${idx}"/></td>`)
    const valueEl = $(`<td><input value="${ipArr[1].replace("\"", "")}" id="value-${idx}"/></td>`)
    const tdButtonEl = createUnsetButton(idx)

    tr.append(`<td>${i+1}</td>`)
    tr.append(keyEl)
    tr.append(valueEl)
    tr.append(tdButtonEl)

    IPTablesEl.append(tr)

    $(`#key-${idx}`).change(handleEditKey)
    $(`#value-${idx}`).change(handleEditValue)
    i++
  })
}

function loadConfigList() {
  if(!configUrl) {
    return
  }

  $.ajax({
    url: configUrl,
    success: function (response) {
      configList = response.split("\n")
      renderConfigList()
    }
  })
}

function saveFile() {
  $.ajax({
    url: window.location.origin+"/save",
    method: "POST",
    dataType: "json",
    data: {
      config: configList.join("\n"),
      filename: configName,
    },
    success: function (response) {
      alert(response.message)
    }
  })
}

function loadConfigName() {
  const params = new URLSearchParams(window.location.search)
  const file = params.get("file")
  const fileArr = file.split(".")
  if(['json', 'yaml', 'yml'].includes(fileArr[fileArr.length-1].toLowerCase())) {
    alert(`cannot load ${file}`)
    return
  }
  configName = file
  configUrl = `/assets/files/${configName}`
}

function initListener() {
  $("#save-btn").click(saveFile)
  if(configUrl) {
    $("#download-btn").attr("action", configUrl)
  }
  $("#add-btn").click(handleAddRow)
}

function init() {
  loadConfigName()
  initListener()
  loadConfigList()
}