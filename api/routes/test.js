var fetch = require(fetch);
(async () => {
  const rawResponse = await fetch(
    "http://netpeople-mia-us-en-rd-staging.inago.co.jp/NPWI/NPWI_2C.do",
    {
      method: "POST",
      headers: {
        Accept: "application/text",
        "Content-Type": "application/text"
      },
      body:
        'requestType=StartSession&payload=<NPCML%20TYPE%3D"SessionRequest"%20newSession%3D"true"%20NEEDSESSIONID%3D"true">' +
        "<UserID>24</UserID>" +
        "<ClientID>ImportAndParseCGI</ClientID>" +
        "<ClientVersion>1.0</ClientVersion>" +
        "<ClientDesign>ImportAndParseCGI</ClientDesign>" +
        "<ClientType>Web</ClientType>" +
        "<DeviceID>PC</DeviceID>" +
        "<CompanyID>inago_test_app</CompanyID>" +
        "<StartupParameters>sayfrom%3D%26amp;AgentVersionIndex%3D214</StartupParameters>" +
        "<LocalTargets></LocalTargets>" +
        "</NPCML>"
    }
  );

  const content = await rawResponse.text;
  console.log(content);
})();
