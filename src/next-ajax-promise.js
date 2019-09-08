(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxAjax = nx.Ajax || require('next-ajax');

  var NxAjaxPromise = nx.declare('nx.AjaxPromise', {
    statics: {
      fetch: function(inMethod, inUrl, inData, inOptions) {
        var self = this;
        this.ajax = new NxAjax(inMethod, inUrl, inData, inOptions);
        var promise = new Promise(function(resolve, reject) {
          self.ajax.fetch({
            onSuccess: function(res) {
              resolve(res);
            },
            onFail: function(res) {
              reject(res);
            },
            onTimeout: function(res) {
              reject(res);
            },
            onComplete: function(res) {
              resolve(res);
            }
          });
        });

        debugger;

        promise.destroy = function() {
          self.ajax.destroy();
        };

        return promise;
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAjaxPromise;
  }
})();
