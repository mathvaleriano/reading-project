import { useState } from 'react';

const useIsEditing = () => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => setIsEditing(!isEditing);

  return { isEditing, toggleIsEditing };
};

export default useIsEditing;
