const constants = {
  api: moves => (
    `https://w0ayb2ph1k.execute-api.us-west-2.amazonaws.com/production?moves=${JSON.stringify(moves)}`
  ),
};

export default constants;