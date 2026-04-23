import { useEffect, useState } from "react";
import { getBrands } from "../api/api";

export default function BrandList({ refreshKey }) {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    getBrands().then(setBrands);
  }, [refreshKey]);

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Brand</th>
          <th>Chain</th>
          <th>Group</th>
        </tr>
      </thead>
      <tbody>
        {brands.map((b) => (
          <tr key={b.brandId}>
            <td>{b.brandName}</td>
            <td>{b.chain?.companyName}</td>
            <td>{b.chain?.group?.groupName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}