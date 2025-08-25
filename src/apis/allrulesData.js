import axios from "axios";

const getAllRules = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/ruleData`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all rules:", error);
    throw error;
  }
};

export default getAllRules;
