
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import type { DialogLayoutProps } from './layouts.theme'


const DialogLayout = ({ open, onOpenChange, title, TitleIcon, children }: DialogLayoutProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Note: We use 'flex flex-col overflow-hidden' to ensure 
        the header stays fixed while content can scroll independently.
      */}
      <DialogContent className="w-[95vw] lg:min-w-4xl max-h-[90dvh] overflow-y-auto p-5 sm:p-8 rounded-3xl md:p-10">
        {/* <DialogHeader className="shrink-0 sticky top-0"> */}
        {/* //@Todo make header sticky */}
        <DialogHeader className="shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl font-semibold tracking-tight ">
            {TitleIcon}
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* This container acts as the scroll-safe area for children */}
        {/* <div className="flex-1 overflow-y-auto lg:overflow-visible mt-6"> */}
          {children}
        {/* </div> */}
      </DialogContent>
    </Dialog>
  )
}

export default DialogLayout