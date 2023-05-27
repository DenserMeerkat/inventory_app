import * as React from "react";
import dayjs from "dayjs";
import { FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Box,
  Modal,
  Stack,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import {
  TitleOutlined,
  NotesOutlined,
  ImageOutlined,
  CloseOutlined,
  PermIdentityOutlined,
  ProductionQuantityLimitsOutlined,
  Close,
} from "@mui/icons-material";
import axios from "axios";

const modalStyle = {
  position: "relative",
  display: "block",
  inset: "0",
  margin: "auto",
  marginTop: "12vh",
  width: "clamp(320px, 70vw,450px)",
  height: "580px",
  borderRadius: "4px",
  bgcolor: "background.paper",
  boxShadow: 24,
  overflowY: "overlay",
  pb: 3,
};

const UpdateModal = (props) => {
  const itemDetails = props.itemDetails;
  const itemId = itemDetails.itemId;
  const [state, setState] = React.useState({
    openSnack: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openSnack } = state;

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({ ...state, openSnack: false });
  };
  const [desc, setDesc] = React.useState(itemDetails.desc);
  const [imgURL, setImgURL] = React.useState(itemDetails.thumb);
  const [value, setValue] = React.useState(dayjs(itemDetails.entry));
  const [item, setItem] = React.useState({
    name: itemDetails.name,
    desc: itemDetails.desc,
    thumb: itemDetails.thumb,
    entryDate: itemDetails.entry,
    sellerId: itemDetails.sellerId,
    qty: itemDetails.qty,
  });
  const { name, desc1, thumb, entryDate, sellerId, qty } = item;
  React.useEffect(() => {
    setItem({
      ...item,
      entryDate: dayjs(value).format("YYYY-MM-DD"),
      thumb: imgURL,
      desc: desc,
    });
  }, [value, imgURL, desc]);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    setItem({
      ...item,
      entryDate: dayjs(newValue).format("YYYY-MM-DD"),
    });
  };
  const handleUserInput = (e) => {
    setDesc(e.target.value);
    setItem({ ...item, desc: desc });
  };
  const handleThumbInput = (e) => {
    setImgURL(e.target.value);
    setItem({ ...item, thumb: imgURL });
  };
  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
    console.log(item);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (item.name === "" || item.desc === "" || item.thumb === "") {
      setState({ ...state, openSnack: true });
    } else {
      try {
        const req = await axios.put("http://localhost:8800/itemUpdate", {
          ...item,
          itemId: itemId,
        });
        handleModalClose();
        console.log(req);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleModalClose = () => {
    handleSnackClose();
    props.handleClose();
    setItem({
      name: itemDetails.name,
      desc: itemDetails.desc,
      thumb: itemDetails.thumb,
      entryDate: itemDetails.entry,
      sellerId: itemDetails.sellerId,
      qty: itemDetails.qty,
    });
    setDesc(itemDetails.desc);
    setImgURL(itemDetails.thumb);
    setValue(dayjs(itemDetails.entry));
  };
  const lorem =
    "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam neque atque, labore aliquam assumenda autem distinctio ipsa laborum officiis iure numquam laudantium enim, beatae quaerat. Harum ut provident nam asperiores blanditiis vero numquam placeat iste doloremque quae autem laudantium, odio unde molestias dolorem ipsam velit porro est debitis repudiandae dolores?";
  const placeHolder = "https://picsum.photos/id/237/345/200";
  return (
    <Modal
      open={props.open}
      onClose={handleModalClose}
      aria-labelledby={"modal-modal-title"}
    >
      <Box sx={modalStyle}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            One or more fields empty!
          </Alert>
        </Snackbar>
        <Box sx={{ position: "absolute", padding: "1rem", right: "0" }}>
          <IconButton aria-label="" onClick={handleModalClose} color="error">
            <CloseOutlined />
          </IconButton>
        </Box>
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          height={"100%"}
          gap={4}
        >
          <Typography variant="h5" component="h2" color={"text.primary"}>
            Update Item
          </Typography>
          <FormControl
            sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <TextField
              name="name"
              label="Name"
              fullWidth
              id="name"
              variant="outlined"
              size="small"
              onChange={handleChange}
              defaultValue={name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TitleOutlined />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="desc"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={desc}
              onChange={handleUserInput}
              id="desc"
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ marginRight: "-0.5rem" }}
                      aria-label=""
                      onClick={() => {
                        setDesc(lorem);
                        setItem({ ...item, desc: lorem });
                      }}
                    >
                      <NotesOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              name="thumb"
              label="Image URL"
              fullWidth
              type="url"
              id="thumb"
              variant="outlined"
              value={imgURL}
              onChange={handleThumbInput}
              size="small"
              placeholder="https://picsum.photos/id/237/345/200"
              sx={{ "& input::placeholder": { fontSize: "14px" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      sx={{ marginRight: "-0.5rem" }}
                      aria-label=""
                      onClick={() => {
                        setImgURL(placeHolder);
                        setItem({ ...item, thumb: placeHolder });
                      }}
                    >
                      <ImageOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                name="entryDate"
                label="Entry Date"
                value={value}
                onChange={(newValue) => handleDateChange(newValue)}
                slotProps={{ textField: { size: "small" } }}
              />
            </LocalizationProvider>
            <Stack direction={"row"} maxWidth={280} gap={2}>
              <TextField
                name="sellerId"
                label="Seller Id"
                id="sellerId"
                variant="outlined"
                type="number"
                defaultValue={sellerId}
                onChange={handleChange}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PermIdentityOutlined />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                name="qty"
                label="Quantity"
                id="qty"
                defaultValue={qty}
                type="number"
                variant="outlined"
                size="small"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ProductionQuantityLimitsOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Button variant="contained" onClick={handleClick}>
              Update Item
            </Button>
          </FormControl>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UpdateModal;
