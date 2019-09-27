(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxAjax = nx.Ajax || require('next-ajax');
  var CANCELED_MAP = {};
  var DEFAULT_OPTIONS = { cancelable: false };

  var NxAjaxPromise = nx.declare('nx.AjaxPromise', {
    statics: {
      fetch: function(inMethod, inUrl, inData, inOptions) {
        var instance = new NxAjaxPromise(inMethod, inUrl, inData, inOptions);
        return new Promise(function(resolve, reject) {
          instance.ajax.fetch({
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
      }
    },
    methods: {
      init: function(inMethod, inUrl, inData, inOptions) {
        var self = this;
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        this.ajax = new NxAjax(inMethod, inUrl, inData, inOptions);

        if (options.cancelable) {
          CANCELED_MAP[self.__id__] = function() {
            self.ajax.destroy();
          };
        }

        Promise.prototype.destroy = function() {
          (CANCELED_MAP[self.__id__] || nx.noop)();
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAjaxPromise;
  }
})();
