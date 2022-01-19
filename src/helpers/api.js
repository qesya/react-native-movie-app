import Config from 'react-native-config';

export const requestApi = async (params = {}) => {
  const esc = encodeURIComponent;
  const combinedParams = { apikey: Config.API_KEY, ...params };
  const queries = combinedParams
     ? `?${Object.keys(combinedParams)
          .map(k => `${esc(k)}=${esc(combinedParams[k])}`)
          .join("&")}`
     : ""
  return await fetch(`${Config.API_URL}/${queries}`, {
     method: "GET",
     headers: {
        Accept: "text/html"
     },
  })
     .then(raw => raw.json())
}
