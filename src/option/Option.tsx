import { useEffect } from "react";
import "./Option.css";

function getAppId() {
  return (document.getElementById("target-app-id") as HTMLInputElement).value;
}

function setAppId(appId: string) {
  (document.getElementById("target-app-id") as HTMLInputElement).value = appId;
}

function getApiToken() {
  return (document.getElementById("target-app-api-token") as HTMLInputElement)
    .value;
}

function setApiToken(apiToken: string) {
  (document.getElementById("target-app-api-token") as HTMLInputElement).value =
    apiToken;
}

function getTargetFieldCode() {
  return (
    document.getElementById("target-field-field-code") as HTMLInputElement
  ).value;
}

function setTargetFieldCode(targetFieldCode: string) {
  (
    document.getElementById("target-field-field-code") as HTMLInputElement
  ).value = targetFieldCode;
}

function getReferenceFieldCode() {
  return (
    document.getElementById("reference-field-field-code") as HTMLInputElement
  ).value;
}

function setReferenceFieldCode(referenceFieldCode: string) {
  (
    document.getElementById("reference-field-field-code") as HTMLInputElement
  ).value = referenceFieldCode;
}

function onSaveHandler() {
  chrome.storage.local.set({
    appId: getAppId(),
    apiToken: getApiToken(),
    targetFieldCode: getTargetFieldCode(),
    referenceFieldCode: getReferenceFieldCode(),
  }).catch((error) => {
    // chrome.storage.local は 5MB までしか保存できないので、5MB 以上を保存しようとするとエラーになる
    alert(error);
  });
}

function Option() {
  useEffect(() => {
    chrome.storage.local.get(["appId", "apiToken"], (result) => {
      result.appId && setAppId(result.appId);
      result.apiToken && setApiToken(result.apiToken);
      result.targetFieldCode && setTargetFieldCode(result.targetFieldCode);
      result.referenceFieldCode && setReferenceFieldCode(result.referenceFieldCode);
    });
  }, []);
  return (
    <>
      <div>
        <label htmlFor="target-app-id">アプリID</label>
        <input id="target-app-id"></input>
      </div>
      <div>
        <label htmlFor="target-app-api-token">APIトークン</label>
        <input id="target-app-api-token"></input>
      </div>
      <div>
        <label htmlFor="target-field-field-code">
          キーワード候補にする対象フィールド(フィールドコード)
        </label>
        <input id="target-field-field-code"></input>
      </div>
      <div>
        <label htmlFor="reference-field-field-code">
          キーワードに付与するリンクか文字列のフィールド(フィールドコード)
        </label>
        <input id="reference-field-field-code"></input>
      </div>
      <button onClick={onSaveHandler}>保存</button>
    </>
  );
}

export default Option;
