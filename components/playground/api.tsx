import React, { useState } from "react";
import { useModel } from "../contexts/model-context";
import { CodeBlock } from "react-code-block";
import { useCopyToClipboard } from "react-use";

export const API = () => {
  const { model, input } = useModel();
  const codeTemplate: { [key: string]: string } = {
    python: `from tensor_processor import Tpu

tensor = Tpu( apiKey = YOUR_TPU_API_KEY )

output = tensor.prediction(
  model: "${model}",
  input: ${JSON.stringify(input, null, 4)}
)

print(output)
`,

    typescript: `import Tpu from "@tynevosa/tensor-processor";

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
`,
  };
  const supportedLangs = ["typescript", "python"];
  const [activeLang, setActiveLang] = useState(supportedLangs[0]);
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    copyToClipboard(codeTemplate[activeLang]);
  };
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
              <p className="flex flex-row text-base font-semibold">{lang}</p>
            </button>
          ))}
        </div>
        <div className="flex overflow-x-scroll">
          <CodeBlock code={codeTemplate[activeLang]} language={activeLang}>
            <div className="relative">
              <CodeBlock.Code className="bg-gray-900 !p-6 rounded-xl shadow-lg">
                <div className="table-row">
                  <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
                  <CodeBlock.LineContent className="table-cell">
                    <CodeBlock.Token />
                  </CodeBlock.LineContent>
                </div>
              </CodeBlock.Code>

              <button
                className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
                onClick={copyCode}
              >
                {state.value ? "Copied!" : "Copy code"}
              </button>
            </div>
          </CodeBlock>
        </div>
      </div>
    </div>
  );
};
