import * as React from "react";
import {
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Slide,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteDialog = (props) => {
  const itemDetails = props.item;
  const itemId = itemDetails.itemId;
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.delete("http://localhost:8800/items/" + itemId);
      console.log(req);
      props.handleDelete();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog
        open={props._delete}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleDelete}
        aria-describedby="alert-dialog-slide-description"
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box p={1} pl={2}>
            <Typography variant="h6" color="text.primary">
              Delete Item
            </Typography>
          </Box>
          <Box
            sx={{
              border: (theme) => `2px solid ${theme.palette.warning.light}`,
            }}
            borderRadius={4}
            p={"0.1rem 0.65rem"}
            mr={2}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Id: {itemDetails.itemId}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleDelete}>Cancel</Button>
          <Button onClick={handleClick} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
