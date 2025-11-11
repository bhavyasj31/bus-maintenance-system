// ---------- Driver Data ----------
let drivers = [
  { name: "Ramesh Babu P.", route: "Kakinada", bus: 1 },
  { name: "Srinivas Rao K.", route: "Sarpavaram", bus: 2 },
  { name: "Venkatesh Goud M.", route: "Vakalapudi", bus: 3 },
  { name: "Siva Prasad T.", route: "ADB", bus: 4 },
  { name: "Rajendra Kumar D.", route: "Sarpavaram Junction", bus: 5 },
  { name: "Anil Kumar Y.", route: "Achampeta", bus: 6 },
  { name: "Subba Rao N.", route: "Achampeta Junction", bus: 7 },
  { name: "Krishna Murthy V.", route: "Vemagiri", bus: 8 },
  { name: "Narayana Reddy C.", route: "Rajanagaram", bus: 9 },
  { name: "Gopal Krishna S.", route: "Morampudi", bus: 10 },
  // ... continue with all 85 entries
];

// ---------- Render Driver Table ----------
function renderDriverTable() {
  const tbody = document.querySelector('#driver-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  drivers.forEach(d => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${d.name}</td><td>${d.route}</td><td>${d.bus}</td>`;
    tbody.appendChild(tr);
  });
}

// ---------- Add Driver ----------
function addDriver() {
  const name = prompt("Driver Name:");
  const route = prompt("Route Location:");
  const bus = prompt("Bus Number:");
  if (name && route && bus) {
    drivers.push({ name, route, bus: parseInt(bus) });
    renderDriverTable();
  }
}

// ---------- Upload CSV ----------
document.getElementById('driver-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, index) => {
      if (index === 0) return; // skip header
      const [name, route, bus] = line.split(',');
      if (name && route && bus) {
        drivers.push({ name: name.trim(), route: route.trim(), bus: parseInt(bus.trim()) });
      }
    });
    renderDriverTable();
  };
  reader.readAsText(file);
});
document.getElementById('driver-xlsx-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const { name, route, bus } = row;
      if (name && route && bus) {
        drivers.push({ name: name.trim(), route: route.trim(), bus: parseInt(bus) });
      }
    });

    renderDriverTable();
  };
  reader.readAsArrayBuffer(file);
});
// ---------- Search Filter ----------
document.getElementById('driver-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const rows = document.querySelectorAll('#driver-table tbody tr');
  rows.forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

// ---------- Export CSV ----------
function exportDrivers() {
  const rows = [['Name', 'Route', 'Bus No']];
  drivers.forEach(d => rows.push([d.name, d.route, d.bus]));
  const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'drivers.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
// ---------- Export Drivers XLSX ----------
function exportDriversXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(drivers);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Drivers");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "drivers.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}



// ---------- Initial Render ----------
renderDriverTable();
// ---------- Fuel ----------
fuelData = [
  { bus: "Bus 1", type: "Diesel", mileage: 5.6, refill: "2025-11-01" },
  { bus: "Bus 2", type: "Petrol", mileage: 6.2, refill: "2025-11-03" },
  { bus: "Bus 3", type: "Diesel", mileage: 4.9, refill: "2025-11-05" },
  { bus: "Bus 4", type: "Petrol", mileage: 7.1, refill: "2025-11-07" },
  { bus: "Bus 5", type: "Diesel", mileage: 5.3, refill: "2025-11-09" }
];


function renderFuel() {
  const tbody = document.querySelector('#fuel-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  fuelData.forEach(f => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${f.bus}</td><td>${f.type}</td><td>${f.mileage}</td><td>${f.refill}</td>`;
    tbody.appendChild(tr);
  });
}

function addFuel() {
  const bus = prompt("Bus No:");
  const type = prompt("Fuel Type:");
  const mileage = prompt("Avg Mileage:");
  const refill = prompt("Last Refill Date:");
  if (bus && type && mileage && refill) {
    fuelData.push({ bus, type, mileage: parseFloat(mileage), refill });
    renderFuel();
  }
}

