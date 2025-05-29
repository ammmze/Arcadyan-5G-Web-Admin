import React from "react";
import { CardGroup } from "react-bootstrap";
import DeviceCard from "./deviceCard";

const DeviceCardGroup = ({ props, data }) => {
  console.log(data);
  return (
    <CardGroup>
      {data.map((device, i) => (
        <DeviceCard key={i} intfc={props} data={device} />
      ))}
    </CardGroup>
  );
};

export default DeviceCardGroup;
