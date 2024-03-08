import axios from 'axios';

export const scanDatabase = async (scanEndpoint) => {
  try {
    const res = await axios.get(
      `https://weak-puce-toad-garb.cyclic.app${scanEndpoint}`
    );
    // const res = fetch(`https://weak-puce-toad-garb.cyclic.app${scanEndpoint}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    if (res.data.Count) return res.data.Items;
  } catch (error) {
    console.log(error);
  }
};
