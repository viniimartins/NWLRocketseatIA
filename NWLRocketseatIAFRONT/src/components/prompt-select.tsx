import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { api } from "@/lib/axios";

interface Prompt {
  id: string;
  title: string;
  template: string;
}

interface PromptSelectProps {
  onPromptSelect: (template: string) => void;
}

export function PromptSelect(props: PromptSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null);

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  function handlePromptSelect(promptId: string) {
    const selectPrompt = prompts?.find((prompt) => prompt.id === promptId);

    if (!selectPrompt) {
      return;
    }

    props.onPromptSelect(selectPrompt.template);
  }

  return (
    <Select onValueChange={handlePromptSelect}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map((promot) => {
          return (
            <SelectItem key={promot.id} value={promot.id}>
              {promot.title}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
