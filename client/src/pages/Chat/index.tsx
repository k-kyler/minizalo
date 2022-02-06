import { Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { InboxList } from "../../components/InboxList";
import { InboxMessages } from "../../components/InboxMessages";
import { PageLoading } from "../../components/Loadings/PageLoading";
import { useRedirect } from "../../hooks/useRedirect";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  selectInboxes,
  fetchInboxes,
  changeSelectedInboxId,
} from "../../redux/InboxesSlice";
import "./Chat.css";
import NoInboxesOverlay from "../../assets/no_inboxes_overlay.svg";
import { Link, useLocation } from "react-router-dom";

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
            <InboxMessages />
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
