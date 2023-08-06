export type KEYWORD = {
  text: string;
  link: string;
}

export async function fetchAndSaveKeywordSettings(): Promise<void> {
  const options: { appId: string, apiToken: string; targetFieldCode: string, referenceFieldCode: string } = await new Promise((resolve) => {
    chrome.storage.local.get(
      ["appId", "apiToken", "targetFieldCode", "referenceFieldCode", "keywords"],
    (result) => {
      resolve({ 
        appId: result.appId,
        apiToken: result.apiToken,
        targetFieldCode: result.targetFieldCode,
        referenceFieldCode: result.referenceFieldCode,
      });
    });
  });
  if (options === null || options.appId === null || options.apiToken === null || options.targetFieldCode === null || options.referenceFieldCode === null) {
    return;
  }
  const resp = await fetch("/k/v1/records.json?app=" + options.appId, {
    headers: {
      "x-cybozu-api-token": options.apiToken,
    },
  });
  const json = await resp.json();
  let keywords: KEYWORD[] = [];
  json.records.forEach(
    (record: {
      [x: string]: { value: string };
    }) => {
      if (!keywords) {
        keywords = [];
      }
      keywords.push({
        text: record[options.targetFieldCode].value,
        link: record[options.referenceFieldCode].value,
      });
    }
  )
  chrome.storage.local.set({ ...options, keywords: keywords });
}
