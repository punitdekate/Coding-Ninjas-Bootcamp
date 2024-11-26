import React, { Component } from "react";

// Complete this Component
const ListItem = (props) => {
  console.log(props);
  const { link, icon, name, bgColor } = props.data;
  return (
    <div
      className='ListItem'
      style={{
        height: 30,
        backgroundColor: bgColor,
      }}
    >
      <img src={icon} alt='' />
      <a href={link}>{name}</a>
    </div>
  );
};

export default ListItem;
