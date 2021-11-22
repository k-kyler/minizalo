import { FC, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Avatar,
  Button,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import "./CustomDialog.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeDialog, selectDialog } from "../../redux/DialogSlice";

export const CustomDialog: FC = () => {
  const dispatch = useAppDispatch();

  const dialog = useAppSelector(selectDialog);

  const Input = styled("input")({
    display: "none",
  });

  const [selectedUserId, setSelectedUserId] = useState("");

  const deleteChipHandler = () => {};

  if (dialog.type === "create-group")
    return (
      <Dialog
        open={dialog.isOpen as any}
        onClose={() => dispatch(closeDialog())}
      >
        <DialogTitle>
          <Typography variant="h5">Create new group</Typography>
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          {/* Upload background */}
          <label htmlFor="upload-background">
            <Input accept="image/*" id="upload-background" type="file" />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCamera fontSize="large" />
            </IconButton>
          </label>

          {/* Name */}
          <TextField
            label="Name"
            type="text"
            fullWidth
            variant="outlined"
            size="small"
            sx={{ mt: 3, mb: 2.5 }}
          />

          {/* Select your friends */}
          <FormControl
            size="small"
            sx={{ minWidth: 120, width: "100%", mb: 2.5 }}
          >
            <InputLabel id="user-select">Friends</InputLabel>
            <Select
              labelId="user-select"
              value={selectedUserId}
              label="Friends"
              onChange={(event) =>
                setSelectedUserId(event.target.value as string)
              }
              defaultValue=""
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {/* Test data */}
              <MenuItem value="kkyler">
                <ListItem sx={{ m: 0, p: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      src={
                        "https://avatars.githubusercontent.com/u/66368949?v=4"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText primary={"kkyler"} />
                </ListItem>
              </MenuItem>
              {/* End of test data */}
            </Select>
          </FormControl>

          {/* Selected list */}
          <div className="customDialog__chips">
            {/* Test data */}
            <Chip
              avatar={
                <Avatar src="https://avatars.githubusercontent.com/u/66368949?v=4" />
              }
              label="kkyler"
              sx={{ m: 0.5 }}
              variant="outlined"
              onDelete={deleteChipHandler}
            />
            <Chip
              avatar={
                <Avatar src="https://avatars.githubusercontent.com/u/66368949?v=4" />
              }
              label="kkyler"
              sx={{ m: 0.5 }}
              variant="outlined"
              onDelete={deleteChipHandler}
            />
            <Chip
              avatar={
                <Avatar src="https://avatars.githubusercontent.com/u/66368949?v=4" />
              }
              label="kkyler"
              sx={{ m: 0.5 }}
              variant="outlined"
              onDelete={deleteChipHandler}
            />
            <Chip
              avatar={
                <Avatar src="https://avatars.githubusercontent.com/u/66368949?v=4" />
              }
              label="kkyler"
              sx={{ m: 0.5 }}
              variant="outlined"
              onDelete={deleteChipHandler}
            />
            <Chip
              avatar={
                <Avatar src="https://avatars.githubusercontent.com/u/66368949?v=4" />
              }
              label="kkyler"
              sx={{ m: 0.5 }}
              variant="outlined"
              onDelete={deleteChipHandler}
            />
            <Chip
              avatar={
                <Avatar src="https://avatars.githubusercontent.com/u/66368949?v=4" />
              }
              label="kkyler"
              sx={{ m: 0.5 }}
              variant="outlined"
              onDelete={deleteChipHandler}
            />
            <Chip
              avatar={
                <Avatar src="https://avatars.githubusercontent.com/u/66368949?v=4" />
              }
              label="kkyler"
              sx={{ m: 0.5 }}
              variant="outlined"
              onDelete={deleteChipHandler}
            />
            {/* End of test data */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button>Create</Button>
          <Button onClick={() => dispatch(closeDialog())}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  if (dialog.type === "zoom-image")
    return (
      <Dialog
        open={dialog.isOpen as any}
        onClose={() => dispatch(closeDialog())}
      >
        <DialogContent className="customDialog__content">
          <img
            className="customDialog__image"
            src={`${import.meta.env.VITE_API_URL}/Resources/${
              dialog.imageSource
            }`}
            loading="lazy"
          />

          <Typography className="customDialog__overlay" variant="h6">
            <a
              href={`${import.meta.env.VITE_API_URL}/Resources/${
                dialog.imageSource
              }`}
              target="__blank"
            >
              Open in original <CallMadeIcon sx={{ ml: 0.5 }} />
            </a>
          </Typography>
        </DialogContent>
      </Dialog>
    );
  return null;
};
