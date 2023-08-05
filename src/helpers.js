import format from "date-fns/format"
export const formatDate = (date) => {
  return format(date, "MMM d, yyyy h:mma")
}