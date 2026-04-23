import { useState } from "react";
import { createBrand } from "../api/api";
import GroupDropdown from "./GroupDropdown";
import ChainDropdown from "./ChainDropdown";

export default function BrandForm({ refresh }) {
  const [groupId, setGroupId] = useState("");
  const [chainId, setChainId] = useState("");
  const [brandName, setBrandName] = useState("");

  const handleSubmit = async () => {
    if (!brandName || !chainId) {
      alert("Fill all fields");
      return;
    }

    await createBrand({ brandName, chainId });
    setBrandName("");
    refresh();
  };

  return (
    <div>
      <h3>Add Brand</h3>

      <GroupDropdown onSelect={setGroupId} />

      <ChainDropdown groupId={groupId} onSelect={setChainId} />

      <input
        placeholder="Brand Name"
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />

      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}