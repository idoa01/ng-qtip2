// Generated by CoffeeScript 1.10.0
(function() {
  angular.module('ngQtip2', []).directive('qtip', [
    '$timeout', '$compile', '$http', '$templateCache', function($timeout, $compile, $http, $templateCache) {
      return {
        restrict: 'A',
        scope: {
          qtipVisible: '=',
          qtipDisable: '=',
          qtipFixed: '=',
          qtipDelay: '=',
          qtipAdjustX: '=',
          qtipAdjustY: '=',
          qtipStyle: '=',
          qtip: '@',
          qtipTitle: '@',
          qtipContent: '@',
          qtipSelector: '@',
          qtipTemplate: '@',
          qtipEvent: '@',
          qtipEventOut: '@',
          qtipClass: '@',
          qtipMy: '@',
          qtipAt: '@',
          object: '=qtipTemplateObject'
        },
        link: function(scope, el, attrs) {
          var event, eventOut, generateQtip, str2bool;
          str2bool = function(str) {
            var ref;
            return (ref = String(str).toLowerCase()) !== 'false' && ref !== '0' && ref !== 'null' && ref !== '';
          };
          if (scope.qtipEvent === 'false') {
            event = false;
          }
          if (scope.qtipEventOut === 'false') {
            eventOut = false;
          }
          scope.closeQtip = function(e) {
            if (e != null) {
              if (typeof e.preventDefault === "function") {
                e.preventDefault();
              }
            }
            $('.qtip:visible').qtip('hide');
            return void 0;
          };
          generateQtip = function(content) {
            var options, ref, ref1, ref2, ref3, ref4;
            options = {
              content: (ref = scope.qtipContent) != null ? ref : scope.qtip,
              position: {
                my: str2bool(scope.qtipMy) ? scope.qtipMy : 'bottom center',
                at: str2bool(scope.qtipAt) ? scope.qtipAt : 'top center',
                target: el,
                adjust: {
                  x: parseInt(scope.qtipAdjustX) || 0,
                  y: parseInt(scope.qtipAdjustY) || 0
                }
              },
              show: {
                event: str2bool(scope.qtipEvent) ? scope.qtipEvent : 'mouseover'
              },
              hide: {
                fixed: scope.qtipFixed !== null ? str2bool(scope.qtipFixed) : true,
                delay: (ref1 = scope.qtipDelay) != null ? ref1 : 100,
                event: str2bool(scope.qtipEventOut) ? (ref2 = scope.qtipEventOut) != null ? ref2 : 'mouseout' : void 0
              },
              style: {
                classes: str2bool(scope.qtipClass) ? (ref3 = scope.qtipClass) != null ? ref3 : 'qtip' : void 0,
                tip: (ref4 = scope.qtipStyle) != null ? ref4 : {}
              }
            };
            $(el).qtip(options);
            if (attrs.qtipVisible) {
              scope.$watch('qtipVisible', function(new_val) {
                return $(el).qtip('toggle', new_val);
              });
            }
            if (attrs.qtipDisable) {
              scope.$watch('qtipDisable', function(new_val) {
                return $(el).qtip('disable', new_val);
              });
            }
            if (attrs.qtipTitle) {
              scope.$watch('qtipTitle', function(new_val) {
                return $(el).qtip('option', 'content.title', new_val);
              });
            }
            return scope.$watch('qtip', function(new_val, old_val) {
              if (new_val !== old_val) {
                return $(el).qtip('option', 'content.text', new_val);
              }
            });
          };
          if (attrs.qtipSelector) {
            $timeout((function() {
              return generateQtip($(scope.qtipSelector).html());
            }), 1);
          } else if (attrs.qtipTemplate) {
            $http.get(scope.qtipTemplate, {
              cache: $templateCache
            }).then(function(html) {
              return generateQtip({
                text: function() {
                  return $timeout(function() {
                    return scope.$apply(function() {
                      return $compile(html.data)(scope);
                    });
                  }, 1);
                }
              });
            });
          } else if (attrs.qtipTitle) {
            generateQtip({
              title: scope.qtipTitle,
              text: scope.qtip
            });
          } else {
            generateQtip({
              text: function() {
                return $timeout(function() {
                  return scope.$apply(function() {
                    return $compile("<div>" + content + "</div>")(scope);
                  });
                }, 1);
              }
            });
          }
          return void 0;
        }
      };
    }
  ]);

}).call(this);