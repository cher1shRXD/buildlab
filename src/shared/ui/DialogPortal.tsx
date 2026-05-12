"use client"

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"

interface DialogPortalProps extends DialogPrimitive.Portal.Props {}

export const DialogPortal = ({ ...props }: DialogPortalProps) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}
