import { FileUploadComponent } from "./file-upload";
import { InputNumber } from "./input-number";
import { InputText } from "./input-text";
import { SelectComponent } from "./select";
import { SliderComponent } from "./slider";
import { SwitchComponent } from "./switch";

interface InputComponentProps {
  inputSchema: any;
}

export const InputComponent: React.FC<InputComponentProps> = ({
  inputSchema,
}) => {
  return (
    <>
      {inputSchema.map((item: any, key: string) => {
        const type = item.type;
        switch (type) {
          case "string":
            return (
              <InputText
                title={item.title ?? ""}
                description={item.description ?? ""}
                defaultValue={item.default ?? ""}
                property={item.key}
                key={key}
              />
            );
          case "number":
          case "integer":
            return (
              <InputNumber
                type={item.type ?? ""}
                title={item.title ?? ""}
                description={item.description ?? ""}
                defaultValue={item.default ?? ""}
                property={item.key}
                key={key}
              />
            );
          case "file":
            return (
              <FileUploadComponent
                title={item.title}
                description={item.description}
                property={item.key}
                key={key}
              />
            );
          case "enum":
            return (
              <SelectComponent
                title={item.title}
                description={item.description ?? ""}
                defaultValue={item.default ?? item.options[0]}
                property={item.key}
                options={item.options}
                key={key}
              />
            );
          case "slider":
            return (
              <SliderComponent
                title={item.title}
                description={item.description ?? ""}
                defaultValue={item.default ?? ""}
                property={item.key}
                minimum={item.minimum}
                maximum={item.maximum}
                key={key}
              />
            );
          case "boolean":
            return (
              <SwitchComponent
                title={item.title}
                description={item.description ?? ""}
                defaultValue={item.default ?? ""}
                property={item.key}
                key={key}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};