function exportFuel() {
  const rows = [['Bus No', 'Fuel Type', 'Avg Mileage', 'Last Refill']];
  fuelData.forEach(f => rows.push([f.bus, f.type, f.mileage, f.refill]));
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'fuel.csv';
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

document.getElementById('fuel-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#fuel-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});
document.getElementById('fuel-xlsx-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const { bus, type, mileage, refill } = row;
      if (bus && type && mileage && refill) {
        fuelData.push({ bus: bus.trim(), type: type.trim(), mileage: parseFloat(mileage), refill: refill.trim() });
      }
    });

    renderFuel();
  };
  reader.readAsArrayBuffer(file);
});
// ---------- Export Fuel XLSX ----------
function exportFuelXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(fuelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Fuel");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fuel.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}



document.getElementById('fuel-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, i) => {
      if (i === 0) return;
      const [bus, type, mileage, refill] = line.split(',');
      if (bus && type && mileage && refill) {
        fuelData.push({ bus: bus.trim(), type: type.trim(), mileage: parseFloat(mileage), refill: refill.trim() });
      }
    });
    renderFuel();
  };
  reader.readAsText(file);
});
renderFuel();

// ---------- Inventory ----------
let inventoryData = [
  { part: "Brake Pad A", stock: 25, reorder: 10, vendor: "AutoZone", contact: "+91-9000123456" },
  { part: "Oil Filter B", stock: 40, reorder: 15, vendor: "SpareMart", contact: "+91-9000789123" },
  { part: "Fan Belt C", stock: 18, reorder: 8, vendor: "PartsHub", contact: "+91-9000456789" },
  { part: "Battery D", stock: 12, reorder: 5, vendor: "PowerParts", contact: "+91-9000987654" },
  { part: "Coolant E", stock: 30, reorder: 12, vendor: "EngineCare", contact: "+91-9000654321" }
];
function renderInventoryTable() {
  const tbody = document.querySelector('#inventory-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  inventoryData.forEach(i => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${i.part}</td><td>${i.stock}</td><td>${i.reorder}</td><td>${i.vendor}</td><td>${i.contact}</td>`;
    tbody.appendChild(tr);
  });
}

function addInventory() {
  const part = prompt("Part Name:");
  const stock = prompt("Stock Quantity:");
  const reorder = prompt("Reorder Level:");
  const vendor = prompt("Vendor Name:");
  const contact = prompt("Vendor Contact:");
  if (part && stock && reorder && vendor && contact) {
    inventoryData.push({ part, stock: parseInt(stock), reorder: parseInt(reorder), vendor, contact });
    renderInventoryTable();
  }
}
// ---------- Export Inventory XLSX ----------
function exportInventoryXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(inventoryData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "inventory.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
document.getElementById('inventory-xlsx-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const { part, stock, reorder, vendor, contact } = row;
      if (part && stock && reorder && vendor && contact) {
        inventoryData.push({
          part: part.trim(),
          stock: parseInt(stock),
          reorder: parseInt(reorder),
          vendor: vendor.trim(),
          contact: contact.trim()
        });
      }
    });

    renderInventoryTable();
  };
  reader.readAsArrayBuffer(file);
});

function exportInventory() {
  const rows = [['Part', 'Stock', 'Reorder Level', 'Vendor', 'Contact']];
  inventoryData.forEach(i => rows.push([i.part, i.stock, i.reorder, i.vendor, i.contact]));
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'inventory.csv';
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

document.getElementById('inventory-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#inventory-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

document.getElementById('inventory-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, i) => {
      if (i === 0) return; // skip header
      const [part, stock, reorder, vendor, contact] = line.split(',');
      if (part && stock && reorder && vendor && contact) {
        inventoryData.push({
          part: part.trim(),
          stock: parseInt(stock.trim()),
          reorder: parseInt(reorder.trim()),
          vendor: vendor.trim(),
          contact: contact.trim()
        });
      }
    });
    renderInventoryTable();
  };
  reader.readAsText(file);
});
renderInventoryTable();
// ---------- Sample Bus Data ----------
let busData = [
  { busNo: "Bus 1", route: "Kakinada", capacity: 45, model: "Ashok Leyland", fuelType: "Diesel", status: "Active" },
  { busNo: "Bus 2", route: "Rajanagaram", capacity: 40, model: "Tata", fuelType: "Petrol", status: "Inactive" },
  { busNo: "Bus 3", route: "Morampudi", capacity: 50, model: "Eicher", fuelType: "Diesel", status: "Active" },
  { busNo: "Bus 4", route: "Dowleswaram", capacity: 42, model: "Volvo", fuelType: "Petrol", status: "Active" },
  { busNo: "Bus 5", route: "Mandapeta", capacity: 48, model: "Ashok Leyland", fuelType: "Diesel", status: "Inactive" }
];

