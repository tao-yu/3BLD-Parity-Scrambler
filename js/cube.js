
/*Copyright (c) 2013 Petri Lehtinen <petri@digip.org>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

(function() {
  var BL, BR, Cube, DB, DBL, DF, DFR, DL, DLF, DR, DRB, FL, FR, UB, UBR, UF, UFL, UL, ULB, UR, URF, cornerColor, cornerFacelet, edgeColor, edgeFacelet, ref, ref1, ref2;

  ref = [0, 1, 2, 3, 4, 5, 6, 7], URF = ref[0], UFL = ref[1], ULB = ref[2], UBR = ref[3], DFR = ref[4], DLF = ref[5], DBL = ref[6], DRB = ref[7];

  ref1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], UR = ref1[0], UF = ref1[1], UL = ref1[2], UB = ref1[3], DR = ref1[4], DF = ref1[5], DL = ref1[6], DB = ref1[7], FR = ref1[8], FL = ref1[9], BL = ref1[10], BR = ref1[11];

  ref2 = (function() {
    var B, D, F, L, R, U;
    U = function(x) {
      return x - 1;
    };
    R = function(x) {
      return U(9) + x;
    };
    F = function(x) {
      return R(9) + x;
    };
    D = function(x) {
      return F(9) + x;
    };
    L = function(x) {
      return D(9) + x;
    };
    B = function(x) {
      return L(9) + x;
    };
    return [[[U(9), R(1), F(3)], [U(7), F(1), L(3)], [U(1), L(1), B(3)], [U(3), B(1), R(3)], [D(3), F(9), R(7)], [D(1), L(9), F(7)], [D(7), B(9), L(7)], [D(9), R(9), B(7)]], [[U(6), R(2)], [U(8), F(2)], [U(4), L(2)], [U(2), B(2)], [D(6), R(8)], [D(2), F(8)], [D(4), L(8)], [D(8), B(8)], [F(6), R(4)], [F(4), L(6)], [B(6), L(4)], [B(4), R(6)]]];
  })(), cornerFacelet = ref2[0], edgeFacelet = ref2[1];

  cornerColor = [['U', 'R', 'F'], ['U', 'F', 'L'], ['U', 'L', 'B'], ['U', 'B', 'R'], ['D', 'F', 'R'], ['D', 'L', 'F'], ['D', 'B', 'L'], ['D', 'R', 'B']];

  edgeColor = [['U', 'R'], ['U', 'F'], ['U', 'L'], ['U', 'B'], ['D', 'R'], ['D', 'F'], ['D', 'L'], ['D', 'B'], ['F', 'R'], ['F', 'L'], ['B', 'L'], ['B', 'R']];

  Cube = (function() {
    var faceNames, faceNums, parseAlg;

    function Cube(other) {
      var x;
      if (other != null) {
        this.init(other);
      } else {
        this.identity();
      }
      this.newCp = (function() {
        var k, results;
        results = [];
        for (x = k = 0; k <= 7; x = ++k) {
          results.push(0);
        }
        return results;
      })();
      this.newEp = (function() {
        var k, results;
        results = [];
        for (x = k = 0; k <= 11; x = ++k) {
          results.push(0);
        }
        return results;
      })();
      this.newCo = (function() {
        var k, results;
        results = [];
        for (x = k = 0; k <= 7; x = ++k) {
          results.push(0);
        }
        return results;
      })();
      this.newEo = (function() {
        var k, results;
        results = [];
        for (x = k = 0; k <= 11; x = ++k) {
          results.push(0);
        }
        return results;
      })();
    }

    Cube.prototype.init = function(state) {
      this.co = state.co.slice(0);
      this.ep = state.ep.slice(0);
      this.cp = state.cp.slice(0);
      return this.eo = state.eo.slice(0);
    };

    Cube.prototype.identity = function() {
      var x;
      this.cp = [0, 1, 2, 3, 4, 5, 6, 7];
      this.co = (function() {
        var k, results;
        results = [];
        for (x = k = 0; k <= 7; x = ++k) {
          results.push(0);
        }
        return results;
      })();
      this.ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      return this.eo = (function() {
        var k, results;
        results = [];
        for (x = k = 0; k <= 11; x = ++k) {
          results.push(0);
        }
        return results;
      })();
    };

    Cube.prototype.toJSON = function() {
      return {
        cp: this.cp,
        co: this.co,
        ep: this.ep,
        eo: this.eo
      };
    };

    Cube.prototype.asString = function() {
      var c, corner, edge, i, k, l, len, m, n, o, ori, p, ref3, ref4, result;
      result = [];
      ref3 = [[4, 'U'], [13, 'R'], [22, 'F'], [31, 'D'], [40, 'L'], [49, 'B']];
      for (k = 0, len = ref3.length; k < len; k++) {
        ref4 = ref3[k], i = ref4[0], c = ref4[1];
        result[i] = c;
      }
      for (i = l = 0; l <= 7; i = ++l) {
        corner = this.cp[i];
        ori = this.co[i];
        for (n = m = 0; m <= 2; n = ++m) {
          result[cornerFacelet[i][(n + ori) % 3]] = cornerColor[corner][n];
        }
      }
      for (i = o = 0; o <= 11; i = ++o) {
        edge = this.ep[i];
        ori = this.eo[i];
        for (n = p = 0; p <= 1; n = ++p) {
          result[edgeFacelet[i][(n + ori) % 2]] = edgeColor[edge][n];
        }
      }
      return result.join('');
    };

    Cube.fromString = function(str) {
      var col1, col2, cube, i, j, k, l, m, o, ori, p, ref3;
      cube = new Cube;
      for (i = k = 0; k <= 7; i = ++k) {
        for (ori = l = 0; l <= 2; ori = ++l) {
          if ((ref3 = str[cornerFacelet[i][ori]]) === 'U' || ref3 === 'D') {
            break;
          }
        }
        col1 = str[cornerFacelet[i][(ori + 1) % 3]];
        col2 = str[cornerFacelet[i][(ori + 2) % 3]];
        for (j = m = 0; m <= 7; j = ++m) {
          if (col1 === cornerColor[j][1] && col2 === cornerColor[j][2]) {
            cube.cp[i] = j;
            cube.co[i] = ori % 3;
          }
        }
      }
      for (i = o = 0; o <= 11; i = ++o) {
        for (j = p = 0; p <= 11; j = ++p) {
          if (str[edgeFacelet[i][0]] === edgeColor[j][0] && str[edgeFacelet[i][1]] === edgeColor[j][1]) {
            cube.ep[i] = j;
            cube.eo[i] = 0;
            break;
          }
          if (str[edgeFacelet[i][0]] === edgeColor[j][1] && str[edgeFacelet[i][1]] === edgeColor[j][0]) {
            cube.ep[i] = j;
            cube.eo[i] = 1;
            break;
          }
        }
      }
      return cube;
    };

    Cube.prototype.clone = function() {
      return new Cube(this.toJSON());
    };

    Cube.prototype.randomize = (function() {
      var mixPerm, randOri, randint, result;
      randint = function(min, max) {
        return min + (Math.random() * (max - min + 1) | 0);
      };
      mixPerm = function(arr) {
        var i, k, max, r, ref3, ref4, ref5, results;
        max = arr.length - 1;
        results = [];
        for (i = k = 0, ref3 = max - 2; 0 <= ref3 ? k <= ref3 : k >= ref3; i = 0 <= ref3 ? ++k : --k) {
          r = randint(i, max);
          if (i !== r) {
            ref4 = [arr[r], arr[i]], arr[i] = ref4[0], arr[r] = ref4[1];
            results.push((ref5 = [arr[max - 1], arr[max]], arr[max] = ref5[0], arr[max - 1] = ref5[1], ref5));
          } else {
            results.push(void 0);
          }
        }
        return results;
      };
      randOri = function(arr, max) {
        var i, k, ori, ref3;
        ori = 0;
        for (i = k = 0, ref3 = arr.length - 2; 0 <= ref3 ? k <= ref3 : k >= ref3; i = 0 <= ref3 ? ++k : --k) {
          ori += (arr[i] = randint(0, max - 1));
        }
        return arr[arr.length - 1] = (max - ori % max) % max;
      };
      result = function() {
        mixPerm(this.cp);
        mixPerm(this.ep);
        randOri(this.co, 3);
        randOri(this.eo, 2);
        return this;
      };
      return result;
    })();

    Cube.random = function() {
      return new Cube().randomize();
    };

    Cube.prototype.isSolved = function() {
      var c, e, k, l;
      for (c = k = 0; k <= 7; c = ++k) {
        if (this.cp[c] !== c) {
          return false;
        }
        if (this.co[c] !== 0) {
          return false;
        }
      }
      for (e = l = 0; l <= 11; e = ++l) {
        if (this.ep[e] !== e) {
          return false;
        }
        if (this.eo[e] !== 0) {
          return false;
        }
      }
      return true;
    };

    Cube.prototype.cornerMultiply = function(other) {
      var from, k, ref3, ref4, to;
      for (to = k = 0; k <= 7; to = ++k) {
        from = other.cp[to];
        this.newCp[to] = this.cp[from];
        this.newCo[to] = (this.co[from] + other.co[to]) % 3;
      }
      ref3 = [this.newCp, this.cp], this.cp = ref3[0], this.newCp = ref3[1];
      ref4 = [this.newCo, this.co], this.co = ref4[0], this.newCo = ref4[1];
      return this;
    };

    Cube.prototype.edgeMultiply = function(other) {
      var from, k, ref3, ref4, to;
      for (to = k = 0; k <= 11; to = ++k) {
        from = other.ep[to];
        this.newEp[to] = this.ep[from];
        this.newEo[to] = (this.eo[from] + other.eo[to]) % 2;
      }
      ref3 = [this.newEp, this.ep], this.ep = ref3[0], this.newEp = ref3[1];
      ref4 = [this.newEo, this.eo], this.eo = ref4[0], this.newEo = ref4[1];
      return this;
    };

    Cube.prototype.multiply = function(other) {
      this.cornerMultiply(other);
      this.edgeMultiply(other);
      return this;
    };

    Cube.moves = [
      {
        cp: [UBR, URF, UFL, ULB, DFR, DLF, DBL, DRB],
        co: [0, 0, 0, 0, 0, 0, 0, 0],
        ep: [UB, UR, UF, UL, DR, DF, DL, DB, FR, FL, BL, BR],
        eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, {
        cp: [DFR, UFL, ULB, URF, DRB, DLF, DBL, UBR],
        co: [2, 0, 0, 1, 1, 0, 0, 2],
        ep: [FR, UF, UL, UB, BR, DF, DL, DB, DR, FL, BL, UR],
        eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, {
        cp: [UFL, DLF, ULB, UBR, URF, DFR, DBL, DRB],
        co: [1, 2, 0, 0, 2, 1, 0, 0],
        ep: [UR, FL, UL, UB, DR, FR, DL, DB, UF, DF, BL, BR],
        eo: [0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0]
      }, {
        cp: [URF, UFL, ULB, UBR, DLF, DBL, DRB, DFR],
        co: [0, 0, 0, 0, 0, 0, 0, 0],
        ep: [UR, UF, UL, UB, DF, DL, DB, DR, FR, FL, BL, BR],
        eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, {
        cp: [URF, ULB, DBL, UBR, DFR, UFL, DLF, DRB],
        co: [0, 1, 2, 0, 0, 2, 1, 0],
        ep: [UR, UF, BL, UB, DR, DF, FL, DB, FR, UL, DL, BR],
        eo: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }, {
        cp: [URF, UFL, UBR, DRB, DFR, DLF, ULB, DBL],
        co: [0, 0, 1, 2, 0, 0, 2, 1],
        ep: [UR, UF, UL, BR, DR, DF, DL, BL, FR, FL, UB, DB],
        eo: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1]
      }
    ];

    faceNums = {
      U: 0,
      R: 1,
      F: 2,
      D: 3,
      L: 4,
      B: 5
    };

    faceNames = {
      0: 'U',
      1: 'R',
      2: 'F',
      3: 'D',
      4: 'L',
      5: 'B'
    };

    parseAlg = function(arg) {
      var k, len, move, part, power, ref3, results;
      if (typeof arg === 'string') {
        ref3 = arg.split(/\s+/);
        results = [];
        for (k = 0, len = ref3.length; k < len; k++) {
          part = ref3[k];
          if (part.length === 0) {
            continue;
          }
          if (part.length > 2) {
            throw new Error("Invalid move: " + part);
          }
          move = faceNums[part[0]];
          if (move === void 0) {
            throw new Error("Invalid move: " + part);
          }
          if (part.length === 1) {
            power = 0;
          } else {
            if (part[1] === '2') {
              power = 1;
            } else if (part[1] === "'") {
              power = 2;
            } else {
              throw new Error("Invalid move: " + part);
            }
          }
          results.push(move * 3 + power);
        }
        return results;
      } else if (arg.length != null) {
        return arg;
      } else {
        return [arg];
      }
    };

    Cube.prototype.move = function(arg) {
      var face, k, l, len, move, power, ref3, ref4, x;
      ref3 = parseAlg(arg);
      for (k = 0, len = ref3.length; k < len; k++) {
        move = ref3[k];
        face = move / 3 | 0;
        power = move % 3;
        for (x = l = 0, ref4 = power; 0 <= ref4 ? l <= ref4 : l >= ref4; x = 0 <= ref4 ? ++l : --l) {
          this.multiply(Cube.moves[face]);
        }
      }
      return this;
    };

    Cube.inverse = function(arg) {
      var face, k, len, move, power, result, str;
      result = (function() {
        var k, len, ref3, results;
        ref3 = parseAlg(arg);
        results = [];
        for (k = 0, len = ref3.length; k < len; k++) {
          move = ref3[k];
          face = move / 3 | 0;
          power = move % 3;
          results.push(face * 3 + -(power - 1) + 1);
        }
        return results;
      })();
      result.reverse();
      if (typeof arg === 'string') {
        str = '';
        for (k = 0, len = result.length; k < len; k++) {
          move = result[k];
          face = move / 3 | 0;
          power = move % 3;
          str += faceNames[face];
          if (power === 1) {
            str += '2';
          } else if (power === 2) {
            str += "'";
          }
          str += ' ';
        }
        return str.substring(0, str.length - 1);
      } else if (arg.length != null) {
        return result;
      } else {
        return result[0];
      }
    };

    return Cube;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Cube;
  } else {
    this.Cube = Cube;
  }

}).call(this);