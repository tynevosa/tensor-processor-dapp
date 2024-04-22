import React, { useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CodeBlockComponent from "@/components/ui/code-block";
import { CopyBlock, dracula } from 'react-code-blocks';
import { useModel } from "../contexts/model-context";

export const API = () => {
  const { model, input } = useModel();
  const codeTemplate: {[key: string]: string} = {
"python": `from tensor_processor import Tpu

tensor = Tpu( apiKey = YOUR_TPU_API_KEY )

output = tensor.prediction(
  model: "${model}",
  input: ${JSON.stringify(input, null, 4)}
)

print(output)
`,

"typescript": `import Tpu from "@tynevosa/tensor-processor";

const tensor: Tpu = new Tpu({
  apiKey: YOUR_TPU_API_KEY,
});

tensor.prediction({
  model: "${model}",
  input: ${JSON.stringify(input, null, 4)}
})
.then((output) => {
  console.log(output);
});
`
  };
  const supportedLangs = ['typescript', 'python'];
  const [activeLang, setActiveLang] = useState(supportedLangs[0]);
  return (
    <div className="flex py-[10px] w-full">
      <div className="p-4 space-y-2 max-w-full">
        <div className="flex py-1 px-1 bg-[#0E0E16] rounded-lg">
          {supportedLangs.map((lang, index) => (
            <button
              className={`${
                activeLang === lang
                  ? "text-white bg-[#262E47]"
                  : "text-gray-600"
              } rounded-lg flex flex-row items-center px-2 py-3 font-light justify-center`}
              key={lang}
              onClick={() => setActiveLang(lang)}
            >
              <p className="flex flex-row text-base font-semibold">
                {lang}
              </p>
            </button>
          ))}
        </div>
        <div className="flex overflow-x-scroll">
          <CopyBlock
            language={activeLang}
            text={codeTemplate[activeLang]}
            theme={dracula}
            wrapLines={true}
            codeBlock
          />
        </div>
      </div>
    </div>
  );
};
