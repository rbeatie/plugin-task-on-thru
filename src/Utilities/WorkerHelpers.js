export async function updateWorker(token, options) {

  const {
    nextProps,
    workspaceSid,
    workerSid,
    updateWorkerUrl
  } = options;

  return await fetch(
    updateWorkerUrl,
    {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: token,
        nextProps: nextProps,
        workspaceSid: workspaceSid,
        workerSid: workerSid
      })
    })
    .then(
      async (fetchResponse) => {
      const response = await fetchResponse.json();
      console.log('FETCH RESPONSE', response);
      return response;
    })
    .catch(err => console.error(err));
}

function objectToURLParams(params) {
  const result =  Object.keys(params).reduce((acc, key, index) => {
    return acc += index === 0
      ? `${key}=${params[key]}cur`
      : `&${key}=${params[key]}cur`;
  }, '');

  return encodeURI(result);
}

