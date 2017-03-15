angular.module("myApp.filters", []).
        filter("getArrayNumbers", function() {
            return function(arr) {
         var arr1=[];
    for (var i=1; i<arr.length;i++) {
        arr1.push(arr[i]);
    }
    return arr1;

            };
}).
        filter("lineRatio", function() {
            return function(val1,val2){
                if(val1!==0) {
                   return (100*val1/(val1+val2)).toFixed(0);
                } else {
                    return 0;
                }
            };


        }).
                filter("getSumTot", function() {
                    return function(fIndex,arr) {
                        var total=0;
                        for(var i=fIndex;i<arr.length;i++) {
                        total+=parseInt(arr[i]);
                    }
                 return total;


                    };
        }).
                filter("getAverage", function() {
                return function(index,arr) {
                    var count=0;
                    var suma=0;
                        for (var i=index;i<arr.length;i++) {

                            if(arr[i]!==0) {
                                count+=1;
                                suma+=arr[i];
                            }
                        }
                        if (count!==0) {
                              return suma/count;
                        } else {
                            return 0;

                    }
                            };
        }).
                filter("getSum", function() {
                    return function(fIndex,lIndex,arr) {
                            var total=0;
                       for(var i=fIndex;i<=lIndex;i++) {

                           total+=parseInt(arr[i]);
    }
 return total;
                    };
        }).
                filter("calculateEff", function() {
                   return function(arr,lo,index,obj) {
                        var total=0;
                        var totalPercent;
                        for (var i = 0; i < arr.length; i++) {
                            if(arr[i] !== null && typeof arr[i] !== 'undefined') {
                                if(!isNaN(arr[i].pcbs100 && arr[i].pcbs100 !== 0)) {
                                    total+=(60/lo)*(obj["product"+(i+1)][index]/arr[i].pcbs100);
                                }
                            }
                    }

                        totalPercent = parseInt((total*100).toFixed(0));
                        return totalPercent;
                    };
        }).

                filter("calcEffArr", function() {
                    return function(arr1,arr2,obj) {
                      console.log('arr1:'+JSON.stringify(arr1));
                      console.log('arr2:'+JSON.stringify(arr2));
                      console.log('obj:'+JSON.stringify(obj));
                        var total;
                        var totPercent=[];
                        totPercent[0]="eff[%]";
                        for (var j = 1; j < arr2.length; j++) {
                            total=0;
                            for (var i = 0; i <= arr1.length; i++) {
                                  total +=
                                  (arr1[i] !== null && typeof arr1[i] !== 'undefined' &&
                                  arr2[j] !== 0 && arr1[i].pcbs100 !==0 &&
                                  !isNaN(arr1[i].pcbs100) &&
                                  arr1[i].pcbs100 !== "undefined") ?
                                  (60/arr2[j])*(obj["product"+(i+1)][j]/arr1[i].pcbs100) : 0;
                                   console.log('tooooooootal:'+total);
                             totPercent[j] = parseInt((total*100));
                }
                    // console.log("totPercent:"+totPercent);
                  }
                    return totPercent;
                    }
                }).


                filter("calcAverageEff",function() {
                  return function(findex,lindex,arr) {
                    var sum=0;
                    var counter=0;
                    for (var i =findex; i<=lindex;i++) {
                //        console.log(arr[i]);
                        if (arr[i]!==0) {
                            sum+=parseInt(arr[i]);
                            counter+=1;
                        }
                    }
                    if (sum!==0 && counter!==0) {
                        return (sum/counter).toFixed(0);
                    } else {
                    return 0;
                }
                };
        }).

                filter("calcAvgEffTot",function() {
                    return function(el1,el2) {
                            var calc;
                            if (el1*el2!==0) {
                                calc=(((parseInt(el1)+parseInt(el2))/2).toFixed(0));
                            } else {
                                calc=(parseInt(el1)+parseInt(el2));
                            }

                          return calc;

                      };
        }).

        filter("findPercent", function() {
            return function(val1,val2){
                if(val1!==0) {
                   return (100*val1/(val2)).toFixed(0);
                } else {
                    return 0;
                }
            };


        }).
                filter("getNames", function() {
                    return function(o) {
                        var names=[];
                        var i = 0;
                        for (var prop in o) {
                            if(o.hasOwnProperty(prop)) {
                                names[i]=[o[prop][0]];
                                i++;
                            }
                        }
                        return names;
                    };
        }).
                          filter("getEff", function() {
                    return function(o) {
                        var names=[];
                        var i = 0;
                        for (var prop in o) {
                            if(o.hasOwnProperty(prop)) {
                                names[i]=parseInt([o[prop][3]]);
                                i++;
                            }
                        }
                        return names;
                    };
        }).
                filter("getLineOpened", function() {
                    return function(arr) {
                        var arr2=[];
                        arr2[0]="Lin.Otwarta[min]";
                        for(var i=1; i< arr.length; i++) {
                            arr2[i] = 60 - arr[i];
                        }
                        return arr2;
                    };
        }).
                filter("calcLineEff", function() {
                    return function(arr1,arr2) {
                        var arr3=[];
                        arr3[0]="Lin.Eff.[min]";
                        for (var i=1; i<arr1.length; i++) {
                            arr3[i]=(arr1[i]*arr2[i]/100).toFixed(0);
                        }
                        return arr3;
                    };
        }).
                filter("getAllNames", function() {
                    return function(obj1,obj1str, obj2, obj2str, obj3,obj3str) {
                        var arr=[];
                        for (var p in obj1) {
                                arr.push(obj1str+p);
                            }
                            for (p in obj2) {
                                arr.push(obj2str+p);
                            }
                            for (p in obj3) {
                                arr.push(obj3str+p);
                            }
                            return arr;
                                            };
        }).
                  filter("convertDayInNumber", function() {
                return function(datum,arr) {
                    var dt = moment(datum);
                    var index;
                    for (var i = 0; i < arr.length; i++) {
                        if(arr[i] === dt.format('dddd').substring(0,3)) {
                            index=i;
                        }
                    }
                    return index;
        };
                 }).
        filter("calcWeeklyRecordsTot", function() {
            return function(arr) {
                var arr2=[];
                var num=0;
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i].name !== "lineEffTot") {
                        arr2[i] = {
                            name:arr[i].name,
                            text:arr[i].text,
                            calweek:arr[i].calweek,
                            values:[arr[i].values.reduce(function(a,b){return parseInt(a)+parseInt(b);}),0] /* jshint loopfunc:true */
                        };
                    } if (arr[i].name === "lineEffTot") {
                        for(var j = 0; j < arr[i].values.length;i++) {
                            if(arr[i].values[j] !== 0) {
                                num += 1;
                            }
                        }
                        arr2[i] = {
                            name:arr[i].name,
                            text:arr[i].text,
                            calweek:arr[i].calweek,
                            values:[arr[i].values.reduce(function(a,b){return (parseInt(a)+parseInt(b))/num;}),0]
                        };
                    }
            }
            return arr2;
        };
                 }).

        filter("calcWeeklyProductsTot", function() {
            return function(arr) {
                var arr2=[];
                   for (var i = 0; i < arr.length; i++) {
                        arr2[i] = {
                            productIndex:arr[i].productIndex,
                            calmonth:arr[i].calweek,
                            monthlyQuantity:[arr[i].weeklyQuantity.reduce(function(a,b){return parseInt(a)+parseInt(b);}),0] /* jshint loopfunc:true */
                        };
            }
            return arr2;
        };
                 }).

        filter("calcAvgEffWeeklyTot",function() {
                    return function(arr) {
                        var calc;
                        var num=0;
                        for(var i =0; i < arr.length; i++) {
                            if (arr[i]!==0) {
                                num+=num;
                            }
                        }
                            calc = arr.reduce(function(a,b,num){ return (parseInt(a)+parseInt(b))/num;});
                          return calc;
                      };
        }).

        filter("calcStopsPercent", function() {
            return function(arr1,arr2,text,name) {
                var sum=0;
                var num=0;
                for(var i = 0; i < arr1.length; i++) {
                    if(arr1[i].name === text) {
                        num = parseInt(arr1[i].values.reduce(function(a,b){ return a+b; }));
                    }
                }
                for(var j = 0; j < arr2.length; j++) {
                         //console.log("num:"+num);
                         //console.log("name:"+name);
                      if(arr2[j].name === name) {
                    sum = arr2[j].values.reduce(function(a,b){ return a+b; });
                    if(num !== 0) {
                        //console.log("sum:"+sum);
                       return (100*sum/num).toFixed(0);
                    } else {
                        return 0;
                    }
                  }
                  }
            };
        }).
        filter("calcWeeklyEff", function() {
            return function(arr) {
                var num = 0;
                var sum = 0;
               for(var i = 0; i < arr.length; i++) {
                  if(arr[i].name === "prodDataTot.efficiencyTot") {
                      for (var j = 0; j < arr[i].values.length; j++) {
                          if (arr[i].values[j] !== 0) {
                              num += 1;
                          }
                      }
                      sum = arr[i].values.reduce(function(a,b){return parseInt(a)+parseInt(b);}); /* jshint loopfunc:true */
                  }
                    }
                    if(num !== 0) {
                return (sum/num).toFixed(0);
                    } else {
                        return 0;
                    }
            };
        }).
        filter("calcWeeklyClosed", function() {
           return function(arr) {
               var lc = 0;
               var lo = 0;
               for(var i = 0; i < arr.length; i++) {
                  if(arr[i].name === "prodDataTot.lineClosedTot") {
                      lc = arr[i].values[0];
                  }
                  if(arr[i].name === "prodDataTot.lineOpenedTot") {
                      lo = arr[i].values[0];
                  }
              }
              if(lo !== 0) {
                  return (100*lc/(lo+lc)).toFixed(0);
              } else {
                  return 0;
              }

           };
        }).
                filter("calcWeeklyLineOpened", function() {
           return function(arr) {
               var lc = 0;
               var lo = 0;
               for(var i = 0; i < arr.length; i++) {
                  if(arr[i].name === "prodDataTot.lineOpenedTot") {
                      lo = parseInt(arr[i].values[0]);
                  }
                  if(arr[i].name === "prodDataTot.lineClosedTot") {
                      lc = parseInt(arr[i].values[0]);
                  }
              }
              if(lc !== 0) {
                  return (100*lo/(lo+lc)).toFixed(0);
              } else {
                  return 0;
              }

           };
        }).

        filter("calcWeeklynpStops", function() {
           return function(arr) {
               var np = 0;
               var ef = 0;
               for(var i = 0; i < arr.length; i++) {
                  if(arr[i].name === "prodDataTot.npStopsTot") {
                      np = parseInt(arr[i].values[0]);
                  }
                  if(arr[i].name === "prodDataTot.lineEffTot") {
                      ef = parseInt(arr[i].values[0]);
                  }
              }
              if(ef !== 0) {
                  return (100*np/(np+ef)).toFixed(0);
              } else {
                  return 0;
              }

           };
        }).

         filter("calcWeeklyLineEff", function() {
           return function(arr) {
               var np = 0;
               var ef = 0;
               for(var i = 0; i < arr.length; i++) {
                  if(arr[i].name === "prodDataTot.lineEffTot") {
                      ef = parseInt(arr[i].values[0]);
                  }
                  if(arr[i].name === "prodDataTot.npStopsTot") {
                      np = parseInt(arr[i].values[0]);
                  }
              }
              if(np !== 0) {
                  return (100*ef/(ef+np)).toFixed(0);
              } else {
                  return 0;
              }

           };
        }).
       filter("getNamesFromArray", function() {
           var arr2=[];
           return function(arr) {
              for(var i = 0; i < arr.length; i++) {
                  arr2[i] = arr[i].text;
              }
              return arr2;
           };
        }).
        filter("getStops", function() {
           var arr2=[];
           return function(arr) {
              for(var i = 0; i < arr.length; i++) {
                  arr2[i] = parseInt(arr[i].values[1]);
              }
              return arr2;
           };
        }).
        filter("getWeeklyEff", function() {
            var arr2=[];
            return function(arr) {
                for(var i =0; i < arr.length; i++) {
                    if(arr[i].name === "prodDataTot.efficiencyTot") {
                        for(var j = 0; j < arr[i].values.length; j++) {
                            arr2[j] = parseInt(arr[i].values[j]);
                        }
                    }
                }
                return arr2;
            };
        }).
        filter("findId", function() {
          return function(id, arr) {
            var exist = false;
            arr.filter(function(i, item) {
              if (i._id === id) {
                exist = true;
              }
            });
            return exist;
          }
        }).
        filter("findIdWeekly", function() {
          return function(id, arr, productId) {
            var exist = false;
            arr.filter(function(i, item) {
              if (i[productId] === id) {
                exist = true;
              }
            });
            return exist;
          }
        }).
        filter("findRowNumber", function() {
          return function(rn, arr) {
            var exist = false;
            arr.filter(function(i, item) {
              if ((i._id).substring(0,1) === rn) {
                exist = true;
              }
            });
            return exist;
          }
        }).
        filter("calcStops", function() {
            return function(arr, o) {
                for(var i = 1; i < arr.length; i++) {
                    arr[i]=0;
                    for(var property in o) {
                        if(o.hasOwnProperty(property)) {
                            arr[i]+=parseInt(o[property][i+1]);
                        }
                    }
                }
            };
        }).
        filter("calcTot", function() {
           return function(o1,o2) {
               for(var i = 1; i <= 8; i++) {
                   for(var property in o1) {
                        if (o1.hasOwnProperty(property)) {
                            if (property !== "efficiency" && property !== "target") {
                          o2[property+"Tot"][0] = o1[property].filter(function(i, item, value) { /* jshint loopfunc:true */
                             if(!isNaN(value[item]) && value[item] !== "") {
                                 return true;
                                 }
                          })
                          .filter(function(i,item) {
                              if(item >= 0 && item <= 7) {
                              return true;
                          }
                    })
                    .reduce(function(a,b) { /* jshint loopfunc:true */
                            return parseInt(a)+parseInt(b);
                          });
                          }
                        }
               }

         }
            for (i=9;i <= 16; i++) {
                   for(var property in o1) {
                        if(o1.hasOwnProperty(property)) {
                            if(property !== "efficiency" && property !== "target") {
                          o2[property+"Tot"][1] = o1[property].filter(function(i,item,value) { /* jshint loopfunc:true */
                             if(!isNaN(value[item]) && value[item]!=="") {
                                 return true;
                                 }
                             })
                              .filter(function(i,item) {
                              if(item >= 8 && item <= 16 ) {
                              return true;
                            }
                    })
                    .reduce(function(a,b) { /* jshint loopfunc:true */
                            return parseInt(a)+parseInt(b);
                          });
                          o2[property+"Tot"][2]=o2[property+"Tot"][0]+o2[property+"Tot"][1];
                          }
                      }
               }
         }
           };

        }).
        filter("calcRatioProdData", function($filter) {
            return function(o) {
                o.lineEffTot[3]=o.efficiencyTot[2];
                o.lineOpenedTot[3]=$filter("lineRatio")(o.lineOpenedTot[2],o.lineClosedTot[2]);
                o.lineClosedTot[3]=$filter("lineRatio")(o.lineClosedTot[2],o.lineOpenedTot[2]);
                o.npStopsTot[3]=$filter("lineRatio")(o.npStopsTot[2],o.lineEffTot[2]);
            };
        }).
        filter("calcRatio", function() {
          return function(o1,o2,text) {
              for(var property in o1) {
                  if(o1.hasOwnProperty(property)) {
                      if (o2[text][2] !== 0) {
                      o1[property][3]=(100*o1[property][2]/o2[text][2]).toFixed(0);
                  } else {
                      o1[property][3]=0;
                  }
                  }
              }
          };
      }).
      filter("addDays", function() {
          return function(date, days) {
              if (date === "undefined") {
                return "";
                  } else {
                    var result = angular.copy(date);
                    result = moment(result).add(days, 'days').format('DD-MMM-YY');
                    return result;
                  }
          };
        }).
        filter('checkForNumbers', function() {
            return function(klasa, id, val) {
              var obj = (klasa).split(" ")[0] + id;
              if (obj !== "pp1" && obj !== "np1") {
                return true;
              }
              if ((obj === "pp1" || obj === "np1")) {
                return false;
              }
            }
        }).
        filter('sorter', function() {
          return function(xval, yval, r) {
            var x = [];
            var xsorted = [];
            var xsortedshort=[];
            var ysorted = [];
            var xo = {};
            var xout = [];
            for (var i = 0; i <= xval.length-1; i++) {
              xo = {
                xval:xval[i],
                number:i
              }
              x.push(xo);
            }
              xsorted = x.sort(function(a,b) {
                return b.xval-a.xval;
              });
              xsortedshort = xsorted.filter(function(i) {
                return i.xval;
              });

            for(var i = 0; i <= xsortedshort.length-1; i++) {
              for (var key in xsortedshort[i]) {
                if (Object.prototype.hasOwnProperty.call(xsortedshort[i], key)) {
                  if(key === 'xval') {
                  xout.push(xsortedshort[i][key]);
                }
              }
              }
            }
            for (var i = 0; i <= xsortedshort.length-1; i++) {
              ysorted.push(yval[parseInt(xsortedshort[i].number)]);
            }
            if (r === 'x') {
              return xout;
            }
            if (r === 'y') {
              return ysorted;
            }
          }

        }).
        filter('unique', function() {
        return function unique(a) {
         var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];
          return a.filter(function(item) {
          var type = typeof item;
          if(type in prims)
              return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
          else
              return objs.indexOf(item) >= 0 ? false : objs.push(item);
      });
  }
}).
filter('fmaxi', function() {
  return function(arr) {
    return arr.reduce(function(a,b) {
      return Math.max(a,b);
    })
  }
});
