import axios from 'axios';

export const AddOrUpdate = async (
    trnId,
    trnAlgoType,
    trnPaymentType,
    trnTitle,
    trnDesc,
    trnPrice
  ) => {
    const data = JSON.stringify({
      idTournament: trnId,
      idTournamentAlgorithmType: trnAlgoType,
      idTournamentPaymentType: trnPaymentType,
      trnTitle: trnTitle,
      trnDesc: trnDesc,
      trnCost: trnPrice ? trnPrice : 0});


    const res = await axios.post(
      `${process.env.BASE_API_URL}/Tournament/AddOrUpdate`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
          accept: "*/*",
          "Access-Control-Allow-Origin": "*"},
          
      }
    )
      .catch((err) => {
        console.log("Error", err);
      });
    if (res) {
      // return user.data
    }
  };
