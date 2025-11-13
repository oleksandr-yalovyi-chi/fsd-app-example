import { ShareMeta } from "@/shared/ui/"

import AppProvider from "./providers/index"
import { AppRouter } from "./routing/router"
import "./styles/index.css"

function App() {
  return (
    <AppProvider>
      <ShareMeta />
      <AppRouter />
    </AppProvider>
  )
}

export default App
