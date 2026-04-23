import { useEffect, useState } from "react";
import { getChainsByGroup } from "../api/api";

export default function ChainDropdown({ groupId, onSelect }) {
  const [chains, setChains] = useState([]);

  useEffect(() => {
    if (groupId) {
      getChainsByGroup(groupId).then(setChains);
    }
  }, [groupId]);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Chain</option>
      {chains.map((c) => (
        <option key={c.chainId} value={c.chainId}>
          {c.companyName}
        </option>
      ))}
    </select>
  );
}