import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Fab, Typography } from "@mui/material";
import ItemCard from "../components/ItemCard";
import AddModal from "../components/AddModal";

import { AddOutlined } from "@mui/icons-material";
const Items = () => {
  const [items, setItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [update, setUpdate] = useState(false);
  const handleUpdate = () => setUpdate((prev) => !prev);
  const [_delete, setDelete] = useState(false);
  const handleDelete = () => setDelete((prev) => !prev);

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = axios.get("http://localhost:8800/items").then((res) => {
          setItems(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    getItems();
  }, [open, update, _delete]);
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "0.6rem",
          padding: "1rem 0 2rem",
        }}
      >
        {items.map((item) => (
          <ItemCard
            item={item}
            key={item.itemId}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </Box>
      <Fab
        variant="extended"
        color="primary"
        sx={{
          margin: 0,
          top: "auto",
          right: "4vw",
          bottom: 30,
          left: "auto",
          position: "fixed",
          paddingRight: "1.5rem",
        }}
        onClick={handleOpen}
      >
        <AddOutlined sx={{ mr: 0.4 }} />
        Add Item
      </Fab>
      <AddModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default Items;
