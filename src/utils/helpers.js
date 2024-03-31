import { differenceInDays, formatDistance, parseISO } from "date-fns";
// import translate from "google-translate-api";

// import { differenceInDays } from "date-fns/esm";
// import { differenceInDays } from "date-fns/esm";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);

  return today.toISOString();
};

export function formatCurrency(value, lng = "en", currency = "usd") {
  if (isNaN(value)) return "converting...";

  const formattedCurrency = new Intl.NumberFormat(lng, {
    style: "currency",
    currency: currency,
  }).format(value);

  return formattedCurrency;
}

export async function getLocation(locationQuery) {
  const apiKey = "d41a2c7c6df8426595fd0f868fc49e21";
  const res = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${locationQuery}&key=${apiKey}
`
  );

  if (!res.ok)
    throw new Error(
      "Sorry, we encountered an issue while processing your request. Please try again later"
    );

  const data = await res.json();

  const location = data?.results?.map((location) => location.formatted) || [];

  return location;
}

export function capitalize(str) {
  if (!str) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function handleLinkScroll(e) {
  e.preventDefault();
  const headerHeight = document.getElementById("header-app").offsetHeight;
  const targetId = e.target.closest("a").getAttribute("href");
  const targetElement = document.querySelector(targetId);

  if (targetElement) {
    const targetPosition = targetElement.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}
