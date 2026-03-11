const fs = require("fs");
const axios = require("axios");
const path = require("path");

module.exports = {
  config: {
    name: "left",
    eventType: ["log:unsubscribe"],
    version: "1.0",
    author: "〲MAMUNツ࿐ T.T　o.O",
    description: "Send image when someone leaves"
  },

  onEvent: async function ({ api, event }) {
    const { threadID, logMessageData } = event;
    const leftID = logMessageData.leftParticipantFbId;

    if (leftID == api.getCurrentUserID()) return;

    const imgPath = path.join(__dirname, "cache", "leftkick.jpg");

    // image download
    if (!fs.existsSync(imgPath)) {
      const res = await axios.get("https://i.imgur.com/dsZQoHA.jpeg", { responseType: "arraybuffer" });
      fs.writeFileSync(imgPath, Buffer.from(res.data));
    }

    const msg = {
      body: "Bismillah... Kick! 😹\n\n@user left the group!",
      mentions: [
        {
          id: leftID,
          tag: "@user"
        }
      ],
      attachment: fs.createReadStream(imgPath)
    };

    api.sendMessage(msg, threadID);
  }
};
