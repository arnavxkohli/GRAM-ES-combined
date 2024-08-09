const Server = "https://gram-backend.vercel.app";

async function sendSignIn(postData) {
  try {
      const response = await fetch(`${Server}/user/signin`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
      });

      // Check if response is successful
      if (!response.ok) {
          throw new Error(`${response.json['message']}`);
      }

      // If successful, parse and return the response
      const responseData = await response.json();
      return responseData;
  } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      throw error; // Re-throwing the error for the caller to handle
  }
}


async function sendSignUp(postData) {
  try {
      const response = await fetch(`${Server}/user/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
      });

      // Check if response is successful
      if (!response.ok) {
          throw new Error(`${response.json['message']}`);
      }

      // If successful, parse and return the response
      const responseData = await response.json();
      return responseData;
  } catch (error) {
      // Handle any errors
      console.error('Error:', error);
      throw error; // Re-throwing the error for the caller to handle
  }
}


async function logout() {
  try {
    const response = await fetch(`${Server}/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Check if response is successful
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    // If successful, parse and return the response
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    // Handle any errors
    console.error('Error:', error);
    throw error; // Re-throwing the error for the caller to handle
  }
}

async function fetchSensorData(binId, sensorType, uId, defaultValue) {
  console.log(`${Server}/bin/fetch?uId=${uId}&sensor_type=${sensorType}&binId=${binId}`);
  return fetch(`${Server}/bin/fetch?uId=${uId}&sensor_type=${sensorType}&binId=${binId}`)
    .then(response => {
        if(!response.ok){
          console.log("Error occurred");
          return {
            "data": defaultValue
          };
        }
        return response.json();
    })
    .then(response => response)
    .catch(error => {
        console.error("Error fetching data: ", error);
        return {
          "data": defaultValue
        };
    });
}

async function fetchMessageData(binId, uId, messageType){
  console.log(`${Server}/bin/messages?uId=${uId}&message_type=${messageType}&binId=${binId}`);
  return fetch(`${Server}/bin/messages?uId=${uId}&message_type=${messageType}&binId=${binId}`)
    .then(response => {
      if(!response.ok){
        console.log("Error occurred");
        return {
          "data": false
        };
      }
      return response.json();
  })
  .then(response => response)
  .catch(error => {
      console.error("Error fetching data: ", error);
      return {
        "data": false
      };
  });
}

async function fetchBins(uId, defaultValue){
  return fetch(`${Server}/user/getbins?uId=${uId}`)
  .then(response => {
    if(!response.ok){
      console.log("Error occurred");
      return {
        "data": defaultValue
      };
    }
    return response.json()
  })
  .then(response => response)
    .catch(error => {
        console.error("Error fetching data: ", error);
        return {
          "data": defaultValue
        };
    });
}

async function addBins(uId, binName, defaultValue){
  return fetch(`${Server}//user/addbin?uId=${uId}&binName=${binName}`)
  .then(response => {
    if(!response.ok){
      console.log("Error occurred");
      return {
        "data": defaultValue
      };
    }
    return response.json()
  })
  .then(response => response)
    .catch(error => {
        console.error("Error fetching data: ", error);
        return {
          "data": defaultValue
        };
    });
}

async function contact(binId, uId){
  // TODO: implement contact form
 }


export{ sendSignUp, sendSignIn, fetchSensorData, fetchMessageData,  fetchBins, logout, contact };