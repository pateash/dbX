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
        redirectTo("/exceptions");
      },
      onFailure: () => {
        notify("resources.exceptions.notification.approved_error");
      },
    }
  );

  return record && record.status === "unresolved" ? (
    <Button
      variant="outlined"
      color="primary"
      size="small"
      onClick={approve}
      disabled={loading}
    >
      <ThumbUp
        color="primary"
        style={{ paddingRight: "0.5em", color: "green" }}
      />
      {translate("resources.exceptions.action.resolve")}
    </Button>
  ) : (
    <span />
  );
};

ResolveButton.propTypes = {
  record: PropTypes.object,
};

export default ResolveButton;
