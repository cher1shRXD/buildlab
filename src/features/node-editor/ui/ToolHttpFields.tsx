"use client";

import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";
import { Select } from "@/shared/ui/Select";
import { SelectContent } from "@/shared/ui/SelectContent";
import { SelectItem } from "@/shared/ui/SelectItem";
import { SelectTrigger } from "@/shared/ui/SelectTrigger";
import { SelectValue } from "@/shared/ui/SelectValue";
import type { ToolNodeData } from "@/entities/flow/types";

interface Props {
  data: ToolNodeData;
  u: (field: string, value: unknown) => void;
}

const ToolHttpFields = ({ data, u }: Props) => (
  <div className="rounded-xl border border-border/60 bg-muted/20 overflow-hidden">
    <div className="flex border-b border-border/40">
      <Select value={data.method ?? "GET"} onValueChange={(v: string | null) => v && u("method", v)}>
        <SelectTrigger className="w-24 h-10 text-sm rounded-none border-0 border-r border-border/40 bg-card">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {["GET", "POST", "PUT", "DELETE"].map((m) => (
            <SelectItem key={m} value={m} className="text-sm">{m}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input className="h-10 text-sm rounded-none border-0 flex-1 bg-transparent font-mono" placeholder="https://api.example.com/endpoint" value={data.url ?? ""} onChange={(e) => u("url", e.target.value)} />
    </div>
    {data.method !== "GET" && (
      <div className="px-4 py-3">
        <p className="text-xs text-muted-foreground mb-2">요청 데이터 (선택)</p>
        <Textarea rows={3} className="text-sm border-0 bg-transparent px-1 py-0 resize-none focus-visible:ring-0 font-mono placeholder:text-muted-foreground/50" placeholder={'{"key": "{{variable}}"}'} value={data.body ?? ""} onChange={(e) => u("body", e.target.value)} />
      </div>
    )}
  </div>
);

export default ToolHttpFields;
