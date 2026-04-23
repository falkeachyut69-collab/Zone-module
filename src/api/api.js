const API_BASE = "http://localhost:8089";

// GROUPS
export const getGroups = async () => {
  const res = await fetch(`${API_BASE}/groups`);
  return res.json();
};

// CHAINS
export const getChainsByGroup = async (groupId) => {
  const res = await fetch(`${API_BASE}/chains/group/${groupId}`);
  return res.json();
};

// BRANDS
export const getBrands = async () => {
  const res = await fetch(`${API_BASE}/brands`);
  return res.json();
};

export const getBrandsByChain = async (chainId) => {
  const res = await fetch(`${API_BASE}/brands/chain/${chainId}`);
  return res.json();
};

export const createBrand = async (data) => {
  const res = await fetch(`${API_BASE}/brands`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};