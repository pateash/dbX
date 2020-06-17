import React from "react";
import PropTypes from "prop-types";
import ThumbUp from "@material-ui/icons/ThumbUp";
import {
  Button,
  useUpdateMany,
  useNotify,
  useRedirect,
  useUnselectAll,
  CRUD_UPDATE_MANY,
} from "react-admin";

const BulkResolveButton = ({ selectedIds }) => {
  const notify = useNotify();
  const redirectTo = useRedirect();
  const unselectAll = useUnselectAll("exceptions");
  const [approve, { loading }] = useUpdateMany(
    "exceptions",
    selectedIds,
    { status: "resolved" },
    {
      action: CRUD_UPDATE_MANY,
      undoable: true,
      onSuccess: () => {
        notify(
          "resources.exceptions.notification.approved_success",
          "info",
          {},
          true
        );
        redirectTo("/exceptions");
        unselectAll();
      },
      onFailure: () => {
        notify("resources.exceptions.notification.approved_error", "warning");
      },
    }
  );
  return (
    <Button
      //label="resources.exceptions.action.resolve"
      label="Resolve"
      backgroundColor="green"
      onClick={approve}
      disabled={loading}
      variant="contained"
      size="large"
    >
      Resolve
    </Button>
  );
};

BulkResolveButton.propTypes = {
  selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default BulkResolveButton;
