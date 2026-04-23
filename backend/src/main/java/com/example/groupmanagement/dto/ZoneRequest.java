package com.example.groupmanagement.dto;

import lombok.Data;

@Data
public class ZoneRequest {

    private String zoneName;
    private Long brandId;

    public String getZoneName() {
        return zoneName;
    }

    public void setZoneName(String zoneName) {
        this.zoneName = zoneName;
    }

    public Long getBrandId() {
        return brandId;
    }

    public void setBrandId(Long brandId) {
        this.brandId = brandId;
    }
}