import { useState } from "react";

import Header from "./components/Header";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState(false);

  return (
    <div>
      <Header
        boardModalOpen={boardModalOpen}
        setBoardModalOpen={setBoardModalOpen}
      />
    </div>
  );
}

export default App;
