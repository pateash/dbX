import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ThumbUp from "@material-ui/icons/ThumbUp";
import { useTranslate, useUpdate, useNotify, useRedirect } from "react-admin";
//import { Exception } from "./types";

const ResolveButton = ({ record }) => {
  const translate = useTranslate();
  const notify = useNotify();
  const redirectTo = useRedirect();
  const [approve, { loading }] = useUpdate(
    "exceptions",
    record.id,
    { status: "resolved" },
    record,
    {
      undoable: true, 
      onSuccess: () => {
        notify(
          "resources.exceptions.notification.approved_success",
          "info",
          {},
          true
        );
        redirectTo("/exception");
      },
      onFailure: () => {
        notify("resources.exceptions.notification.approved_error");
      },
    }
  );

  return record && record.status === "unresolved" ? (
    <Button
      backgroundColor="green"
      onClick={approve}
      disabled={loading}
      variant="contained"
      size="large"
    >
      Resolve
    </Button>
  ) : (
    <span />
  );
};

ResolveButton.propTypes = {
  record: PropTypes.object,
};

export default ResolveButton;
