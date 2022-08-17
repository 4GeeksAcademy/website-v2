/**
 *
 * @param {Information to send to the backend} formData
 * @param {Any tag from active campaign} tags
 * @param {hard, soft, newsletter, etc} automations
 * @param {session information object} session
 */
export const save_form = async (
  formData = null,
  tags = [],
  automations = [],
  session = null,
  token = null,
  action = null,
) => {
  if (!Array.isArray(tags)) throw Error("Tags must be an array");
  if (typeof session !== "object") throw Error("Missing session");
  if (typeof formData !== "object") throw Error("Missing formData");
  const getEnvironmentAPI = () => {
    if (process.env.NODE_ENV === "development") {
      return process.env.GATSBY_BREATHECODE_TEST;
    } else {
      return process.env.GATSBY_BREATHECODE_HOST;
    }
  };
  console.log("formData", formData.utm_language || session.language);
  const resp = await fetch(`${getEnvironmentAPI()}/marketing/lead`, {
    headers: new Headers({ "content-type": "application/json" }),
    method: "POST",
    body: JSON.stringify({
      ...formData,
      ...session.utm,
      token,
      action,
      tags: tags.join(","),
      automations: automations.join(","),
      utm_language: formData.utm_language || session.language,
      language: formData.utm_language || session.language,
      latitude: session.latitude,
      longitude: session.longitude,
      referral_key: formData.referral_code || session.referral_code,
      browser_lang: session.browserLang,
      city: session.location.city,
      location:
        formData.utm_location ||
        formData.location ||
        session.location.active_campaign_location_slug,
      country: session.location.country,
      utm_url: formData.utm_url || window.location.href,
    }),
  });
  if (resp.status >= 200 && resp.status < 400) {
    return await resp.json();
  } else {
    const error = await resp.json();
    if (typeof error.detail === "string") throw Error(error.detail);
    if (typeof error.details === "string") throw Error(error.details);
    for (let key in error) {
      throw Error(error[key][0] + " " + key);
    }
  }
};
