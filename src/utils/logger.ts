import logger from "pino";
import dayjs from "dayjs";

export default logger({
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

