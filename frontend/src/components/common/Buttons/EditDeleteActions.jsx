import React from "react";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { DeleteIcon, PencilSimpleIcon } from "../../../../icons/v2";

const EditDeleteActions = ({ onEdit, onDelete, className = "" }) => {
  const { t } = useTranslation();

  return (
    <Box
      className={twMerge(
        "font-v2 inline-flex h-8 shrink-0 items-center overflow-hidden rounded-lg border border-solid border-v2-stroke bg-v2-fill dark:bg-[#1B1B26]",
        className
      )}
    >
      <Box
        component="button"
        type="button"
        onClick={onEdit}
        className="font-v2 inline-flex h-full items-center gap-1.5 border-0 bg-transparent px-3 text-v2-body-sm text-v2-muted transition-colors hover:bg-v2-hover hover:text-v2-text"
      >
        <PencilSimpleIcon className="h-3.5 w-3.5" aria-hidden />
        {t("_Edit")}
      </Box>

      <Box
        aria-hidden
        className="h-4 w-px shrink-0 bg-v2-stroke"
      />

      <Box
        component="button"
        type="button"
        aria-label={t("_Delete")}
        onClick={onDelete}
        className="flex h-full w-8 items-center justify-center border-0 bg-transparent transition-colors hover:bg-[#FFF1F1] dark:hover:bg-[rgba(255,56,60,0.12)]"
      >
        <DeleteIcon className="h-4 w-4" aria-hidden />
      </Box>
    </Box>
  );
};

export default EditDeleteActions;
