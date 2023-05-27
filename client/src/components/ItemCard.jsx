import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  Divider,
  Modal,
  alpha,
} from "@mui/material";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import {
  TitleOutlined,
  NotesOutlined,
  EditNoteRounded,
  DeleteForeverOutlined,
  CalendarMonthOutlined,
  ProductionQuantityLimitsOutlined,
} from "@mui/icons-material";
import UpdateModal from "./UpdateModal";
import DeleteDialog from "./DeleteDialog";

const ItemCard = (props) => {
  const item = props.item;
  const [style, setStyle] = useState({ visibility: "hidden" });
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const handleUpdateOpen = () => setUpdateOpen(true);
  const handleUpdateClose = () => {
    setUpdateOpen(false);
    props.handleUpdate();
  };
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);
  const handleDeleteClose = () => {
    setDeleteOpen(false);
    props.handleDelete();
  };
  // useEffect(() => {
  //   props.handleUpdate();
  // }, [updateOpen]);
  // useEffect(() => {
  //   props.handleDelete();
  // }, [deleteOpen]);
  return (
    <Box padding={1}>
      <Card
        onMouseEnter={(e) =>
          setStyle({
            visibility: "visible",
            top: "140px",
            opacity: "1",
          })
        }
        onMouseLeave={(e) =>
          setStyle({
            visibility: "hidden",
          })
        }
        sx={{
          position: "relative",
          maxWidth: 345,
          minWidth: 300,
          transition: "0.3s",
          ":hover": {
            backgroundColor: "action.hover",
            transform: "translateY(-8px)",
            boxShadow: (theme) => theme.shadows[4],
            transition: "all 0.3s ease-in-out",
          },
        }}
        variant="outlined"
      >
        <CardMedia sx={{ height: 200 }} image={item.thumb} title={item.name} />
        <CardContent>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Box
              borderRadius={"4px"}
              p={0.4}
              sx={{
                background: (theme) => `${theme.palette.background.paper}`,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <TitleOutlined fontSize="small" />
            </Box>

            <Typography variant="h6" component="h3">
              {item.name}
            </Typography>
          </Stack>
          <Box p={0.6} />
          <Divider />
          <Box p={0.8} />
          <Stack direction={"row"} gap={1} alignItems={"flex-start"}>
            <Box
              borderRadius={"4px"}
              p={0.4}
              sx={{
                background: (theme) => `${theme.palette.background.paper}`,
                border: (theme) => `1px solid ${theme.palette.divider}`,
              }}
            >
              <NotesOutlined
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
            </Box>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {item.desc}
            </Typography>
          </Stack>
          <Box p={0.6} />
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 4,
                padding: "0px 8px",
                bgcolor: "background.paper",
              }}
            >
              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                padding={"4px 8px"}
                sx={{ color: "warning.main" }}
              >
                <CalendarMonthOutlined fontSize="12" />
                <Typography
                  fontSize={12}
                  variant="body2"
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {dayjs(item.entry).format("DD-MM-YYYY")}
                </Typography>
              </Stack>
              <Divider orientation="vertical" flexItem />
              <Stack
                direction={"row"}
                gap={1}
                padding={"4px 8px"}
                sx={{ color: "success.main" }}
              >
                <ProductionQuantityLimitsOutlined fontSize="12" />
                <Typography
                  variant="body2"
                  fontSize={12}
                  sx={{
                    display: "-webkit-box",
                    overflow: "hidden",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                  }}
                >
                  {item.qty}
                </Typography>
              </Stack>
            </Box>
          </Stack>
        </CardContent>
        <CardActions
          style={style}
          sx={{
            borderRadius: "25px",
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[2],
            width: "100px",
            height: "44px",
            justifyContent: "flex-end",
            position: "absolute",
            right: "10px",
            top: "148px",
            opacity: "0",
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Tooltip title="Delete">
            <IconButton aria-label="" color="error" onClick={handleDeleteOpen}>
              <DeleteForeverOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit Details">
            <IconButton
              aria-label=""
              color="primary"
              onClick={handleUpdateOpen}
            >
              <EditNoteRounded />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
      <DeleteDialog
        item={item}
        _delete={deleteOpen}
        handleDelete={handleDeleteClose}
      />
      <UpdateModal
        open={updateOpen}
        handleClose={handleUpdateClose}
        aria-labelledby={"modal-modal-title"}
        itemDetails={item}
      />
    </Box>
  );
};

export default ItemCard;
