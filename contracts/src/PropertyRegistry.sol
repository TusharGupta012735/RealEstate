// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract PropertyRegistry {
    
    struct Property {
        string title;
        string description;
        uint256 priceINR;
        uint8 bedrooms;
        uint8 bathrooms;
        uint256 areaSquareFeet;
        string location;
        address owner;
    }
    
    uint256 public propertyCount;
    mapping(uint256 => Property) public properties;

    event PropertyRegistered(
        uint256 indexed propertyId,
        string title,
        address indexed owner
    );

    function registerProperty(
        string memory _title,
        string memory _description,
        uint256 _priceINR,
        uint8 _bedrooms,
        uint8 _bathrooms,
        uint256 _areaSquareFeet,
        string memory _location
    ) public {
        propertyCount++;

        properties[propertyCount] = Property({
            title: _title,
            description: _description,
            priceINR: _priceINR,
            bedrooms: _bedrooms,
            bathrooms: _bathrooms,
            areaSquareFeet: _areaSquareFeet,
            location: _location,
            owner: msg.sender
        });

        emit PropertyRegistered(propertyCount, _title, msg.sender);
    }

    function getProperty(uint256 _propertyId) public view returns (Property memory) {
        require(_propertyId > 0 && _propertyId <= propertyCount, "Property does not exist.");
        return properties[_propertyId];
    }
}
