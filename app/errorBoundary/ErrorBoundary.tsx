import { useEffect, useState } from "react"

import RefreshIcon from "@mui/icons-material/Refresh"
import CircularProgress from "@mui/material/CircularProgress";

import { Button, Text } from "@/shared/ui"

export const ErrorFallback = () => {
  const [isLoading, setIsLoading] = useState(true)

  // NOTE: reloading from Vite reload error takes some time
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-gray-600/50 backdrop-blur-sm flex items-center justify-center z-50">
          <CircularProgress size={48} />
        </div>
      )}
      <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-gray-100 p-8">
        <div className="text-center">
          <Text
            variant="h1"
            className="!text-4xl !font-bold !mb-4 !text-center"
          >
            Technical work is being carried out
          </Text>

          <Button
            variant="contained"
            onClick={handleReload}
            startIcon={<RefreshIcon />}
            size="large"
            className="!px-8 !py-3"
          >
            Reload Page
          </Button>
        </div>
      </div>
    </>
  )
}
