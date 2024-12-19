import React, { useEffect, useState } from "react";

const FetchUrl = ({ setUrlContent }) => {
  useEffect(() => {
    async function fetchTabUrl() {
      const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
      if (tab && tab.url) {
        setUrlContent(tab.url);
      }
    }

    fetchTabUrl();
  }, [setUrlContent]);

  return null; 
}

export default FetchUrl;
