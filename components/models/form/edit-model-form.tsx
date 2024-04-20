import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { uploadImage } from "@/lib/utils";
import { ModelSchema } from "@/schema/model";
import { ModelInfoType } from "@/types/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  modelData: ModelInfoType;
  page: number;
};

export const EditModelForm = ({ modelData, page }: Props) => {
  const [inputField, setInputField] = useState<string>("");
  const [inputFieldArr, setInputFieldArr] = useState<string[]>([]);
  const [editData, setEditData] = useState<any>();

  const [collectionField, setCollectionField] = useState<number>(0);
  const [collectionFieldArr, setCollectionFieldArr] = useState<number[]>([]);

  const [availability, setAvailability] = useState<boolean>(false);
  const [coverImageUrl, setCoverImageUrl] = useState<string>("");
  const [image, setImage] = useState<File>();

  const form = useForm<z.infer<typeof ModelSchema>>({
    resolver: zodResolver(ModelSchema),
    defaultValues: {
      name: "",
      short_desc: "",
      description: "",
      replicate_link: "",
    },
  });

  const handleInputField = (field: boolean) => {
    if (field) {
      if (inputField.trim() !== "") {
        setInputFieldArr([...inputFieldArr, inputField]);
        setInputField("");
      }
    } else {
      if (collectionField) {
        setCollectionFieldArr([...collectionFieldArr, collectionField]);
        setCollectionField(0);
      }
    }
  };

  const handleRemoveField = (i: number, input: boolean) => {
    if (input)
      setInputFieldArr((prevArr) => prevArr.filter((_, index) => index !== i));
    else
      setCollectionFieldArr((prevArr) =>
        prevArr.filter((_, index) => index !== i),
      );
  };
  const { mutate: editModelData, isPending: isEditing } = useMutation({
    mutationFn: async () => {
      try {
        const res = await axios.put(
          `/api/model/update/${modelData?.name}`,
          editData,
        );
        console.log(res);
      } catch (error) {
        throw new Error("Something went wrong");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["models-list", page] });
    },
    onError: () => console.log("Something went wrong"),
  });

  async function onSubmit(values: z.infer<typeof ModelSchema>) {
    let payload = {
      cover_image_url: coverImageUrl,
      name: values?.name,
      urls: {},
      short_desc: values?.short_desc,
      description: values?.description,
      input_fields: inputFieldArr,
      availability: availability,
      replicate_link: values?.replicate_link,
      collection_id: collectionFieldArr,
    };
    if (image) {
      const cover_image = await uploadImage(image);
      if (cover_image && cover_image?.url !== "") {
        payload = { ...payload, cover_image_url: cover_image?.url };
      }
    }
    // console.log(payload);
    
    setEditData(payload);
    if (editData) {
      editModelData();
    }
  }

  const queryClient = useQueryClient();

  useEffect(() => {
    form.setValue("name", modelData?.name);
    form.setValue("description", modelData?.description);
    form.setValue("short_desc", modelData?.short_desc);
    form.setValue("replicate_link", modelData?.replicate_link);
    setAvailability(modelData?.availability);
    setCollectionFieldArr(modelData?.collection_id);
    setInputFieldArr(modelData?.api_schema?.Input?.rendered);
    setCoverImageUrl(modelData?.cover_image_url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelData]);

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter here..."
                    className="bg-white text-black placeholder:text-black"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="replicate_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Replicate Link</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter here..."
                    className="bg-white text-black placeholder:text-black"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-black text-sm">Input Fields</h1>
            <div className="flex items-center gap-2">
              <Input
                value={inputField}
                onChange={(e) => setInputField(e.target.value)}
                placeholder="Enter here..."
                className="bg-white text-black placeholder:text-black"
              />
              <Button
                className="min-h-[55px] text-xl"
                type="button"
                onClick={() => handleInputField(true)}
              >
                Add <Plus />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {inputFieldArr?.map((item, i) => (
                <p
                  onClick={() => handleRemoveField(i, true)}
                  className="flex items-center gap-1 bg-black p-2 rounded-md w-fit text-white"
                  key={i}
                >
                  {item} <X />
                </p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-black text-sm">Collections</h1>
            <div className="flex items-center gap-2">
              <Input
                value={collectionField}
                onChange={(e) => {
                  if (!isNaN(Number(e.target.value)))
                    setCollectionField(Number(e.target.value));
                }}
                placeholder="Enter here..."
                className="bg-white text-black placeholder:text-black"
              />
              <Button
                className="min-h-[55px] text-xl"
                type="button"
                onClick={() => handleInputField(false)}
              >
                Add <Plus />
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {collectionFieldArr?.map((item, i) => (
                <p
                  onClick={() => handleRemoveField(i, false)}
                  className="flex items-center gap-1 bg-black p-2 rounded-md w-fit text-white"
                  key={i}
                >
                  {item} <X />
                </p>
              ))}
            </div>
          </div>
          <FormField
            control={form.control}
            name="short_desc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter here..."
                    className="bg-white text-black placeholder:text-black"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter here..."
                    className="bg-white text-black placeholder:text-black resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="picture-edit">Upload new</Label>
            <Input
              id="picture-edit"
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setImage(e.target.files[0]);
                }
              }}
              className="flex-1 bg-white text-black"
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <h1 className="font-medium text-black text-sm">Availibility</h1>
            <Switch
              checked={availability}
              onCheckedChange={(field) => setAvailability(field)}
            />
          </div>
          <Button
            type="submit"
            disabled={isEditing === true}
            className="w-full"
          >
            Submit {isEditing === true && <Loader color="#fff" size={14} />}
          </Button>
        </form>
      </Form>
    </div>
  );
};
