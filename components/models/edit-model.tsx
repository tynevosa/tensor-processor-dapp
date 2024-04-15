import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { EditModelForm } from "./form/edit-model-form";

type Props = {
  children: React.ReactNode;
};

export const EditModel = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit model</DialogTitle>
        </DialogHeader>
        <EditModelForm />
      </DialogContent>
    </Dialog>
  );
};
