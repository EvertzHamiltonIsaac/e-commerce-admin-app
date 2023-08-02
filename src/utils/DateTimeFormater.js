import moment from "moment/moment";

export function FormatDateTime(dateTimeIsoFormat, format) {
  const momentObj = moment(dateTimeIsoFormat);
  momentObj.utcOffset(0);
  const formattedTimestamp = momentObj.format(format);
  return formattedTimestamp;
}
