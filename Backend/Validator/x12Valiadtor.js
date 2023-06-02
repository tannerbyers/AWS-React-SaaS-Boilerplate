exports.handler = async function (event) {
  const body = event.body;
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
};
