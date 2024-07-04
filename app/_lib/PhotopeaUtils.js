// PhotopeaUtils.js

export const Photopea = {
  runScript: async function (contentWindow, script) {
    return new Promise((resolve) => {
      const outputArray = [];
      window.addEventListener("message", function messageHandle(e) {
        if (e.source === contentWindow) {
          outputArray.push(e.data);
          if (e.data === "done") {
            resolve(outputArray);
            window.removeEventListener("message", messageHandle);
          }
        }
      });
      contentWindow.postMessage(script, "*");
    });
  },
};

export const PSDFileLoader = async function (contentWindow, PSDFile) {
  await Photopea.runScript(contentWindow, `app.open("${PSDFile}")`);
  /*
  const layerCheckInterval = async () => {
    layerCountNew = (
      await Photopea.runScript(
        contentWindow,
        `app.echoToOE(app.activeDocument.layers.length)`
      )
    )[0];
    if (layerCountNew === layerCountOld + 1) {
      resolve();
    } else {
      setTimeout(layerCheckInterval, 50);
    }
  };
   */
};

export const addImageAndWait = async function (contentWindow, imgURI) {
  return new Promise(async (resolve) => {
    let layerCountOld = "done";
    while (layerCountOld === "done") {
      layerCountOld = await Photopea.runScript(
        contentWindow,
        `app.echoToOE(app.activeDocument.layers.length)`
      );
    }

    let layerCountNew = layerCountOld;

    await Photopea.runScript(
      contentWindow,
      `app.open("${imgURI}", null, true);`
    );
    const layerCheckInterval = async () => {
      layerCountNew = (
        await Photopea.runScript(
          contentWindow,
          `app.echoToOE(app.activeDocument.layers.length)`
        )
      )[0];
      if (layerCountNew === layerCountOld + 1) {
        resolve();
      } else {
        setTimeout(layerCheckInterval, 50);
      }
    };
    layerCheckInterval();
  });
};

export const getDocumentAsImage = async function (contentWindow) {
  return new Promise(async (resolve) => {
    Photopea.runScript(
      contentWindow,
      "app.activeDocument.saveToOE('png')"
    ).then((data) => {
      const buffer = data[0];
      const fR = new FileReader();
      fR.addEventListener("load", function (e) {
        const img = new Image();
        img.src = e.target.result;
        resolve(img);
      });
      fR.readAsDataURL(new Blob([buffer], { type: "image/png" }));
    });
  });
};
