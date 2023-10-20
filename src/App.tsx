import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import "./App.css";
import { defaultQueryClient } from "./utils/defaultQueryClient";
import { Folders } from "./components/Folders";
import { Toaster } from "react-hot-toast";

function App() {
  const [queryClient] = useState(() => defaultQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Folders />
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
}

export default App;
