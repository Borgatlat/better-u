import { Button, type ButtonProps } from "@/components/ui/button"
import { AppleIcon } from "lucide-react"

export interface TestFlightButtonProps extends ButtonProps {}

export function TestFlightButton({ className, ...props }: TestFlightButtonProps) {
  return (
    <Button
      as="a"
      href="https://testflight.apple.com/join/9TQrDfBx"
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      <AppleIcon className="mr-2 h-4 w-4" />
      Join iOS Beta
    </Button>
  )
}
