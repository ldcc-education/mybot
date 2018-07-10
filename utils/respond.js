module.exports = (function () {
  return {
    respondHtml: (res, tpl, obj, status) => {
      res.render(tpl, obj);
    },
    respondJson: (res, code, obj, status) => {
      return status ? res.status(status)
          .json({
              code: code,
              data: obj
          }) : res.json({ code: code, data: obj });
    },
    respondOnError: (res, code, obj, status) => {
      return status ? res.status(status)
          .json({
              code: code,
              data: obj
          }) : res.json({ code: code, data: obj });
    }
  }
})();
