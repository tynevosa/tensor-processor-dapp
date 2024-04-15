import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { AddModelForm } from "./form/add-model-form";

type Props = {};

export const AddModel = (props: Props) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant="secondary"
          className="mr-10 lg:mr-6 font-semibold text-black text-xl"
        >
          <Plus /> Add
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a model</DialogTitle>
        </DialogHeader>
        <AddModelForm />
      </DialogContent>
    </Dialog>
  );
};
