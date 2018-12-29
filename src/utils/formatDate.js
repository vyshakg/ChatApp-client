import humanizeDuration from "humanize-duration";

export default d => {
  let today = new Date();
  let date = new Date(d);

  return humanizeDuration(today - date, {
    round: true,
    units: ["w", "d", "h", "m", "s"],
    largest: 1
  });
};
