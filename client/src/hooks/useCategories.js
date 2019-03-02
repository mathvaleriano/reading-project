import { useEffect, useState } from 'react';

const useCategories = (categories) => {
  const [categoryOptions, setCategories] = useState([]);

  useEffect(() => {
    const options = categories.map(
      ({ name, path }) => ({ key: path, text: name, value: path }),
    );
    setCategories(options);
  }, [categories]);

  return categoryOptions;
};

export default useCategories;
