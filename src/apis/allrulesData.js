import axios from "axios";

const getAllRules = async () => {
  try {
    const response = await axios.get("https://tytlmsdemo.newgensoftware.net:8443/ChampionChallenger/ruleData");
    return response.data;
  } catch (error) {
    console.error("Error fetching all rules:", error);
    throw error;
  }
};

export default getAllRules;
