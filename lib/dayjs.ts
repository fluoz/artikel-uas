import { default as _dayjs } from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/id";

_dayjs.extend(utc);
_dayjs.extend(timezone);
_dayjs.extend(relativeTime);

_dayjs.locale("id");

export const dayjs = _dayjs;
export default _dayjs;
