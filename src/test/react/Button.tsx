// Button.tsx
import React, { useState } from 'react';

export function Button(): JSX.Element {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      {clicked && <p>You clicked the button!</p>}
    </div>
  );
}
