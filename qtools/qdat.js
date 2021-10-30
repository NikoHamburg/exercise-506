import moment from "moment";

const getNowAsIso = () => {
  return moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
};

export { getNowAsIso };
