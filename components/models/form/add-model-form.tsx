import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ModelSchema } from "@/schema/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {};

export const AddModelForm = (props: Props) => {
  const [inputField, setInputField] = useState<string>("");
  const [inputFieldArr, setInputFieldArr] = useState<string[]>([]);

  const [collectionField, setCollectionField] = useState<number>(0);
  const [collectionFieldArr, setCollectionFieldArr] = useState<number[]>([]);

  const form = useForm<z.infer<typeof ModelSchema>>({
    resolver: zodResolver(ModelSchema),
    defaultValues: {
      cover_image_url: "",
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

  function onSubmit(values: z.infer<typeof ModelSchema>) {
    const payload = {
      cover_image_url:
        "https://tpu-marketplace.b-cdn.net/Cover%20Image/Whisper%20Jet.jpg", // Todo : Add Image Picker
      name: values?.name,
      urls: {},
      short_desc: values?.short_desc,
      description: values?.description,
      input_fields: inputFieldArr,
      availability: false,
      replicate_link: values?.replicate_link,
      collection_id: collectionFieldArr,
    };
    console.log(payload);
  }
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
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
