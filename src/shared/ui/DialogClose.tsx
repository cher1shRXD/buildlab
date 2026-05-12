"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

interface DialogCloseProps extends DialogPrimitive.Close.Props {}

export const DialogClose = ({ ...props }: DialogCloseProps) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}
