import axios from "axios";

const executeRuleData = async (data) => {

  // https://tytlmsdemo.newgensoftware.net:8443/ChampionChallenger/uploadNew
  // http://127.0.0.1:8080/uploadNew
  try {
    const response = await axios.post("https://tytlmsdemo.newgensoftware.net:8443/ChampionChallenger/uploadNew", data);
    
    return response.data;
  } catch (error) {
    console.error("Error executing rule data:", error);
    throw error;
  }
};

export default executeRuleData;
