import { IJWTPayload, ParsedUserInfo } from "../models/common";
import { isPropEmpty, strCmp } from "./utilfunctions";

export default class DyBaseUrlConfigurator {
  baseUrl = process.env.REACT_APP_API_URL;
  private __baseurlInstance = new URL(this.baseUrl as string);
  parsedUserInfo!: ParsedUserInfo;

  get serverAddress(): string {
    return this.__baseurlInstance?.hostname;
  }
  get serverPort(): string {
    return this.__baseurlInstance?.port;
  }

  get activeBaseUrl(): string | null {
    return localStorage.getItem("activeBaseUrl");
  }

  set setAccesstoken(token: string) {
    localStorage.setItem("access_token", token);
  }

  set setRefreshtoken(token: string) {
    localStorage.setItem("refresh_token", token);
  }

  get jwtAccesToken(): string | null {
    return localStorage.getItem("access_token");
  }

  get jwtRefreshToken(): string | null {
    return localStorage.getItem("refresh_token");
  }

  get originalBaseUrl(): string | null {
    return localStorage.getItem("originalBaseUrl");
  }

  set setActiveBaseUrl(url: string) {
    localStorage.setItem("activeBaseUrl", url);
  }

  set setOriginalBaseUrl(url: string) {
    localStorage.setItem("originalBaseUrl", url);
  }

  navigatorBack(isInvokedViaRoute: boolean) {
    if (isInvokedViaRoute) {
      window.history.back();
    }
  }

  setParsedTokenData() {
    const parsedTokenData = this.parseJwt(this.jwtAccesToken as string);
    this.parsedUserInfo = {
      id: parsedTokenData?.identity?.groups?.[0]?.id,
      username: parsedTokenData?.identity?.username,
      role: parsedTokenData?.identity?.groups?.[0]?.name,
      token: this.jwtAccesToken as string,
      description: parsedTokenData?.identity?.groups?.[0]?.description,
      permissions: parsedTokenData?.identity?.groups?.[0]?.permissions,
      tokenIssueEpoch: parsedTokenData?.iat,
      tokenExpEpoch: parsedTokenData?.exp,
    };
  }

  parseJwt(token: string): IJWTPayload {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  setActiveBaseIfNotPresent() {
    if (isPropEmpty(this.activeBaseUrl)) {
      this.setActiveBaseUrl = this.originalBaseUrl as string;
    }
  }

  initBaseURLConfigurator(apiUrl?: string) {
    this.baseUrl = apiUrl ?? process.env.REACT_APP_API_URL;
    this.setOriginalBaseUrl = this.baseUrl as string;
    this.setActiveBaseIfNotPresent();

    if (this.canOverrideAPI()) {
      this.baseUrl = this.activeBaseUrl as string;
    }

    this.__baseurlInstance = new URL(this.baseUrl as string);

    this.logConnectionDetails();
  }

  canOverrideAPI() {
    const shouldOverride =
      strCmp(this.activeBaseUrl, this.originalBaseUrl) === false &&
      this.activeBaseUrl !== null &&
      this.originalBaseUrl !== null;
    return shouldOverride;
  }

  restoreOriginalBaseURL() {
    if (this.originalBaseUrl !== null) {
      this.setActiveBaseUrl = this.originalBaseUrl;
    }
  }

  logConnectionDetails() {
    console.log(
      `==================\nCONNECTION DETAILS\n==================\n${"REACT_INFRA"} ` +
        "\nServer: " +
        this.serverAddress +
        "\nPort: " +
        this.serverPort +
        "\nBase URL: " +
        this.baseUrl +
        "\n\n"
    );
  }

  openLink(urlToOpen: string, openInNewTab = false) {
    let url = "";
    if (!/^http[s]?:\/\//.test(urlToOpen)) {
      url += "http://";
    }

    url += urlToOpen;
    const launchTarget = openInNewTab ? "_blank" : "_self";
    window.open(url, launchTarget);
  }

  reloadWindow() {
    let currentURL = window.location.href;

    if (currentURL.includes("/config")) {
      currentURL = currentURL.substring(0, currentURL.lastIndexOf("/"));
    }

    this.openLink(currentURL);
    window.location.reload();
  }

  invokePrompt(isInvokedViaRoute = false): Promise<boolean> {
    return new Promise((resolve) => {
      const updatedSegment = prompt(
        "\nEdit base URL segments and click OK, page will reload if the new URL is different.\n\nNote: you can clear the input box and click OK to force a reset of the base URL configuration.\n\nEnter new base URL:",
        this.activeBaseUrl as string
      );

      // Return if the user has not changed anything.
      if (
        updatedSegment === null ||
        strCmp(updatedSegment, this.activeBaseUrl)
      ) {
        resolve(false);
        // this.navigatorBack(isInvokedViaRoute);
        return;
      }

      if (updatedSegment?.toString()?.trim()?.length <= 0) {
        const answer = window.confirm(
          "Are you sure you want to restore the original base URL configuration?"
        );

        if (answer === true) {
          this.restoreOriginalBaseURL();
          this.reloadWindow();
        } else {
          resolve(false);
          //   this.navigatorBack(isInvokedViaRoute);
        }

        return;
      }

      if (!this.isStringValidURL(updatedSegment)) {
        alert("You have entered an invalid URL, no changes were made.");
        resolve(false);
        // this.navigatorBack(isInvokedViaRoute);
        return;
      }

      this.setActiveBaseUrl = updatedSegment;
      resolve(true);
    });
  }

  isStringValidURL(str: string) {
    let url: URL;
    try {
      url = new URL(str);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
}
