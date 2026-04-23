import { useEffect, useState } from "react";
import { getGroups } from "../api/api";

export default function GroupDropdown({ onSelect }) {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    getGroups().then(setGroups);
  }, []);

  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select Group</option>
      {groups.map((g) => (
        <option key={g.groupId} value={g.groupId}>
          {g.groupName}
        </option>
      ))}
    </select>
  );
}