// src/prospects/StatusButton.tsx
import { useState } from "react";
import { useDataProvider, useNotify, useRecordContext, useRefresh } from "react-admin";
import { MenuItem, IconButton, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const StatusButton = () => {
  const record = useRecordContext();
  const dp = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  
  // State for menu open/close
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  if (!record) return null;

  const statuses = [
    { id: "PAS_ENCORE_CONTACTE", label: "Pas contacté" },
    { id: "INJOIGNABLE", label: "Injoignable" },
    { id: "INTERESSE", label: "Intéressé" },
    { id: "NON_INTERESSE", label: "Non intéressé" }
  ];

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatus = async (status: string) => {
    try {
      await dp.update("prospects", {
        id: record.id,
        data: {},
        previousData: record,
        meta: {
          path: `${record.id}/status`,
          body: { status }
        }
      });
      notify("Statut mis à jour", { type: "success" });
      refresh();
    } catch (error) {
      notify("Erreur lors de la mise à jour du statut", { type: "error" });
    }
    handleClose();
  };

  return (
    <>
      <IconButton 
        size="small" 
        onClick={handleClick}
        aria-controls={open ? 'status-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="status-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'status-button',
        }}
      >
        {statuses.map((status) => (
          <MenuItem 
            key={status.id} 
            onClick={() => changeStatus(status.id)}
            selected={record.status === status.id}
          >
            {status.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};