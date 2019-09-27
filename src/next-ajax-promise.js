(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var NxAjax = nx.Ajax || require('next-ajax');
  var CANCELED_MAP = {};
  var DEFAULT_OPTIONS = { cancelable: false };

  var NxAjaxPromise = nx.declare('nx.AjaxPromise', {
    statics: {
      CANCELED_MAP: CANCELED_MAP,
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
        var id = this.__id__;
        this.ajax = new NxAjax(inMethod, inUrl, inData, inOptions);

        if (options.cancelable) {
          CANCELED_MAP[id] = function() {
            self.ajax.destroy();
          };
          // lazy execute?:
          Promise.prototype.destroy = function() {
            (CANCELED_MAP[id] || nx.noop)();
          };
        }
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxAjaxPromise;
  }
})();
