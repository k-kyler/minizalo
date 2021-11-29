import { FC, useState, useEffect, useRef, ChangeEvent } from "react";
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
  ListItemAvatar,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { PhotoCamera } from "@mui/icons-material";
import CallMadeIcon from "@mui/icons-material/CallMade";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import "./CustomDialog.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { closeDialog, selectDialog } from "../../redux/DialogSlice";
import { selectFriends } from "../../redux/FriendsSlice";
import { selectUser } from "../../redux/UserSlice";
import { postInbox, selectInboxes } from "../../redux/InboxesSlice";

interface ChipMember {
  userId: string;
  userName: string;
  avatar: string;
}

export const CustomDialog: FC = () => {
  const dispatch = useAppDispatch();

  const dialog = useAppSelector(selectDialog);
  const { friends } = useAppSelector(selectFriends);
  const { user } = useAppSelector(selectUser);
  const { isCreating } = useAppSelector(selectInboxes);

  const Input = styled("input")({
    display: "none",
  });

  const [selectedUserId, setSelectedUserId] = useState("");
  const [chipIds, setChipIds] = useState<string[]>([]);
  const [chipMembers, setChipMembers] = useState<ChipMember[]>([]);
  const [avatarToUpload, setAvatarToUpload] = useState<any>();

  const groupNameRef = useRef<HTMLInputElement>(null);

  const setAvatarToUploadHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarToUpload(event.target.files[0]);
    }
  };

  const clearAvatarToUploadHandler = () => setAvatarToUpload(null);

  const selectMemberHandler = (id: string) => {
    setSelectedUserId(id);

    // Check for not adding duplicated id
    if (!chipIds.filter((chipId) => chipId === id).length) {
      setChipIds([...chipIds, id]);
    }

    setSelectedUserId("");
  };

  const generateChipMembers = () => {
    const members = friends
      .filter(
        (friend) =>
          chipIds.includes(friend.senderId) ||
          chipIds.includes(friend.receiverId)
      )
      .map((member) => {
        if (member.senderId !== user.userId) {
          return {
            userId: member.senderId,
            userName: member.senderData.userName,
            avatar: member.senderData.avatar,
          };
        } else if (member.receiverId !== user.userId) {
          return {
            userId: member.receiverId,
            userName: member.receiverData.userName,
            avatar: member.receiverData.avatar,
          };
        }
      });

    setChipMembers(members as any);
  };

  const deleteChipMemberHandler = (id: string) => {
    const modifiedChipIds = chipIds.filter((chipId) => chipId !== id);

    setChipIds(modifiedChipIds);
  };

  const createNewGroupHandler = () => {
    dispatch(
      postInbox({
        name: groupNameRef.current ? groupNameRef.current.value : "",
        background: "No background",
        type: "group",
        ownerId: user.userId,
        memberIds: chipIds,
        file: avatarToUpload,
      })
    );
  };

  useEffect(generateChipMembers, [chipIds]);

  useEffect(() => {
    if (!isCreating) dispatch(closeDialog());
  }, [isCreating]);

  if (dialog.type === "create-group")
    return (
      <Dialog
        open={dialog.isOpen as any}
        onClose={() => dispatch(closeDialog())}
        className="customDialog"
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: "1.5rem" }}>
          Create new group
        </DialogTitle>

        <DialogContent sx={{ textAlign: "center" }}>
          {/* Upload background */}
          {!avatarToUpload ? (
            <label htmlFor="upload-background">
              <Input
                accept="image/*"
                id="upload-background"
                type="file"
                onChange={setAvatarToUploadHandler}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera fontSize="large" />
              </IconButton>
            </label>
          ) : (
            <div className="customDialog__avatarToUpload">
              <Avatar
                sx={{
                  margin: "0 auto",
                  width: 70,
                  height: 70,
                }}
                src={URL.createObjectURL(avatarToUpload)}
              />

              <HighlightOffIcon
                onClick={clearAvatarToUploadHandler}
                color="error"
                className="customDialog__clearAvatarButton"
              />
            </div>
          )}

          {/* Name */}
          <TextField
            inputRef={groupNameRef}
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
              onChange={(event) => selectMemberHandler(event.target.value)}
              defaultValue=""
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

              {friends.map((friend) => {
                if (friend.senderId !== user.userId) {
                  return (
                    <MenuItem key={friend.senderId} value={friend.senderId}>
                      <ListItemAvatar>
                        <Avatar src={friend.senderData.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={friend.senderData.userName} />
                    </MenuItem>
                  );
                } else if (friend.receiverId !== user.userId) {
                  return (
                    <MenuItem key={friend.receiverId} value={friend.receiverId}>
                      <ListItemAvatar>
                        <Avatar src={friend.receiverData.avatar} />
                      </ListItemAvatar>
                      <ListItemText primary={friend.receiverData.userName} />
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Select>
          </FormControl>

          {/* Selected list */}
          <div className="customDialog__chips">
            {chipMembers.map((member) => (
              <Chip
                key={member.userId}
                avatar={<Avatar src={member.avatar} />}
                label={member.userName}
                sx={{ m: 0.5 }}
                variant="outlined"
                onDelete={() => deleteChipMemberHandler(member.userId)}
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={createNewGroupHandler}>Create</Button>
          <Button onClick={() => dispatch(closeDialog())}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  if (dialog.type === "zoom-image")
    return (
      <Dialog
        open={dialog.isOpen as any}
        onClose={() => dispatch(closeDialog())}
        className="customDialog"
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
