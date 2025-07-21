// utils/formatDate.ts
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";

dayjs.extend(relativeTime);
dayjs.locale("es");

export const formatRelativeDate = (date: Date | string) => {
  return dayjs(date).fromNow();
};
export const formatFullDate = (date: Date | string) => {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
};