// ---------- Render Bus Table ----------
function renderBusTable() {
  const tbody = document.querySelector('#bus-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  busData.forEach(bus => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${bus.busNo}</td>
      <td>${bus.route}</td>
      <td>${bus.capacity}</td>
      <td>${bus.model}</td>
      <td>${bus.fuelType}</td>
      <td>${bus.status}</td>
    `;
    tbody.appendChild(tr);
  });
}
renderBusTable();

// ---------- Add Bus ----------
function addBus() {
  const busNo = prompt("Bus Number:");
  const route = prompt("Route:");
  const capacity = prompt("Capacity:");
  const model = prompt("Model:");
  const fuelType = prompt("Fuel Type:");
  const status = prompt("Status:");
  if (busNo && route && capacity && model && fuelType && status) {
    busData.push({
      busNo: busNo.trim(),
      route: route.trim(),
      capacity: parseInt(capacity),
      model: model.trim(),
      fuelType: fuelType.trim(),
      status: status.trim()
    });
    renderBusTable();
  }
}

// ---------- Search Filter ----------
document.getElementById('bus-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#bus-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

// ---------- Export CSV ----------
function exportBusCSV() {
  const rows = [['Bus No', 'Route', 'Capacity', 'Model', 'Fuel Type', 'Status']];
  busData.forEach(bus => {
    rows.push([bus.busNo, bus.route, bus.capacity, bus.model, bus.fuelType, bus.status]);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bus_details.csv';
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---------- Export XLSX ----------
function exportBusXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(busData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Bus Details");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bus_details.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---------- Upload CSV ----------
document.getElementById('bus-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, index) => {
      if (index === 0) return; // skip header
      const [busNo, route, capacity, model, fuelType, status] = line.split(',');
      if (busNo && route && capacity && model && fuelType && status) {
        busData.push({
          busNo: busNo.trim(),
          route: route.trim(),
          capacity: parseInt(capacity.trim()),
          model: model.trim(),
          fuelType: fuelType.trim(),
          status: status.trim()
        });
      }
    });
    renderBusTable();
  };
  reader.readAsText(file);
});
// ---------- Upload XLSX ----------
document.getElementById('bus-xlsx-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const { busNo, route, capacity, model, fuelType, status } = row;
      if (busNo && route && capacity && model && fuelType && status) {
        busData.push({
          busNo: busNo.trim(),
          route: route.trim(),
          capacity: parseInt(capacity),
          model: model.trim(),
          fuelType: fuelType.trim(),
          status: status.trim()
        });
      }
    });

    renderBusTable();
  };

  reader.readAsArrayBuffer(file);
});
renderBusTable();
// ---------- Maintenance & Repair ----------
let repairData = [
  { bus: "Bus 1", date: "2025-10-15", work: "Oil Change", parts: "Oil Kit", center: "Service Center A", bill: 1200 },
  { bus: "Bus 2", date: "2025-10-18", work: "Brake Check", parts: "Brake Pad", center: "Service Center B", bill: 950 },
  { bus: "Bus 3", date: "2025-10-20", work: "Tyre Replacement", parts: "Tyre Set", center: "Service Center C", bill: 3200 },
  { bus: "Bus 4", date: "2025-10-22", work: "Battery Service", parts: "Battery Unit", center: "Service Center D", bill: 1800 },
  { bus: "Bus 5", date: "2025-10-25", work: "Coolant Flush", parts: "Coolant Pack", center: "Service Center E", bill: 1100 }
];

function renderRepairTable() {
  const tbody = document.querySelector('#repairs-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  repairData.forEach(r => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.bus}</td><td>${r.date}</td><td>${r.work}</td><td>${r.parts}</td><td>${r.center}</td><td>${r.bill}</td>`;
    tbody.appendChild(tr);
  });
}

