import { FC, useEffect } from "react";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { ChatScreen, InboxList } from "@features/chat";
import { PageLoading } from "@features/ui";
import { useRedirect } from "@hooks/use-redirect";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  selectInboxes,
  fetchInboxes,
  changeSelectedInboxId,
} from "@redux/inboxes.slice";
import NoInboxesOverlay from "@assets/no_inboxes_overlay.svg";
import "./chat.style.css";

interface ILocationState {
  inboxIdToSelect: string;
}

export const Chat: FC = () => {
  const { isFetching, inboxes } = useAppSelector(selectInboxes);

  const dispatch = useAppDispatch();

  const { setPathnameHandler } = useRedirect();

  const location = useLocation<ILocationState>();

  useEffect(() => {
    dispatch(fetchInboxes());
    setPathnameHandler();
  }, []);

  useEffect(() => {
    if (!isFetching && location?.state?.inboxIdToSelect)
      dispatch(changeSelectedInboxId(location?.state?.inboxIdToSelect)); // Target to the friend inbox while redirecting from friends list
  }, [isFetching]);

  return (
    <>
      {!isFetching && inboxes.length ? (
        <div className="chat">
          <div className="chat__inboxList">
            <InboxList />
          </div>
          <div className="chat__inboxMessages">
            <ChatScreen />
          </div>
        </div>
      ) : isFetching ? (
        <PageLoading />
      ) : (
        <div className="chat" style={{ backgroundColor: "#f1f2f5" }}>
          <div className="chat__overlay">
            <img src={NoInboxesOverlay} />
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              You have no inboxes, <Link to="/search">add</Link> some friends
              and start your conversation
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
