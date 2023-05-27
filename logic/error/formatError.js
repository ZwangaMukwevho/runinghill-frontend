export function formatErrorMessage(error) {
  switch (error) {
    case "uploadErrror":
      return "A problem occured saving, please try again or contact support centre";
    case "fetchError":
      return "It appears we are experiencing an outage, please load page again or contact support centre";
    default:
      return "Error: Please try again or contact support centre";
  }
}