function addRepair() {
  const bus = prompt("Bus No:");
  const date = prompt("Repair Date:");
  const work = prompt("Work Done:");
  const parts = prompt("Parts Used:");
  const center = prompt("Service Center:");
  const bill = prompt("Bill Amount:");
  if (bus && date && work && parts && center && bill) {
    repairData.push({
      bus: bus.trim(),
      date: date.trim(),
      work: work.trim(),
      parts: parts.trim(),
      center: center.trim(),
      bill: parseFloat(bill)
    });
    renderRepairTable();
  }
}
document.getElementById('maintenance-xlsx-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const { bus, date, work, parts, center, bill } = row;
      if (bus && date && work && parts && center && bill) {
        repairData.push({
          bus: bus.trim(),
          date: date.trim(),
          work: work.trim(),
          parts: parts.trim(),
          center: center.trim(),
          bill: parseFloat(bill)
        });
      }
    });

    renderRepairTable();
  };
  reader.readAsArrayBuffer(file);
});
// ---------- Export Maintenance XLSX ----------
function exportRepairsXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(repairData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Repairs");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "repairs.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}


document.getElementById('repair-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, index) => {
      if (index === 0) return;
      const [bus, date, work, parts, center, bill] = line.split(',');
      if (bus && date && work && parts && center && bill) {
        repairData.push({
          bus: bus.trim(),
          date: date.trim(),
          work: work.trim(),
          parts: parts.trim(),
          center: center.trim(),
          bill: parseFloat(bill.trim())
        });
      }
    });
    renderRepairTable();
  };
  reader.readAsText(file);
});

document.getElementById('repair-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#repairs-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

function exportRepairs() {
  const rows = [['Bus', 'Date', 'Work', 'Parts', 'Center', 'Bill']];
  repairData.forEach(r => {
    rows.push([r.bus, r.date, r.work, r.parts, r.center, r.bill]);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'repairs.csv';
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

renderRepairTable();

// ---------- Logbook ----------
let logbookData = [
  { date: "2025-11-01", bus: "Bus 1", route: "Kakinada", start: "06:00", end: "10:00", km: 45, fuel: 6.2 },
  { date: "2025-11-02", bus: "Bus 2", route: "Rajanagaram", start: "07:00", end: "11:00", km: 52, fuel: 7.1 },
  { date: "2025-11-03", bus: "Bus 3", route: "Morampudi", start: "06:30", end: "10:30", km: 48, fuel: 5.8 },
  { date: "2025-11-04", bus: "Bus 4", route: "Dowleswaram", start: "07:15", end: "11:15", km: 50, fuel: 6.5 },
  { date: "2025-11-05", bus: "Bus 5", route: "Mandapeta", start: "06:45", end: "10:45", km: 47, fuel: 6.0 }
];

function renderLogbookTable() {
  const tbody = document.querySelector('#logbook-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  logbookData.forEach(entry => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${entry.date}</td><td>${entry.bus}</td><td>${entry.route}</td><td>${entry.start}</td><td>${entry.end}</td><td>${entry.km}</td><td>${entry.fuel}</td>`;
    tbody.appendChild(tr);
  });
}

function addLog() {
  const date = prompt("Date:");
  const bus = prompt("Bus:");
  const route = prompt("Route:");
  const start = prompt("Start Time:");
  const end = prompt("End Time:");
  const km = prompt("Kilometers:");
  const fuel = prompt("Fuel Used:");
  if (date && bus && route && start && end && km && fuel) {
    logbookData.push({
      date: date.trim(),
      bus: bus.trim(),
      route: route.trim(),
      start: start.trim(),
      end: end.trim(),
      km: parseFloat(km),
      fuel: parseFloat(fuel)
    });
    renderLogbookTable();
  }
}
document.getElementById('logbook-xlsx-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const { date, bus, route, start, end, km, fuel } = row;
      if (date && bus && route && start && end && km && fuel) {
        logbookData.push({
          date: date.trim(),
          bus: bus.trim(),
          route: route.trim(),
          start: start.trim(),
          end: end.trim(),
          km: parseFloat(km),
          fuel: parseFloat(fuel)
        });
      }
    });

    renderLogbookTable();
  };
  reader.readAsArrayBuffer(file);
});
// ---------- Export Logbook XLSX ----------
function exportLogbookXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(logbookData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Logbook");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "logbook.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}


document.getElementById('logbook-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, index) => {
      if (index === 0) return;
      const [date, bus, route, start, end, km, fuel] = line.split(',');
      if (date && bus && route && start && end && km && fuel) {
        logbookData.push({
          date: date.trim(),
          bus: bus.trim(),
          route: route.trim(),
          start: start.trim(),
          end: end.trim(),
          km: parseFloat(km.trim()),
          fuel: parseFloat(fuel.trim())
        });
      }
    });
    renderLogbookTable();
  };
  reader.readAsText(file);
});

