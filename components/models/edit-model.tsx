import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { EditModelForm } from "./form/edit-model-form";
import { ModelInfoType } from "@/types/type";

type Props = {
  children: React.ReactNode;
  modelData: ModelInfoType
};

export const EditModel = ({ children, modelData }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit model</DialogTitle>
        </DialogHeader>
        { modelData ? <EditModelForm modelData={modelData} /> : <p>Something went wrong.</p>}
      </DialogContent>
    </Dialog>
  );
};
