import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL = "https://zone-module-1.onrender.com";


function App() {
  // ================= STATE =================
  const [groups, setGroups] = useState([]);
  const [chains, setChains] = useState([]);
  const [brands, setBrands] = useState([]);
  const [zones, setZones] = useState([]);

  // Filters
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedChain, setSelectedChain] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  // Zone form
  const [zoneName, setZoneName] = useState("");
  const [zoneBrandId, setZoneBrandId] = useState("");

  const [view, setView] = useState("dashboard");

  // ================= LOAD =================
  const loadGroups = () => {
    fetch(`${BASE_URL}/groups`)
      .then(res => res.json())
      .then(data => setGroups(Array.isArray(data) ? data : []));
  };

  const loadChains = (groupId) => {
    if (!groupId) return setChains([]);
    fetch(`${BASE_URL}/chains/group/${groupId}`)
      .then(res => res.json())
      .then(data => setChains(Array.isArray(data) ? data : []));
  };

  const loadBrands = (chainId) => {
    if (!chainId) return setBrands([]);
    fetch(`${BASE_URL}/brands/chain/${chainId}`)
      .then(res => res.json())
      .then(data => setBrands(Array.isArray(data) ? data : []));
  };

  const loadZones = (brandId) => {
    let url = `${BASE_URL}/zones`;
    if (brandId) url = `${BASE_URL}/zones/brand/${brandId}`;

    fetch(url)
      .then(res => res.json())
      .then(data => setZones(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    loadGroups();
    loadZones();
  }, []);

  // ================= FILTER FLOW =================
  const handleGroupChange = (id) => {
    setSelectedGroup(id);
    setSelectedChain("");
    setSelectedBrand("");
    setBrands([]);
    loadChains(id);
    loadZones();
  };

  const handleChainChange = (id) => {
    setSelectedChain(id);
    setSelectedBrand("");
    loadBrands(id);
    loadZones();
  };

  const handleBrandChange = (id) => {
    setSelectedBrand(id);
    loadZones(id);
  };

  // ================= ADD ZONE =================
  const addZone = () => {
    if (!zoneName || !zoneBrandId) {
      alert("All fields required");
      return;
    }

    fetch(`${BASE_URL}/zones`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        zoneName,
        brandId: Number(zoneBrandId)
      })
    })
      .then(() => {
        setZoneName("");
        setZoneBrandId("");
        loadZones(selectedBrand);
        setView("dashboard");
      });
  };

  const deleteZone = (id) => {
    fetch(`${BASE_URL}/zones/${id}`, {
      method: "DELETE"
    }).then(() => loadZones(selectedBrand));
  };

  // ================= UI =================
  return (
    <div className="container">

      <h1>Zone Management Dashboard</h1>

      {/* NAV */}
      <div className="nav-buttons">
        <button onClick={() => setView("zoneForm")}>Add Zone</button>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
      </div>

      {/* ================= ZONE FORM ================= */}
      {view === "zoneForm" && (
        <div className="card">
          <h2>Add Zone</h2>

          {/* GROUP */}
          <select
            value={selectedGroup}
            onChange={(e) => handleGroupChange(e.target.value)}
          >
            <option value="">Select Group</option>
            {groups.map(g => (
              <option key={g.groupId} value={g.groupId}>
                {g.groupName}
              </option>
            ))}
          </select>

          {/* CHAIN */}
          <select
            value={selectedChain}
            onChange={(e) => handleChainChange(e.target.value)}
          >
            <option value="">Select Company</option>
            {chains.map(c => (
              <option key={c.chainId} value={c.chainId}>
                {c.companyName}
              </option>
            ))}
          </select>

          {/* BRAND */}
          <select
            value={zoneBrandId}
            onChange={(e) => setZoneBrandId(e.target.value)}
          >
            <option value="">Select Brand</option>
            {brands.map(b => (
              <option key={b.brandId} value={b.brandId}>
                {b.brandName}
              </option>
            ))}
          </select>

          <input
            placeholder="Zone Name"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
          />

          <button onClick={addZone}>Add</button>
        </div>
      )}

      {/* ================= FILTERS ================= */}
      <div className="card">
        <h2>Filters</h2>

        <select
          value={selectedGroup}
          onChange={(e) => handleGroupChange(e.target.value)}
        >
          <option value="">All Groups</option>
          {groups.map(g => (
            <option key={g.groupId} value={g.groupId}>
              {g.groupName}
            </option>
          ))}
        </select>

        <select
          value={selectedChain}
          onChange={(e) => handleChainChange(e.target.value)}
        >
          <option value="">All Companies</option>
          {chains.map(c => (
            <option key={c.chainId} value={c.chainId}>
              {c.companyName}
            </option>
          ))}
        </select>

        <select
          value={selectedBrand}
          onChange={(e) => handleBrandChange(e.target.value)}
        >
          <option value="">All Brands</option>
          {brands.map(b => (
            <option key={b.brandId} value={b.brandId}>
              {b.brandName}
            </option>
          ))}
        </select>
      </div>

      {/* ================= ZONE TABLE ================= */}
      <div className="card">
        <h2>Zones</h2>

        <table className="table">
          <thead>
            <tr>
              <th>Zone</th>
              <th>Brand</th>
              <th>Company</th>
              <th>Group</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {zones.map(z => (
              <tr key={z.zoneId}>
                <td>{z.zoneName}</td>
                <td>{z.brand?.brandName}</td>
                <td>{z.brand?.chain?.companyName}</td>
                <td>{z.brand?.chain?.group?.groupName}</td>
                <td>
                  <button onClick={() => deleteZone(z.zoneId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default App;