document.getElementById('logbook-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#logbook-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

function exportLogbook() {
  const rows = [['Date', 'Bus', 'Route', 'Start', 'End', 'KM', 'Fuel']];
  logbookData.forEach(entry => {
    rows.push([entry.date, entry.bus, entry.route, entry.start, entry.end, entry.km, entry.fuel]);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
  a.href = url;
  a.download = 'logbook.csv';
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

renderLogbookTable();
let safetyData = [
  { bus: "Bus 1", insurance: "2026-01-15", fitness: "2026-06-15", status: "Valid" },
  { bus: "Bus 2", insurance: "2025-12-20", fitness: "2026-05-20", status: "Expired" },
  { bus: "Bus 3", insurance: "2026-02-10", fitness: "2026-07-10", status: "Valid" },
  { bus: "Bus 4", insurance: "2025-11-30", fitness: "2026-04-30", status: "Expired" },
  { bus: "Bus 5", insurance: "2026-03-05", fitness: "2026-08-05", status: "Valid" }
];

function renderSafetyTable() {
  const tbody = document.querySelector('#safety-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  safetyData.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.bus}</td>
      <td>${s.insurance}</td>
      <td>${s.fitness}</td>
      <td>${s.status}</td>
    `;
    tbody.appendChild(tr);
  });
}

function addSafety() {
  const bus = prompt("Bus No:");
  const insurance = prompt("Insurance Validity:");
  const fitness = prompt("Fitness Certificate:");
  const status = prompt("Status:");
  if (bus && insurance && fitness && status) {
    safetyData.push({
      bus: bus.trim(),
      insurance: insurance.trim(),
      fitness: fitness.trim(),
      status: status.trim()
    });
    renderSafetyTable();
  }
}
document.getElementById('safety-xlsx-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet);

    rows.forEach(row => {
      const { bus, insurance, fitness, status } = row;
      if (bus && insurance && fitness && status) {
        safetyData.push({
          bus: bus.trim(),
          insurance: insurance.trim(),
          fitness: fitness.trim(),
          status: status.trim()
        });
      }
    });

    renderSafetyTable();
  };
  reader.readAsArrayBuffer(file);
});

document.getElementById('safety-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, index) => {
      if (index === 0) return; // Skip header
      const [bus, insurance, fitness, status] = line.split(',');
      if (bus && insurance && fitness && status) {
        safetyData.push({
          bus: bus.trim(),
          insurance: insurance.trim(),
          fitness: fitness.trim(),
          status: status.trim()
        });
      }
    });
    renderSafetyTable();
  };
  reader.readAsText(file);
});

document.getElementById('safety-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#safety-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});
// ---------- Export Safety XLSX ----------
function exportSafetyXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(safetyData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Safety");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "safety.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function exportSafety() {
  const rows = [['Bus No', 'Insurance Validity', 'Fitness Certificate', 'Status']];
  safetyData.forEach(s => {
    rows.push([s.bus, s.insurance, s.fitness, s.status]);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'safety.csv';
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
renderSafetyTable();

// ---------- Sample Complaint Data ----------
let complaintsData = [
  {
    date: "2025-11-01",
    bus: "Bus 1",
    issue: "Brake failure",
    status: "Pending",
    remarks: "Needs urgent attention"
  },
  {
    date: "2025-11-03",
    bus: "Bus 2",
    issue: "AC not working",
    status: "Resolved",
    remarks: "Fixed on 2025-11-04"
  },
  {
    date: "2025-11-05",
    bus: "Bus 3",
    issue: "Oil leakage",
    status: "Pending",
    remarks: "Scheduled for service"
  }
];

// ---------- Render Complaints Table ----------
function renderComplaintsTable() {
  const tbody = document.querySelector('#complaints-table tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  complaintsData.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${c.date}</td>
      <td>${c.bus}</td>
      <td>${c.issue}</td>
      <td>${c.status}</td>
      <td>${c.remarks}</td>
    `;
    tbody.appendChild(tr);
  });
}
renderComplaintsTable();

// ---------- Add Complaint ----------
function addComplaint() {
  const date = prompt("Date (YYYY-MM-DD):");
  const bus = prompt("Bus No:");
  const issue = prompt("Issue:");
  const status = prompt("Status:");
  const remarks = prompt("Remarks:");
  if (date && bus && issue && status && remarks) {
    complaintsData.push({
      date: date.trim(),
      bus: bus.trim(),
      issue: issue.trim(),
      status: status.trim(),
      remarks: remarks.trim()
    });
    renderComplaintsTable();
  }
}

// ---------- Search Filter ----------
document.getElementById('complaints-search')?.addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('#complaints-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

// ---------- Export CSV ----------
function exportComplaintsCSV() {
  const rows = [['Date', 'Bus No', 'Issue', 'Status', 'Remarks']];
  complaintsData.forEach(c => {
    rows.push([c.date, c.bus, c.issue, c.status, c.remarks]);
  });
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'complaints.csv';
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---------- Export XLSX ----------
function exportComplaintsXLSX() {
  const worksheet = XLSX.utils.json_to_sheet(complaintsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");
  const xlsxData = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([xlsxData], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "complaints.xlsx";
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ---------- Upload CSV ----------
document.getElementById('complaints-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    lines.forEach((line, index) => {
      if (index === 0) return; // skip header
      const [date, bus, issue, status, remarks] = line.split(',');
      if (date && bus && issue && status && remarks) {
        complaintsData.push({
          date: date.trim(),
          bus: bus.trim(),
          issue: issue.trim(),
          status: status.trim(),
          remarks: remarks.trim()
        });
      }
    });
    renderComplaintsTable();
  };
  reader.readAsText(file);
});
renderComplaintsTable();
function renderDashboardCharts() {
  // Fuel Chart
  const fuelCtx = document.getElementById('fuelChart')?.getContext('2d');
  if (fuelCtx) {
    new Chart(fuelCtx, {
      type: 'bar',
      data: {
        labels: fuelData.map(f => f.bus),
        datasets: [{
          label: 'Mileage (km/l)',
          data: fuelData.map(f => f.mileage),
          backgroundColor: '#0b6e4f'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Fuel Efficiency'
          },
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Driver Chart
  const driverCtx = document.getElementById('driverChart')?.getContext('2d');
  if (driverCtx) {
    const routeCounts = {};
    drivers.forEach(d => {
      routeCounts[d.route] = (routeCounts[d.route] || 0) + 1;
    });
    new Chart(driverCtx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(routeCounts),
        datasets: [{
          data: Object.values(routeCounts),
          backgroundColor: ['#0b6e4f', '#1f7a8c', '#bf1363', '#f39237', '#2e294e']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Driver Distribution'
          }
        }
      }
    });
  }

  // Maintenance Chart (Mocked)
  const maintenanceCtx = document.getElementById('maintenanceChart')?.getContext('2d');
  if (maintenanceCtx) {
    new Chart(maintenanceCtx, {
      type: 'pie',
      data: {
        labels: ['Pending', 'Completed', 'Scheduled'],
        datasets: [{
          data: [5, 12, 3],
          backgroundColor: ['#ff6b6b', '#4caf50', '#ffc107']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Maintenance Status'
          }
        }
      }
    });
  }
}




// Call this after data is loaded
renderDashboardCharts();
document.getElementById('bus-upload')?.addEventListener('change', function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  if (file.name.endsWith('.xlsx')) {
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      rows.forEach((row, index) => {
        if (index === 0) return;
        const [busNo, route, capacity, model, fuelType, status] = row;
        if (busNo && route && capacity && model && fuelType && status) {
          busData.push({
            busNo: busNo.trim(),
            route: route.trim(),
            capacity: parseInt(capacity),
            model: model.trim(),
            fuelType: fuelType.trim(),
            status: status.trim()
          });
        }
      });
      renderBusTable();
    };
    reader.readAsArrayBuffer(file);
  } else {
    reader.onload = function (e) {
      const lines = e.target.result.split('\n');
      lines.forEach((line, index) => {
        if (index === 0) return;
        const [busNo, route, capacity, model, fuelType, status] = line.split(',');
        if (busNo && route && capacity && model && fuelType && status) {
          busData.push({
            busNo: busNo.trim(),
            route: route.trim(),
            capacity: parseInt(capacity.trim()),
            model: model.trim(),
            fuelType: fuelType.trim(),
            status: status.trim()
          });
        }
      });
      renderBusTable();
    };
    reader.readAsText(file);
  }
});