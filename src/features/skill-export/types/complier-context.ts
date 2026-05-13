export interface CompilerContext {
  variables: Set<string>;
  auxiliaryFiles: Record<string, string>;
}