const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const fetchSubData = async () => {
  try {
    const data = await fetch(`${API_BASE_URL}/getUser`);
    const dataJson = await data.json();
    return dataJson;
  } catch (error) {
    return error;
  }
};

export default fetchSubData;
