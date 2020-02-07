! function(t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define
		.amd ? define([], e) : "object" == typeof exports ? exports.io = e() : t.io = e()
}(this, function() {
	return function(t) {
		function e(n) {
			if (r[n]) return r[n].exports;
			var o = r[n] = {
				exports: {},
				id: n,
				loaded: !1
			};
			return t[n].call(o.exports, o, o.exports, e), o.loaded = !0, o.exports
		}
		var r = {};
		return e.m = t, e.c = r, e.p = "", e(0)
	}([function(t, e, r) {
		"use strict";

		function n(t, e) {
			"object" === ("undefined" == typeof t ? "undefined" : o(t)) && (e = t, t = void 0), e = e || {};
			var r, n = i(t),
				s = n.source,
				h = n.id,
				p = n.path,
				u = c[h] && p in c[h].nsps,
				f = e.forceNew || e["force new connection"] || !1 === e.multiplex || u;
			return f ? r = a(s, e) : (c[h] || (c[h] = a(s, e)), r = c[h]), n.query && !e.query && (e.query = n.query), r.socket(
				n.path, e)
		}
		var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" :
					typeof t
			},
			i = r(1),
			s = r(4),
			a = r(9);
		r(3)("socket.io-client");
		t.exports = e = n;
		var c = e.managers = {};
		e.protocol = s.protocol, e.connect = n, e.Manager = r(9), e.Socket = r(34)
	}, function(t, e, r) {
		(function(e) {
			"use strict";

			function n(t, r) {
				var n = t;
				r = r || e.location, null == t && (t = r.protocol + "//" + r.host), "string" == typeof t && ("/" === t.charAt(
					0) && (t = "/" === t.charAt(1) ? r.protocol + t : r.host + t), /^(https?|wss?):\/\//.test(t) || (t =
					"undefined" != typeof r ? r.protocol + "//" + t : "https://" + t), n = o(t)), n.port || (/^(http|ws)$/.test(
					n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")), n.path = n.path || "/";
				var i = n.host.indexOf(":") !== -1,
					s = i ? "[" + n.host + "]" : n.host;
				return n.id = n.protocol + "://" + s + ":" + n.port, n.href = n.protocol + "://" + s + (r && r.port === n.port ?
					"" : ":" + n.port), n
			}
			var o = r(2);
			r(3)("socket.io-client:url");
			t.exports = n
		}).call(e, function() {
			return this
		}())
	}, function(t, e) {
		var r =
			/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
			n = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path",
				"directory", "file", "query", "anchor"
			];
		t.exports = function(t) {
			var e = t,
				o = t.indexOf("["),
				i = t.indexOf("]");
			o != -1 && i != -1 && (t = t.substring(0, o) + t.substring(o, i).replace(/:/g, ";") + t.substring(i, t.length));
			for (var s = r.exec(t || ""), a = {}, c = 14; c--;) a[n[c]] = s[c] || "";
			return o != -1 && i != -1 && (a.source = e, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"),
				a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
		}
	}, function(t, e) {
		"use strict";
		t.exports = function() {
			return function() {}
		}
	}, function(t, e, r) {
		function n() {}

		function o(t) {
			var r = "" + t.type;
			if (e.BINARY_EVENT !== t.type && e.BINARY_ACK !== t.type || (r += t.attachments + "-"), t.nsp && "/" !== t.nsp &&
				(r += t.nsp + ","), null != t.id && (r += t.id), null != t.data) {
				var n = i(t.data);
				if (n === !1) return m;
				r += n
			}
			return r
		}

		function i(t) {
			try {
				return JSON.stringify(t)
			} catch (t) {
				return !1
			}
		}

		function s(t, e) {
			function r(t) {
				var r = l.deconstructPacket(t),
					n = o(r.packet),
					i = r.buffers;
				i.unshift(n), e(i)
			}
			l.removeBlobs(t, r)
		}

		function a() {
			this.reconstructor = null
		}

		function c(t) {
			var r = 0,
				n = {
					type: Number(t.charAt(0))
				};
			if (null == e.types[n.type]) return u("unknown packet type " + n.type);
			if (e.BINARY_EVENT === n.type || e.BINARY_ACK === n.type) {
				for (var o = "";
					"-" !== t.charAt(++r) && (o += t.charAt(r), r != t.length););
				if (o != Number(o) || "-" !== t.charAt(r)) throw new Error("Illegal attachments");
				n.attachments = Number(o)
			}
			if ("/" === t.charAt(r + 1))
				for (n.nsp = ""; ++r;) {
					var i = t.charAt(r);
					if ("," === i) break;
					if (n.nsp += i, r === t.length) break
				} else n.nsp = "/";
			var s = t.charAt(r + 1);
			if ("" !== s && Number(s) == s) {
				for (n.id = ""; ++r;) {
					var i = t.charAt(r);
					if (null == i || Number(i) != i) {
						--r;
						break
					}
					if (n.id += t.charAt(r), r === t.length) break
				}
				n.id = Number(n.id)
			}
			if (t.charAt(++r)) {
				var a = h(t.substr(r)),
					c = a !== !1 && (n.type === e.ERROR || d(a));
				if (!c) return u("invalid payload");
				n.data = a
			}
			return n
		}

		function h(t) {
			try {
				return JSON.parse(t)
			} catch (t) {
				return !1
			}
		}

		function p(t) {
			this.reconPack = t, this.buffers = []
		}

		function u(t) {
			return {
				type: e.ERROR,
				data: "parser error: " + t
			}
		}
		var f = (r(3)("socket.io-parser"), r(5)),
			l = r(6),
			d = r(7),
			y = r(8);
		e.protocol = 4, e.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], e.CONNECT =
			0, e.DISCONNECT = 1, e.EVENT = 2, e.ACK = 3, e.ERROR = 4, e.BINARY_EVENT = 5, e.BINARY_ACK = 6, e.Encoder = n, e
			.Decoder = a;
		var m = e.ERROR + '"encode error"';
		n.prototype.encode = function(t, r) {
			if (e.BINARY_EVENT === t.type || e.BINARY_ACK === t.type) s(t, r);
			else {
				var n = o(t);
				r([n])
			}
		}, f(a.prototype), a.prototype.add = function(t) {
			var r;
			if ("string" == typeof t) r = c(t), e.BINARY_EVENT === r.type || e.BINARY_ACK === r.type ? (this.reconstructor =
				new p(r), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r)) : this.emit("decoded", r);
			else {
				if (!y(t) && !t.base64) throw new Error("Unknown type: " + t);
				if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
				r = this.reconstructor.takeBinaryData(t), r && (this.reconstructor = null, this.emit("decoded", r))
			}
		}, a.prototype.destroy = function() {
			this.reconstructor && this.reconstructor.finishedReconstruction()
		}, p.prototype.takeBinaryData = function(t) {
			if (this.buffers.push(t), this.buffers.length === this.reconPack.attachments) {
				var e = l.reconstructPacket(this.reconPack, this.buffers);
				return this.finishedReconstruction(), e
			}
			return null
		}, p.prototype.finishedReconstruction = function() {
			this.reconPack = null, this.buffers = []
		}
	}, function(t, e, r) {
		function n(t) {
			if (t) return o(t)
		}

		function o(t) {
			for (var e in n.prototype) t[e] = n.prototype[e];
			return t
		}
		t.exports = n, n.prototype.on = n.prototype.addEventListener = function(t, e) {
				return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(
					e), this
			}, n.prototype.once = function(t, e) {
				function r() {
					this.off(t, r), e.apply(this, arguments)
				}
				return r.fn = e, this.on(t, r), this
			}, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener =
			function(t, e) {
				if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
				var r = this._callbacks["$" + t];
				if (!r) return this;
				if (1 == arguments.length) return delete this._callbacks["$" + t], this;
				for (var n, o = 0; o < r.length; o++)
					if (n = r[o], n === e || n.fn === e) {
						r.splice(o, 1);
						break
					} return this
			}, n.prototype.emit = function(t) {
				this._callbacks = this._callbacks || {};
				var e = [].slice.call(arguments, 1),
					r = this._callbacks["$" + t];
				if (r) {
					r = r.slice(0);
					for (var n = 0, o = r.length; n < o; ++n) r[n].apply(this, e)
				}
				return this
			}, n.prototype.listeners = function(t) {
				return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || []
			}, n.prototype.hasListeners = function(t) {
				return !!this.listeners(t).length
			}
	}, function(t, e, r) {
		(function(t) {
			function n(t, e) {
				if (!t) return t;
				if (s(t)) {
					var r = {
						_placeholder: !0,
						num: e.length
					};
					return e.push(t), r
				}
				if (i(t)) {
					for (var o = new Array(t.length), a = 0; a < t.length; a++) o[a] = n(t[a], e);
					return o
				}
				if ("object" == typeof t && !(t instanceof Date)) {
					var o = {};
					for (var c in t) o[c] = n(t[c], e);
					return o
				}
				return t
			}

			function o(t, e) {
				if (!t) return t;
				if (t && t._placeholder) return e[t.num];
				if (i(t))
					for (var r = 0; r < t.length; r++) t[r] = o(t[r], e);
				else if ("object" == typeof t)
					for (var n in t) t[n] = o(t[n], e);
				return t
			}
			var i = r(7),
				s = r(8),
				a = Object.prototype.toString,
				c = "function" == typeof t.Blob || "[object BlobConstructor]" === a.call(t.Blob),
				h = "function" == typeof t.File || "[object FileConstructor]" === a.call(t.File);
			e.deconstructPacket = function(t) {
				var e = [],
					r = t.data,
					o = t;
				return o.data = n(r, e), o.attachments = e.length, {
					packet: o,
					buffers: e
				}
			}, e.reconstructPacket = function(t, e) {
				return t.data = o(t.data, e), t.attachments = void 0, t
			}, e.removeBlobs = function(t, e) {
				function r(t, a, p) {
					if (!t) return t;
					if (c && t instanceof Blob || h && t instanceof File) {
						n++;
						var u = new FileReader;
						u.onload = function() {
							p ? p[a] = this.result : o = this.result, --n || e(o)
						}, u.readAsArrayBuffer(t)
					} else if (i(t))
						for (var f = 0; f < t.length; f++) r(t[f], f, t);
					else if ("object" == typeof t && !s(t))
						for (var l in t) r(t[l], l, t)
				}
				var n = 0,
					o = t;
				r(o), n || e(o)
			}
		}).call(e, function() {
			return this
		}())
	}, function(t, e) {
		var r = {}.toString;
		t.exports = Array.isArray || function(t) {
			return "[object Array]" == r.call(t)
		}
	}, function(t, e) {
		(function(e) {
			function r(t) {
				return n && e.Buffer.isBuffer(t) || o && (t instanceof e.ArrayBuffer || i(t))
			}
			t.exports = r;
			var n = "function" == typeof e.Buffer && "function" == typeof e.Buffer.isBuffer,
				o = "function" == typeof e.ArrayBuffer,
				i = function() {
					return o && "function" == typeof e.ArrayBuffer.isView ? e.ArrayBuffer.isView : function(t) {
						return t.buffer instanceof e.ArrayBuffer
					}
				}()
		}).call(e, function() {
			return this
		}())
	}, function(t, e, r) {
		"use strict";

		function n(t, e) {
			if (!(this instanceof n)) return new n(t, e);
			t && "object" === ("undefined" == typeof t ? "undefined" : o(t)) && (e = t, t = void 0), e = e || {}, e.path = e
				.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = e, this.reconnection(e.reconnection !== !1),
				this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0), this.reconnectionDelay(e.reconnectionDelay || 1e3),
				this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3), this.randomizationFactor(e.randomizationFactor || .5),
				this.backoff = new f({
					min: this.reconnectionDelay(),
					max: this.reconnectionDelayMax(),
					jitter: this.randomizationFactor()
				}), this.timeout(null == e.timeout ? 2e4 : e.timeout), this.readyState = "closed", this.uri = t, this.connecting = [],
				this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
			var r = e.parser || c;
			this.encoder = new r.Encoder, this.decoder = new r.Decoder, this.autoConnect = e.autoConnect !== !1, this.autoConnect &&
				this.open()
		}
		var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" :
					typeof t
			},
			i = r(10),
			s = r(34),
			a = r(5),
			c = r(4),
			h = r(36),
			p = r(37),
			u = (r(3)("socket.io-client:manager"), r(33)),
			f = r(38),
			l = Object.prototype.hasOwnProperty;
		t.exports = n, n.prototype.emitAll = function() {
			this.emit.apply(this, arguments);
			for (var t in this.nsps) l.call(this.nsps, t) && this.nsps[t].emit.apply(this.nsps[t], arguments)
		}, n.prototype.updateSocketIds = function() {
			for (var t in this.nsps) l.call(this.nsps, t) && (this.nsps[t].id = this.generateId(t))
		}, n.prototype.generateId = function(t) {
			return ("/" === t ? "" : t + "#") + this.engine.id
		}, a(n.prototype), n.prototype.reconnection = function(t) {
			return arguments.length ? (this._reconnection = !!t, this) : this._reconnection
		}, n.prototype.reconnectionAttempts = function(t) {
			return arguments.length ? (this._reconnectionAttempts = t, this) : this._reconnectionAttempts
		}, n.prototype.reconnectionDelay = function(t) {
			return arguments.length ? (this._reconnectionDelay = t, this.backoff && this.backoff.setMin(t), this) : this._reconnectionDelay
		}, n.prototype.randomizationFactor = function(t) {
			return arguments.length ? (this._randomizationFactor = t, this.backoff && this.backoff.setJitter(t), this) :
				this._randomizationFactor
		}, n.prototype.reconnectionDelayMax = function(t) {
			return arguments.length ? (this._reconnectionDelayMax = t, this.backoff && this.backoff.setMax(t), this) : this
				._reconnectionDelayMax
		}, n.prototype.timeout = function(t) {
			return arguments.length ? (this._timeout = t, this) : this._timeout
		}, n.prototype.maybeReconnectOnOpen = function() {
			!this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
		}, n.prototype.open = n.prototype.connect = function(t, e) {
			if (~this.readyState.indexOf("open")) return this;
			this.engine = i(this.uri, this.opts);
			var r = this.engine,
				n = this;
			this.readyState = "opening", this.skipReconnect = !1;
			var o = h(r, "open", function() {
					n.onopen(), t && t()
				}),
				s = h(r, "error", function(e) {
					if (n.cleanup(), n.readyState = "closed", n.emitAll("connect_error", e), t) {
						var r = new Error("Connection error");
						r.data = e, t(r)
					} else n.maybeReconnectOnOpen()
				});
			if (!1 !== this._timeout) {
				var a = this._timeout,
					c = setTimeout(function() {
						o.destroy(), r.close(), r.emit("error", "timeout"), n.emitAll("connect_timeout", a)
					}, a);
				this.subs.push({
					destroy: function() {
						clearTimeout(c)
					}
				})
			}
			return this.subs.push(o), this.subs.push(s), this
		}, n.prototype.onopen = function() {
			this.cleanup(), this.readyState = "open", this.emit("open");
			var t = this.engine;
			this.subs.push(h(t, "data", p(this, "ondata"))), this.subs.push(h(t, "ping", p(this, "onping"))), this.subs.push(
				h(t, "pong", p(this, "onpong"))), this.subs.push(h(t, "error", p(this, "onerror"))), this.subs.push(h(t,
				"close", p(this, "onclose"))), this.subs.push(h(this.decoder, "decoded", p(this, "ondecoded")))
		}, n.prototype.onping = function() {
			this.lastPing = new Date, this.emitAll("ping")
		}, n.prototype.onpong = function() {
			this.emitAll("pong", new Date - this.lastPing)
		}, n.prototype.ondata = function(t) {
			this.decoder.add(t)
		}, n.prototype.ondecoded = function(t) {
			this.emit("packet", t)
		}, n.prototype.onerror = function(t) {
			this.emitAll("error", t)
		}, n.prototype.socket = function(t, e) {
			function r() {
				~u(o.connecting, n) || o.connecting.push(n)
			}
			var n = this.nsps[t];
			if (!n) {
				n = new s(this, t, e), this.nsps[t] = n;
				var o = this;
				n.on("connecting", r), n.on("connect", function() {
					n.id = o.generateId(t)
				}), this.autoConnect && r()
			}
			return n
		}, n.prototype.destroy = function(t) {
			var e = u(this.connecting, t);
			~e && this.connecting.splice(e, 1), this.connecting.length || this.close()
		}, n.prototype.packet = function(t) {
			var e = this;
			t.query && 0 === t.type && (t.nsp += "?" + t.query), e.encoding ? e.packetBuffer.push(t) : (e.encoding = !0,
				this.encoder.encode(t, function(r) {
					for (var n = 0; n < r.length; n++) e.engine.write(r[n], t.options);
					e.encoding = !1, e.processPacketQueue()
				}))
		}, n.prototype.processPacketQueue = function() {
			if (this.packetBuffer.length > 0 && !this.encoding) {
				var t = this.packetBuffer.shift();
				this.packet(t)
			}
		}, n.prototype.cleanup = function() {
			for (var t = this.subs.length, e = 0; e < t; e++) {
				var r = this.subs.shift();
				r.destroy()
			}
			this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
		}, n.prototype.close = n.prototype.disconnect = function() {
			this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(),
				this.readyState = "closed", this.engine && this.engine.close()
		}, n.prototype.onclose = function(t) {
			this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", t), this._reconnection &&
				!this.skipReconnect && this.reconnect()
		}, n.prototype.reconnect = function() {
			if (this.reconnecting || this.skipReconnect) return this;
			var t = this;
			if (this.backoff.attempts >= this._reconnectionAttempts) this.backoff.reset(), this.emitAll("reconnect_failed"),
				this.reconnecting = !1;
			else {
				var e = this.backoff.duration();
				this.reconnecting = !0;
				var r = setTimeout(function() {
					t.skipReconnect || (t.emitAll("reconnect_attempt", t.backoff.attempts), t.emitAll("reconnecting", t.backoff
						.attempts), t.skipReconnect || t.open(function(e) {
						e ? (t.reconnecting = !1, t.reconnect(), t.emitAll("reconnect_error", e.data)) : t.onreconnect()
					}))
				}, e);
				this.subs.push({
					destroy: function() {
						clearTimeout(r)
					}
				})
			}
		}, n.prototype.onreconnect = function() {
			var t = this.backoff.attempts;
			this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", t)
		}
	}, function(t, e, r) {
		t.exports = r(11), t.exports.parser = r(18)
	}, function(t, e, r) {
		(function(e) {
			function n(t, r) {
				if (!(this instanceof n)) return new n(t, r);
				r = r || {}, t && "object" == typeof t && (r = t, t = null), t ? (t = h(t), r.hostname = t.host, r.secure =
						"https" === t.protocol || "wss" === t.protocol, r.port = t.port, t.query && (r.query = t.query)) : r.host &&
					(r.hostname = h(r.host).host), this.secure = null != r.secure ? r.secure : e.location && "https:" ===
					location.protocol, r.hostname && !r.port && (r.port = this.secure ? "443" : "80"), this.agent = r.agent || !1,
					this.hostname = r.hostname || (e.location ? location.hostname : "localhost"), this.port = r.port || (e.location &&
						location.port ? location.port : this.secure ? 443 : 80), this.query = r.query || {}, "string" == typeof this
					.query && (this.query = p.decode(this.query)), this.upgrade = !1 !== r.upgrade, this.path = (r.path ||
						"/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!r.forceJSONP, this.jsonp = !1 !== r.jsonp, this.forceBase64 = !
					!r.forceBase64, this.enablesXDR = !!r.enablesXDR, this.timestampParam = r.timestampParam || "t", this.timestampRequests =
					r.timestampRequests, this.transports = r.transports || ["polling", "websocket"], this.transportOptions = r.transportOptions ||
					{}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = r.policyPort ||
					843, this.rememberUpgrade = r.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = r.onlyBinaryUpgrades,
					this.perMessageDeflate = !1 !== r.perMessageDeflate && (r.perMessageDeflate || {}), !0 === this.perMessageDeflate &&
					(this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate
						.threshold = 1024), this.pfx = r.pfx || null, this.key = r.key || null, this.passphrase = r.passphrase ||
					null, this.cert = r.cert || null, this.ca = r.ca || null, this.ciphers = r.ciphers || null, this.rejectUnauthorized =
					void 0 === r.rejectUnauthorized || r.rejectUnauthorized, this.forceNode = !!r.forceNode;
				var o = "object" == typeof e && e;
				o.global === o && (r.extraHeaders && Object.keys(r.extraHeaders).length > 0 && (this.extraHeaders = r.extraHeaders),
						r.localAddress && (this.localAddress = r.localAddress)), this.id = null, this.upgrades = null, this.pingInterval =
					null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, this.open()
			}

			function o(t) {
				var e = {};
				for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
				return e
			}
			var i = r(12),
				s = r(5),
				a = (r(3)("engine.io-client:socket"), r(33)),
				c = r(18),
				h = r(2),
				p = r(27);
			t.exports = n, n.priorWebsocketSuccess = !1, s(n.prototype), n.protocol = c.protocol, n.Socket = n, n.Transport =
				r(17), n.transports = r(12), n.parser = r(18), n.prototype.createTransport = function(t) {
					var e = o(this.query);
					e.EIO = c.protocol, e.transport = t;
					var r = this.transportOptions[t] || {};
					this.id && (e.sid = this.id);
					var n = new i[t]({
						query: e,
						socket: this,
						agent: r.agent || this.agent,
						hostname: r.hostname || this.hostname,
						port: r.port || this.port,
						secure: r.secure || this.secure,
						path: r.path || this.path,
						forceJSONP: r.forceJSONP || this.forceJSONP,
						jsonp: r.jsonp || this.jsonp,
						forceBase64: r.forceBase64 || this.forceBase64,
						enablesXDR: r.enablesXDR || this.enablesXDR,
						timestampRequests: r.timestampRequests || this.timestampRequests,
						timestampParam: r.timestampParam || this.timestampParam,
						policyPort: r.policyPort || this.policyPort,
						pfx: r.pfx || this.pfx,
						key: r.key || this.key,
						passphrase: r.passphrase || this.passphrase,
						cert: r.cert || this.cert,
						ca: r.ca || this.ca,
						ciphers: r.ciphers || this.ciphers,
						rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
						perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
						extraHeaders: r.extraHeaders || this.extraHeaders,
						forceNode: r.forceNode || this.forceNode,
						localAddress: r.localAddress || this.localAddress,
						requestTimeout: r.requestTimeout || this.requestTimeout,
						protocols: r.protocols || void 0
					});
					return n
				}, n.prototype.open = function() {
					var t;
					if (this.rememberUpgrade && n.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) t =
						"websocket";
					else {
						if (0 === this.transports.length) {
							var e = this;
							return void setTimeout(function() {
								e.emit("error", "No transports available")
							}, 0)
						}
						t = this.transports[0]
					}
					this.readyState = "opening";
					try {
						t = this.createTransport(t)
					} catch (t) {
						return this.transports.shift(), void this.open()
					}
					t.open(), this.setTransport(t)
				}, n.prototype.setTransport = function(t) {
					var e = this;
					this.transport && this.transport.removeAllListeners(), this.transport = t, t.on("drain", function() {
						e.onDrain()
					}).on("packet", function(t) {
						e.onPacket(t)
					}).on("error", function(t) {
						e.onError(t)
					}).on("close", function() {
						e.onClose("transport close")
					})
				}, n.prototype.probe = function(t) {
					function e() {
						if (u.onlyBinaryUpgrades) {
							var t = !this.supportsBinary && u.transport.supportsBinary;
							p = p || t
						}
						p || (h.send([{
							type: "ping",
							data: "probe"
						}]), h.once("packet", function(t) {
							if (!p)
								if ("pong" === t.type && "probe" === t.data) {
									if (u.upgrading = !0, u.emit("upgrading", h), !h) return;
									n.priorWebsocketSuccess = "websocket" === h.name, u.transport.pause(function() {
										p || "closed" !== u.readyState && (c(), u.setTransport(h), h.send([{
											type: "upgrade"
										}]), u.emit("upgrade", h), h = null, u.upgrading = !1, u.flush())
									})
								} else {
									var e = new Error("probe error");
									e.transport = h.name, u.emit("upgradeError", e)
								}
						}))
					}

					function r() {
						p || (p = !0, c(), h.close(), h = null)
					}

					function o(t) {
						var e = new Error("probe error: " + t);
						e.transport = h.name, r(), u.emit("upgradeError", e)
					}

					function i() {
						o("transport closed")
					}

					function s() {
						o("socket closed")
					}

					function a(t) {
						h && t.name !== h.name && r()
					}

					function c() {
						h.removeListener("open", e), h.removeListener("error", o), h.removeListener("close", i), u.removeListener(
							"close", s), u.removeListener("upgrading", a)
					}
					var h = this.createTransport(t, {
							probe: 1
						}),
						p = !1,
						u = this;
					n.priorWebsocketSuccess = !1, h.once("open", e), h.once("error", o), h.once("close", i), this.once("close", s),
						this.once("upgrading", a), h.open()
				}, n.prototype.onOpen = function() {
					if (this.readyState = "open", n.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"),
						this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause)
						for (var t = 0, e = this.upgrades.length; t < e; t++) this.probe(this.upgrades[t])
				}, n.prototype.onPacket = function(t) {
					if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (
						this.emit("packet", t), this.emit("heartbeat"), t.type) {
						case "open":
							this.onHandshake(JSON.parse(t.data));
							break;
						case "pong":
							this.setPing(), this.emit("pong");
							break;
						case "error":
							var e = new Error("server error");
							e.code = t.data, this.onError(e);
							break;
						case "message":
							this.emit("data", t.data), this.emit("message", t.data)
					}
				}, n.prototype.onHandshake = function(t) {
					this.emit("handshake", t), this.id = t.sid, this.transport.query.sid = t.sid, this.upgrades = this.filterUpgrades(
							t.upgrades), this.pingInterval = t.pingInterval, this.pingTimeout = t.pingTimeout, this.onOpen(), "closed" !==
						this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat",
							this.onHeartbeat))
				}, n.prototype.onHeartbeat = function(t) {
					clearTimeout(this.pingTimeoutTimer);
					var e = this;
					e.pingTimeoutTimer = setTimeout(function() {
						"closed" !== e.readyState && e.onClose("ping timeout")
					}, t || e.pingInterval + e.pingTimeout)
				}, n.prototype.setPing = function() {
					var t = this;
					clearTimeout(t.pingIntervalTimer), t.pingIntervalTimer = setTimeout(function() {
						t.ping(), t.onHeartbeat(t.pingTimeout)
					}, t.pingInterval)
				}, n.prototype.ping = function() {
					var t = this;
					this.sendPacket("ping", function() {
						t.emit("ping")
					})
				}, n.prototype.onDrain = function() {
					this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit(
						"drain") : this.flush()
				}, n.prototype.flush = function() {
					"closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (
						this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
				}, n.prototype.write = n.prototype.send = function(t, e, r) {
					return this.sendPacket("message", t, e, r), this
				}, n.prototype.sendPacket = function(t, e, r, n) {
					if ("function" == typeof e && (n = e, e = void 0), "function" == typeof r && (n = r, r = null), "closing" !==
						this.readyState && "closed" !== this.readyState) {
						r = r || {}, r.compress = !1 !== r.compress;
						var o = {
							type: t,
							data: e,
							options: r
						};
						this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), this.flush()
					}
				}, n.prototype.close = function() {
					function t() {
						n.onClose("forced close"), n.transport.close()
					}

					function e() {
						n.removeListener("upgrade", e), n.removeListener("upgradeError", e), t()
					}

					function r() {
						n.once("upgrade", e), n.once("upgradeError", e)
					}
					if ("opening" === this.readyState || "open" === this.readyState) {
						this.readyState = "closing";
						var n = this;
						this.writeBuffer.length ? this.once("drain", function() {
							this.upgrading ? r() : t()
						}) : this.upgrading ? r() : t()
					}
					return this
				}, n.prototype.onError = function(t) {
					n.priorWebsocketSuccess = !1, this.emit("error", t), this.onClose("transport error", t)
				}, n.prototype.onClose = function(t, e) {
					if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
						var r = this;
						clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners(
								"close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id =
							null, this.emit("close", t, e), r.writeBuffer = [], r.prevBufferLen = 0
					}
				}, n.prototype.filterUpgrades = function(t) {
					for (var e = [], r = 0, n = t.length; r < n; r++) ~a(this.transports, t[r]) && e.push(t[r]);
					return e
				}
		}).call(e, function() {
			return this
		}())
	}, function(t, e, r) {
		(function(t) {
			function n(e) {
				var r, n = !1,
					a = !1,
					c = !1 !== e.jsonp;
				if (t.location) {
					var h = "https:" === location.protocol,
						p = location.port;
					p || (p = h ? 443 : 80), n = e.hostname !== location.hostname || p !== e.port, a = e.secure !== h
				}
				if (e.xdomain = n, e.xscheme = a, r = new o(e), "open" in r && !e.forceJSONP) return new i(e);
				if (!c) throw new Error("JSONP disabled");
				return new s(e)
			}
			var o = r(13),
				i = r(15),
				s = r(30),
				a = r(31);
			e.polling = n, e.websocket = a
		}).call(e, function() {
			return this
		}())
	}, function(t, e, r) {
		(function(e) {
			var n = r(14);
			t.exports = function(t) {
				var r = t.xdomain,
					o = t.xscheme,
					i = t.enablesXDR;
				try {
					if ("undefined" != typeof XMLHttpRequest && (!r || n)) return new XMLHttpRequest
				} catch (t) {}
				try {
					if ("undefined" != typeof XDomainRequest && !o && i) return new XDomainRequest
				} catch (t) {}
				if (!r) try {
					return new(e[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
				} catch (t) {}
			}
		}).call(e, function() {
			return this
		}())
	}, function(t, e) {
		try {
			t.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
		} catch (e) {
			t.exports = !1
		}
	}, function(t, e, r) {
		(function(e) {
			function n() {}

			function o(t) {
				if (c.call(this, t), this.requestTimeout = t.requestTimeout, this.extraHeaders = t.extraHeaders, e.location) {
					var r = "https:" === location.protocol,
						n = location.port;
					n || (n = r ? 443 : 80), this.xd = t.hostname !== e.location.hostname || n !== t.port, this.xs = t.secure !==
						r
				}
			}

			function i(t) {
				this.method = t.method || "GET", this.uri = t.uri, this.xd = !!t.xd, this.xs = !!t.xs, this.async = !1 !== t.async,
					this.data = void 0 !== t.data ? t.data : null, this.agent = t.agent, this.isBinary = t.isBinary, this.supportsBinary =
					t.supportsBinary, this.enablesXDR = t.enablesXDR, this.requestTimeout = t.requestTimeout, this.pfx = t.pfx,
					this.key = t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers,
					this.rejectUnauthorized = t.rejectUnauthorized, this.extraHeaders = t.extraHeaders, this.create()
			}

			function s() {
				for (var t in i.requests) i.requests.hasOwnProperty(t) && i.requests[t].abort()
			}
			var a = r(13),
				c = r(16),
				h = r(5),
				p = r(28);
			r(3)("engine.io-client:polling-xhr");
			t.exports = o, t.exports.Request = i, p(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function(
				t) {
				return t = t || {}, t.uri = this.uri(), t.xd = this.xd, t.xs = this.xs, t.agent = this.agent || !1, t.supportsBinary =
					this.supportsBinary, t.enablesXDR = this.enablesXDR, t.pfx = this.pfx, t.key = this.key, t.passphrase = this
					.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers = this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized,
					t.requestTimeout = this.requestTimeout, t.extraHeaders = this.extraHeaders, new i(t)
			}, o.prototype.doWrite = function(t, e) {
				var r = "string" != typeof t && void 0 !== t,
					n = this.request({
						method: "POST",
						data: t,
						isBinary: r
					}),
					o = this;
				n.on("success", e), n.on("error", function(t) {
					o.onError("xhr post error", t)
				}), this.sendXhr = n
			}, o.prototype.doPoll = function() {
				var t = this.request(),
					e = this;
				t.on("data", function(t) {
					e.onData(t)
				}), t.on("error", function(t) {
					e.onError("xhr poll error", t)
				}), this.pollXhr = t
			}, h(i.prototype), i.prototype.create = function() {
				var t = {
					agent: this.agent,
					xdomain: this.xd,
					xscheme: this.xs,
					enablesXDR: this.enablesXDR
				};
				t.pfx = this.pfx, t.key = this.key, t.passphrase = this.passphrase, t.cert = this.cert, t.ca = this.ca, t.ciphers =
					this.ciphers, t.rejectUnauthorized = this.rejectUnauthorized;
				var r = this.xhr = new a(t),
					n = this;
				try {
					r.open(this.method, this.uri, this.async);
					try {
						if (this.extraHeaders) {
							r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0);
							for (var o in this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && r.setRequestHeader(o, this.extraHeaders[
								o])
						}
					} catch (t) {}
					if ("POST" === this.method) try {
						this.isBinary ? r.setRequestHeader("Content-type", "application/octet-stream") : r.setRequestHeader(
							"Content-type", "text/plain;charset=UTF-8")
					} catch (t) {}
					try {
						r.setRequestHeader("Accept", "*/*")
					} catch (t) {}
					"withCredentials" in r && (r.withCredentials = !0), this.requestTimeout && (r.timeout = this.requestTimeout),
						this.hasXDR() ? (r.onload = function() {
							n.onLoad()
						}, r.onerror = function() {
							n.onError(r.responseText)
						}) : r.onreadystatechange = function() {
							if (2 === r.readyState) try {
								var t = r.getResponseHeader("Content-Type");
								n.supportsBinary && "application/octet-stream" === t && (r.responseType = "arraybuffer")
							} catch (t) {}
							4 === r.readyState && (200 === r.status || 1223 === r.status ? n.onLoad() : setTimeout(function() {
								n.onError(r.status)
							}, 0))
						}, r.send(this.data)
				} catch (t) {
					return void setTimeout(function() {
						n.onError(t)
					}, 0)
				}
				e.document && (this.index = i.requestsCount++, i.requests[this.index] = this)
			}, i.prototype.onSuccess = function() {
				this.emit("success"), this.cleanup()
			}, i.prototype.onData = function(t) {
				this.emit("data", t), this.onSuccess()
			}, i.prototype.onError = function(t) {
				this.emit("error", t), this.cleanup(!0)
			}, i.prototype.cleanup = function(t) {
				if ("undefined" != typeof this.xhr && null !== this.xhr) {
					if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = n : this.xhr.onreadystatechange = n, t) try {
						this.xhr.abort()
					} catch (t) {}
					e.document && delete i.requests[this.index], this.xhr = null
				}
			}, i.prototype.onLoad = function() {
				var t;
				try {
					var e;
					try {
						e = this.xhr.getResponseHeader("Content-Type")
					} catch (t) {}
					t = "application/octet-stream" === e ? this.xhr.response || this.xhr.responseText : this.xhr.responseText
				} catch (t) {
					this.onError(t)
				}
				null != t && this.onData(t)
			}, i.prototype.hasXDR = function() {
				return "undefined" != typeof e.XDomainRequest && !this.xs && this.enablesXDR
			}, i.prototype.abort = function() {
				this.cleanup()
			}, i.requestsCount = 0, i.requests = {}, e.document && (e.attachEvent ? e.attachEvent("onunload", s) : e.addEventListener &&
				e.addEventListener("beforeunload", s, !1))
		}).call(e, function() {
			return this
		}())
	}, function(t, e, r) {
		function n(t) {
			var e = t && t.forceBase64;
			h && !e || (this.supportsBinary = !1), o.call(this, t)
		}
		var o = r(17),
			i = r(27),
			s = r(18),
			a = r(28),
			c = r(29);
		r(3)("engine.io-client:polling");
		t.exports = n;
		var h = function() {
			var t = r(13),
				e = new t({
					xdomain: !1
				});
			return null != e.responseType
		}();
		a(n, o), n.prototype.name = "polling", n.prototype.doOpen = function() {
			this.poll()
		}, n.prototype.pause = function(t) {
			function e() {
				r.readyState = "paused", t()
			}
			var r = this;
			if (this.readyState = "pausing", this.polling || !this.writable) {
				var n = 0;
				this.polling && (n++, this.once("pollComplete", function() {
					--n || e()
				})), this.writable || (n++, this.once("drain", function() {
					--n || e()
				}))
			} else e()
		}, n.prototype.poll = function() {
			this.polling = !0, this.doPoll(), this.emit("poll")
		}, n.prototype.onData = function(t) {
			var e = this,
				r = function(t, r, n) {
					return "opening" === e.readyState && e.onOpen(), "close" === t.type ? (e.onClose(), !1) : void e.onPacket(t)
				};
			s.decodePayload(t, this.socket.binaryType, r), "closed" !== this.readyState && (this.polling = !1, this.emit(
				"pollComplete"), "open" === this.readyState && this.poll())
		}, n.prototype.doClose = function() {
			function t() {
				e.write([{
					type: "close"
				}])
			}
			var e = this;
			"open" === this.readyState ? t() : this.once("open", t)
		}, n.prototype.write = function(t) {
			var e = this;
			this.writable = !1;
			var r = function() {
				e.writable = !0, e.emit("drain")
			};
			s.encodePayload(t, this.supportsBinary, function(t) {
				e.doWrite(t, r)
			})
		}, n.prototype.uri = function() {
			var t = this.query || {},
				e = this.secure ? "https" : "http",
				r = "";
			!1 !== this.timestampRequests && (t[this.timestampParam] = c()), this.supportsBinary || t.sid || (t.b64 = 1), t =
				i.encode(t), this.port && ("https" === e && 443 !== Number(this.port) || "http" === e && 80 !== Number(this.port)) &&
				(r = ":" + this.port), t.length && (t = "?" + t);
			var n = this.hostname.indexOf(":") !== -1;
			return e + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
		}
	}, function(t, e, r) {
		function n(t) {
			this.path = t.path, this.hostname = t.hostname, this.port = t.port, this.secure = t.secure, this.query = t.query,
				this.timestampParam = t.timestampParam, this.timestampRequests = t.timestampRequests, this.readyState = "",
				this.agent = t.agent || !1, this.socket = t.socket, this.enablesXDR = t.enablesXDR, this.pfx = t.pfx, this.key =
				t.key, this.passphrase = t.passphrase, this.cert = t.cert, this.ca = t.ca, this.ciphers = t.ciphers, this.rejectUnauthorized =
				t.rejectUnauthorized, this.forceNode = t.forceNode, this.extraHeaders = t.extraHeaders, this.localAddress = t.localAddress
		}
		var o = r(18),
			i = r(5);
		t.exports = n, i(n.prototype), n.prototype.onError = function(t, e) {
			var r = new Error(t);
			return r.type = "TransportError", r.description = e, this.emit("error", r), this
		}, n.prototype.open = function() {
			return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()),
				this
		}, n.prototype.close = function() {
			return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
		}, n.prototype.send = function(t) {
			if ("open" !== this.readyState) throw new Error("Transport not open");
			this.write(t)
		}, n.prototype.onOpen = function() {
			this.readyState = "open", this.writable = !0, this.emit("open")
		}, n.prototype.onData = function(t) {
			var e = o.decodePacket(t, this.socket.binaryType);
			this.onPacket(e)
		}, n.prototype.onPacket = function(t) {
			this.emit("packet", t)
		}, n.prototype.onClose = function() {
			this.readyState = "closed", this.emit("close")
		}
	}, function(t, e, r) {
		(function(t) {
			function n(t, r) {
				var n = "b" + e.packets[t.type] + t.data.data;
				return r(n)
			}

			function o(t, r, n) {
				if (!r) return e.encodeBase64Packet(t, n);
				var o = t.data,
					i = new Uint8Array(o),
					s = new Uint8Array(1 + o.byteLength);
				s[0] = v[t.type];
				for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
				return n(s.buffer)
			}

			function i(t, r, n) {
				if (!r) return e.encodeBase64Packet(t, n);
				var o = new FileReader;
				return o.onload = function() {
					t.data = o.result, e.encodePacket(t, r, !0, n)
				}, o.readAsArrayBuffer(t.data)
			}

			function s(t, r, n) {
				if (!r) return e.encodeBase64Packet(t, n);
				if (g) return i(t, r, n);
				var o = new Uint8Array(1);
				o[0] = v[t.type];
				var s = new w([o.buffer, t.data]);
				return n(s)
			}

			function a(t) {
				try {
					t = d.decode(t, {
						strict: !1
					})
				} catch (t) {
					return !1
				}
				return t
			}

			function c(t, e, r) {
				for (var n = new Array(t.length), o = l(t.length, r), i = function(t, r, o) {
						e(r, function(e, r) {
							n[t] = r, o(e, n)
						})
					}, s = 0; s < t.length; s++) i(s, t[s], o)
			}
			var h, p = r(19),
				u = r(20),
				f = r(21),
				l = r(22),
				d = r(23);
			t && t.ArrayBuffer && (h = r(25));
			var y = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
				m = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
				g = y || m;
			e.protocol = 3;
			var v = e.packets = {
					open: 0,
					close: 1,
					ping: 2,
					pong: 3,
					message: 4,
					upgrade: 5,
					noop: 6
				},
				b = p(v),
				k = {
					type: "error",
					data: "parser error"
				},
				w = r(26);
			e.encodePacket = function(e, r, i, a) {
				"function" == typeof r && (a = r, r = !1), "function" == typeof i && (a = i, i = null);
				var c = void 0 === e.data ? void 0 : e.data.buffer || e.data;
				if (t.ArrayBuffer && c instanceof ArrayBuffer) return o(e, r, a);
				if (w && c instanceof t.Blob) return s(e, r, a);
				if (c && c.base64) return n(e, a);
				var h = v[e.type];
				return void 0 !== e.data && (h += i ? d.encode(String(e.data), {
					strict: !1
				}) : String(e.data)), a("" + h)
			}, e.encodeBase64Packet = function(r, n) {
				var o = "b" + e.packets[r.type];
				if (w && r.data instanceof t.Blob) {
					var i = new FileReader;
					return i.onload = function() {
						var t = i.result.split(",")[1];
						n(o + t)
					}, i.readAsDataURL(r.data)
				}
				var s;
				try {
					s = String.fromCharCode.apply(null, new Uint8Array(r.data))
				} catch (t) {
					for (var a = new Uint8Array(r.data), c = new Array(a.length), h = 0; h < a.length; h++) c[h] = a[h];
					s = String.fromCharCode.apply(null, c)
				}
				return o += t.btoa(s), n(o)
			}, e.decodePacket = function(t, r, n) {
				if (void 0 === t) return k;
				if ("string" == typeof t) {
					if ("b" === t.charAt(0)) return e.decodeBase64Packet(t.substr(1), r);
					if (n && (t = a(t), t === !1)) return k;
					var o = t.charAt(0);
					return Number(o) == o && b[o] ? t.length > 1 ? {
						type: b[o],
						data: t.substring(1)
					} : {
						type: b[o]
					} : k
				}
				var i = new Uint8Array(t),
					o = i[0],
					s = f(t, 1);
				return w && "blob" === r && (s = new w([s])), {
					type: b[o],
					data: s
				}
			}, e.decodeBase64Packet = function(t, e) {
				var r = b[t.charAt(0)];
				if (!h) return {
					type: r,
					data: {
						base64: !0,
						data: t.substr(1)
					}
				};
				var n = h.decode(t.substr(1));
				return "blob" === e && w && (n = new w([n])), {
					type: r,
					data: n
				}
			}, e.encodePayload = function(t, r, n) {
				function o(t) {
					return t.length + ":" + t
				}

				function i(t, n) {
					e.encodePacket(t, !!s && r, !1, function(t) {
						n(null, o(t))
					})
				}
				"function" == typeof r && (n = r, r = null);
				var s = u(t);
				return r && s ? w && !g ? e.encodePayloadAsBlob(t, n) : e.encodePayloadAsArrayBuffer(t, n) : t.length ? void c(
					t, i,
					function(t, e) {
						return n(e.join(""))
					}) : n("0:")
			}, e.decodePayload = function(t, r, n) {
				if ("string" != typeof t) return e.decodePayloadAsBinary(t, r, n);
				"function" == typeof r && (n = r, r = null);
				var o;
				if ("" === t) return n(k, 0, 1);
				for (var i, s, a = "", c = 0, h = t.length; c < h; c++) {
					var p = t.charAt(c);
					if (":" === p) {
						if ("" === a || a != (i = Number(a))) return n(k, 0, 1);
						if (s = t.substr(c + 1, i), a != s.length) return n(k, 0, 1);
						if (s.length) {
							if (o = e.decodePacket(s, r, !1), k.type === o.type && k.data === o.data) return n(k, 0, 1);
							var u = n(o, c + i, h);
							if (!1 === u) return
						}
						c += i, a = ""
					} else a += p
				}
				return "" !== a ? n(k, 0, 1) : void 0
			}, e.encodePayloadAsArrayBuffer = function(t, r) {
				function n(t, r) {
					e.encodePacket(t, !0, !0, function(t) {
						return r(null, t)
					})
				}
				return t.length ? void c(t, n, function(t, e) {
					var n = e.reduce(function(t, e) {
							var r;
							return r = "string" == typeof e ? e.length : e.byteLength, t + r.toString().length + r + 2
						}, 0),
						o = new Uint8Array(n),
						i = 0;
					return e.forEach(function(t) {
						var e = "string" == typeof t,
							r = t;
						if (e) {
							for (var n = new Uint8Array(t.length), s = 0; s < t.length; s++) n[s] = t.charCodeAt(s);
							r = n.buffer
						}
						e ? o[i++] = 0 : o[i++] = 1;
						for (var a = r.byteLength.toString(), s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
						o[i++] = 255;
						for (var n = new Uint8Array(r), s = 0; s < n.length; s++) o[i++] = n[s]
					}), r(o.buffer)
				}) : r(new ArrayBuffer(0))
			}, e.encodePayloadAsBlob = function(t, r) {
				function n(t, r) {
					e.encodePacket(t, !0, !0, function(t) {
						var e = new Uint8Array(1);
						if (e[0] = 1, "string" == typeof t) {
							for (var n = new Uint8Array(t.length), o = 0; o < t.length; o++) n[o] = t.charCodeAt(o);
							t = n.buffer, e[0] = 0
						}
						for (var i = t instanceof ArrayBuffer ? t.byteLength : t.size, s = i.toString(), a = new Uint8Array(s.length +
								1), o = 0; o < s.length; o++) a[o] = parseInt(s[o]);
						if (a[s.length] = 255, w) {
							var c = new w([e.buffer, a.buffer, t]);
							r(null, c)
						}
					})
				}
				c(t, n, function(t, e) {
					return r(new w(e))
				})
			}, e.decodePayloadAsBinary = function(t, r, n) {
				"function" == typeof r && (n = r, r = null);
				for (var o = t, i = []; o.byteLength > 0;) {
					for (var s = new Uint8Array(o), a = 0 === s[0], c = "", h = 1; 255 !== s[h]; h++) {
						if (c.length > 310) return n(k, 0, 1);
						c += s[h]
					}
					o = f(o, 2 + c.length), c = parseInt(c);
					var p = f(o, 0, c);
					if (a) try {
						p = String.fromCharCode.apply(null, new Uint8Array(p))
					} catch (t) {
						var u = new Uint8Array(p);
						p = "";
						for (var h = 0; h < u.length; h++) p += String.fromCharCode(u[h])
					}
					i.push(p), o = f(o, c)
				}
				var l = i.length;
				i.forEach(function(t, o) {
					n(e.decodePacket(t, r, !0), o, l)
				})
			}
		}).call(e, function() {
			return this
		}())
	}, function(t, e) {
		t.exports = Object.keys || function(t) {
			var e = [],
				r = Object.prototype.hasOwnProperty;
			for (var n in t) r.call(t, n) && e.push(n);
			return e
		}
	}, function(t, e, r) {
		(function(e) {
			function n(t) {
				if (!t || "object" != typeof t) return !1;
				if (o(t)) {
					for (var r = 0, i = t.length; r < i; r++)
						if (n(t[r])) return !0;
					return !1
				}
				if ("function" == typeof e.Buffer && e.Buffer.isBuffer && e.Buffer.isBuffer(t) || "function" == typeof e.ArrayBuffer &&
					t instanceof ArrayBuffer || s && t instanceof Blob || a && t instanceof File) return !0;
				if (t.toJSON && "function" == typeof t.toJSON && 1 === arguments.length) return n(t.toJSON(), !0);
				for (var c in t)
					if (Object.prototype.hasOwnProperty.call(t, c) && n(t[c])) return !0;
				return !1
			}
			var o = r(7),
				i = Object.prototype.toString,
				s = "function" == typeof e.Blob || "[object BlobConstructor]" === i.call(e.Blob),
				a = "function" == typeof e.File || "[object FileConstructor]" === i.call(e.File);
			t.exports = n
		}).call(e, function() {
			return this
		}())
	}, function(t, e) {
		t.exports = function(t, e, r) {
			var n = t.byteLength;
			if (e = e || 0, r = r || n, t.slice) return t.slice(e, r);
			if (e < 0 && (e += n), r < 0 && (r += n), r > n && (r = n), e >= n || e >= r || 0 === n) return new ArrayBuffer(
				0);
			for (var o = new Uint8Array(t), i = new Uint8Array(r - e), s = e, a = 0; s < r; s++, a++) i[a] = o[s];
			return i.buffer
		}
	}, function(t, e) {
		function r(t, e, r) {
			function o(t, n) {
				if (o.count <= 0) throw new Error("after called too many times");
				--o.count, t ? (i = !0, e(t), e = r) : 0 !== o.count || i || e(null, n)
			}
			var i = !1;
			return r = r || n, o.count = t, 0 === t ? e() : o
		}

		function n() {}
		t.exports = r
	}, function(t, e, r) {
		var n;
		(function(t, o) {
			! function(i) {
				function s(t) {
					for (var e, r, n = [], o = 0, i = t.length; o < i;) e = t.charCodeAt(o++), e >= 55296 && e <= 56319 && o < i ?
						(r = t.charCodeAt(o++), 56320 == (64512 & r) ? n.push(((1023 & e) << 10) + (1023 & r) + 65536) : (n.push(e),
							o--)) : n.push(e);
					return n
				}

				function a(t) {
					for (var e, r = t.length, n = -1, o = ""; ++n < r;) e = t[n], e > 65535 && (e -= 65536, o += k(e >>> 10 &
						1023 | 55296), e = 56320 | 1023 & e), o += k(e);
					return o
				}

				function c(t, e) {
					if (t >= 55296 && t <= 57343) {
						if (e) throw Error("Lone surrogate U+" + t.toString(16).toUpperCase() + " is not a scalar value");
						return !1
					}
					return !0
				}

				function h(t, e) {
					return k(t >> e & 63 | 128)
				}

				function p(t, e) {
					if (0 == (4294967168 & t)) return k(t);
					var r = "";
					return 0 == (4294965248 & t) ? r = k(t >> 6 & 31 | 192) : 0 == (4294901760 & t) ? (c(t, e) || (t = 65533), r =
						k(t >> 12 & 15 | 224), r += h(t, 6)) : 0 == (4292870144 & t) && (r = k(t >> 18 & 7 | 240), r += h(t, 12), r +=
						h(t, 6)), r += k(63 & t | 128)
				}

				function u(t, e) {
					e = e || {};
					for (var r, n = !1 !== e.strict, o = s(t), i = o.length, a = -1, c = ""; ++a < i;) r = o[a], c += p(r, n);
					return c
				}

				function f() {
					if (b >= v) throw Error("Invalid byte index");
					var t = 255 & g[b];
					if (b++, 128 == (192 & t)) return 63 & t;
					throw Error("Invalid continuation byte")
				}

				function l(t) {
					var e, r, n, o, i;
					if (b > v) throw Error("Invalid byte index");
					if (b == v) return !1;
					if (e = 255 & g[b], b++, 0 == (128 & e)) return e;
					if (192 == (224 & e)) {
						if (r = f(), i = (31 & e) << 6 | r, i >= 128) return i;
						throw Error("Invalid continuation byte")
					}
					if (224 == (240 & e)) {
						if (r = f(), n = f(), i = (15 & e) << 12 | r << 6 | n, i >= 2048) return c(i, t) ? i : 65533;
						throw Error("Invalid continuation byte")
					}
					if (240 == (248 & e) && (r = f(), n = f(), o = f(), i = (7 & e) << 18 | r << 12 | n << 6 | o, i >= 65536 && i <=
							1114111)) return i;
					throw Error("Invalid UTF-8 detected")
				}

				function d(t, e) {
					e = e || {};
					var r = !1 !== e.strict;
					g = s(t), v = g.length, b = 0;
					for (var n, o = [];
						(n = l(r)) !== !1;) o.push(n);
					return a(o)
				}
				var y = "object" == typeof e && e,
					m = ("object" == typeof t && t && t.exports == y && t, "object" == typeof o && o);
				m.global !== m && m.window !== m || (i = m);
				var g, v, b, k = String.fromCharCode,
					w = {
						version: "2.1.2",
						encode: u,
						decode: d
					};
				n = function() {
					return w
				}.call(e, r, e, t), !(void 0 !== n && (t.exports = n))
			}(this)
		}).call(e, r(24)(t), function() {
			return this
		}())
	}, function(t, e) {
		t.exports = function(t) {
			return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children = [], t.webpackPolyfill = 1),
				t
		}
	}, function(t, e) {
		! function() {
			"use strict";
			for (var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", r = new Uint8Array(256), n = 0; n <
				t.length; n++) r[t.charCodeAt(n)] = n;
			e.encode = function(e) {
				var r, n = new Uint8Array(e),
					o = n.length,
					i = "";
				for (r = 0; r < o; r += 3) i += t[n[r] >> 2], i += t[(3 & n[r]) << 4 | n[r + 1] >> 4], i += t[(15 & n[r + 1]) <<
					2 | n[r + 2] >> 6], i += t[63 & n[r + 2]];
				return o % 3 === 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 === 1 && (i = i.substring(0, i.length - 2) +
					"=="), i
			}, e.decode = function(t) {
				var e, n, o, i, s, a = .75 * t.length,
					c = t.length,
					h = 0;
				"=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
				var p = new ArrayBuffer(a),
					u = new Uint8Array(p);
				for (e = 0; e < c; e += 4) n = r[t.charCodeAt(e)], o = r[t.charCodeAt(e + 1)], i = r[t.charCodeAt(e + 2)], s =
					r[t.charCodeAt(e + 3)], u[h++] = n << 2 | o >> 4, u[h++] = (15 & o) << 4 | i >> 2, u[h++] = (3 & i) << 6 | 63 &
					s;
				return p
			}
		}()
	}, function(t, e) {
		(function(e) {
			function r(t) {
				for (var e = 0; e < t.length; e++) {
					var r = t[e];
					if (r.buffer instanceof ArrayBuffer) {
						var n = r.buffer;
						if (r.byteLength !== n.byteLength) {
							var o = new Uint8Array(r.byteLength);
							o.set(new Uint8Array(n, r.byteOffset, r.byteLength)), n = o.buffer
						}
						t[e] = n
					}
				}
			}

			function n(t, e) {
				e = e || {};
				var n = new i;
				r(t);
				for (var o = 0; o < t.length; o++) n.append(t[o]);
				return e.type ? n.getBlob(e.type) : n.getBlob()
			}

			function o(t, e) {
				return r(t), new Blob(t, e || {})
			}
			var i = e.BlobBuilder || e.WebKitBlobBuilder || e.MSBlobBuilder || e.MozBlobBuilder,
				s = function() {
					try {
						var t = new Blob(["hi"]);
						return 2 === t.size
					} catch (t) {
						return !1
					}
				}(),
				a = s && function() {
					try {
						var t = new Blob([new Uint8Array([1, 2])]);
						return 2 === t.size
					} catch (t) {
						return !1
					}
				}(),
				c = i && i.prototype.append && i.prototype.getBlob;
			t.exports = function() {
				return s ? a ? e.Blob : o : c ? n : void 0
			}()
		}).call(e, function() {
			return this
		}())
	}, function(t, e) {
		e.encode = function(t) {
			var e = "";
			for (var r in t) t.hasOwnProperty(r) && (e.length && (e += "&"), e += encodeURIComponent(r) + "=" +
				encodeURIComponent(t[r]));
			return e
		}, e.decode = function(t) {
			for (var e = {}, r = t.split("&"), n = 0, o = r.length; n < o; n++) {
				var i = r[n].split("=");
				e[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
			}
			return e
		}
	}, function(t, e) {
		t.exports = function(t, e) {
			var r = function() {};
			r.prototype = e.prototype, t.prototype = new r, t.prototype.constructor = t
		}
	}, function(t, e) {
		"use strict";

		function r(t) {
			var e = "";
			do {
				e = s[t % a] + e, t = Math.floor(t / a)
			} while (t > 0);
			return e
		}

		function n(t) {
			var e = 0;
			for (p = 0; p < t.length; p++) e = e * a + c[t.charAt(p)];
			return e
		}

		function o() {
			var t = r(+new Date);
			return t !== i ? (h = 0, i = t) : t + "." + r(h++)
		}
		for (var i, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, h =
				0, p = 0; p < a; p++) c[s[p]] = p;
		o.encode = r, o.decode = n, t.exports = o
	}, function(t, e, r) {
		(function(e) {
			function n() {}

			function o(t) {
				i.call(this, t), this.query = this.query || {}, a || (e.___eio || (e.___eio = []), a = e.___eio), this.index =
					a.length;
				var r = this;
				a.push(function(t) {
					r.onData(t)
				}), this.query.j = this.index, e.document && e.addEventListener && e.addEventListener("beforeunload",
					function() {
						r.script && (r.script.onerror = n)
					}, !1)
			}
			var i = r(16),
				s = r(28);
			t.exports = o;
			var a, c = /\n/g,
				h = /\\n/g;
			s(o, i), o.prototype.supportsBinary = !1, o.prototype.doClose = function() {
				this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form
					.parentNode.removeChild(this.form), this.form = null, this.iframe = null), i.prototype.doClose.call(this)
			}, o.prototype.doPoll = function() {
				var t = this,
					e = document.createElement("script");
				this.script && (this.script.parentNode.removeChild(this.script), this.script = null), e.async = !0, e.src =
					this.uri(), e.onerror = function(e) {
						t.onError("jsonp poll error", e)
					};
				var r = document.getElementsByTagName("script")[0];
				r ? r.parentNode.insertBefore(e, r) : (document.head || document.body).appendChild(e), this.script = e;
				var n = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
				n && setTimeout(function() {
					var t = document.createElement("iframe");
					document.body.appendChild(t), document.body.removeChild(t)
				}, 100)
			}, o.prototype.doWrite = function(t, e) {
				function r() {
					n(), e()
				}

				function n() {
					if (o.iframe) try {
						o.form.removeChild(o.iframe)
					} catch (t) {
						o.onError("jsonp polling iframe removal error", t)
					}
					try {
						var t = '<iframe src="javascript:0" name="' + o.iframeId + '">';
						i = document.createElement(t)
					} catch (t) {
						i = document.createElement("iframe"), i.name = o.iframeId, i.src = "javascript:0"
					}
					i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
				}
				var o = this;
				if (!this.form) {
					var i, s = document.createElement("form"),
						a = document.createElement("textarea"),
						p = this.iframeId = "eio_iframe_" + this.index;
					s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px",
						s.target = p, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), a.name = "d", s.appendChild(a),
						document.body.appendChild(s), this.form = s, this.area = a
				}
				this.form.action = this.uri(), n(), t = t.replace(h, "\\\n"), this.area.value = t.replace(c, "\\n");
				try {
					this.form.submit()
				} catch (t) {}
				this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
					"complete" === o.iframe.readyState && r()
				} : this.iframe.onload = r
			}
		}).call(e, function() {
			return this
		}())
	}, function(t, e, r) {
		(function(e) {
			function n(t) {
				var e = t && t.forceBase64;
				e && (this.supportsBinary = !1), this.perMessageDeflate = t.perMessageDeflate, this.usingBrowserWebSocket = p &&
					!t.forceNode, this.protocols = t.protocols, this.usingBrowserWebSocket || (u = o), i.call(this, t)
			}
			var o, i = r(17),
				s = r(18),
				a = r(27),
				c = r(28),
				h = r(29),
				p = (r(3)("engine.io-client:websocket"), e.WebSocket || e.MozWebSocket);
			if ("undefined" == typeof window) try {
				o = r(32)
			} catch (t) {}
			var u = p;
			u || "undefined" != typeof window || (u = o), t.exports = n, c(n, i), n.prototype.name = "websocket", n.prototype
				.supportsBinary = !0, n.prototype.doOpen = function() {
					if (this.check()) {
						var t = this.uri(),
							e = this.protocols,
							r = {
								agent: this.agent,
								perMessageDeflate: this.perMessageDeflate
							};
						r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, r.ca = this.ca, r.ciphers =
							this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (r.headers = this.extraHeaders),
							this.localAddress && (r.localAddress = this.localAddress);
						try {
							this.ws = this.usingBrowserWebSocket ? e ? new u(t, e) : new u(t) : new u(t, e, r)
						} catch (t) {
							return this.emit("error", t)
						}
						void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (
							this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
					}
				}, n.prototype.addEventListeners = function() {
					var t = this;
					this.ws.onopen = function() {
						t.onOpen()
					}, this.ws.onclose = function() {
						t.onClose()
					}, this.ws.onmessage = function(e) {
						t.onData(e.data)
					}, this.ws.onerror = function(e) {
						t.onError("websocket error", e)
					}
				}, n.prototype.write = function(t) {
					function r() {
						n.emit("flush"), setTimeout(function() {
							n.writable = !0, n.emit("drain")
						}, 0)
					}
					var n = this;
					this.writable = !1;
					for (var o = t.length, i = 0, a = o; i < a; i++) ! function(t) {
						s.encodePacket(t, n.supportsBinary, function(i) {
							if (!n.usingBrowserWebSocket) {
								var s = {};
								if (t.options && (s.compress = t.options.compress), n.perMessageDeflate) {
									var a = "string" == typeof i ? e.Buffer.byteLength(i) : i.length;
									a < n.perMessageDeflate.threshold && (s.compress = !1)
								}
							}
							try {
								n.usingBrowserWebSocket ? n.ws.send(i) : n.ws.send(i, s)
							} catch (t) {}--o || r()
						})
					}(t[i])
				}, n.prototype.onClose = function() {
					i.prototype.onClose.call(this)
				}, n.prototype.doClose = function() {
					"undefined" != typeof this.ws && this.ws.close()
				}, n.prototype.uri = function() {
					var t = this.query || {},
						e = this.secure ? "wss" : "ws",
						r = "";
					this.port && ("wss" === e && 443 !== Number(this.port) || "ws" === e && 80 !== Number(this.port)) && (r = ":" +
							this.port), this.timestampRequests && (t[this.timestampParam] = h()), this.supportsBinary || (t.b64 = 1), t =
						a.encode(t), t.length && (t = "?" + t);
					var n = this.hostname.indexOf(":") !== -1;
					return e + "://" + (n ? "[" + this.hostname + "]" : this.hostname) + r + this.path + t
				}, n.prototype.check = function() {
					return !(!u || "__initialize" in u && this.name === n.prototype.name)
				}
		}).call(e, function() {
			return this
		}())
	}, function(t, e) {}, function(t, e) {
		var r = [].indexOf;
		t.exports = function(t, e) {
			if (r) return t.indexOf(e);
			for (var n = 0; n < t.length; ++n)
				if (t[n] === e) return n;
			return -1
		}
	}, function(t, e, r) {
		"use strict";

		function n(t, e, r) {
			this.io = t, this.nsp = e, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [],
				this.connected = !1, this.disconnected = !0, this.flags = {}, r && r.query && (this.query = r.query), this.io.autoConnect &&
				this.open()
		}
		var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
				return typeof t
			} : function(t) {
				return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" :
					typeof t
			},
			i = r(4),
			s = r(5),
			a = r(35),
			c = r(36),
			h = r(37),
			p = (r(3)("socket.io-client:socket"), r(27)),
			u = r(20);
		t.exports = e = n;
		var f = {
				connect: 1,
				connect_error: 1,
				connect_timeout: 1,
				connecting: 1,
				disconnect: 1,
				error: 1,
				reconnect: 1,
				reconnect_attempt: 1,
				reconnect_failed: 1,
				reconnect_error: 1,
				reconnecting: 1,
				ping: 1,
				pong: 1
			},
			l = s.prototype.emit;
		s(n.prototype), n.prototype.subEvents = function() {
			if (!this.subs) {
				var t = this.io;
				this.subs = [c(t, "open", h(this, "onopen")), c(t, "packet", h(this, "onpacket")), c(t, "close", h(this,
					"onclose"))]
			}
		}, n.prototype.open = n.prototype.connect = function() {
			return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(),
				this.emit("connecting"), this)
		}, n.prototype.send = function() {
			var t = a(arguments);
			return t.unshift("message"), this.emit.apply(this, t), this
		}, n.prototype.emit = function(t) {
			if (f.hasOwnProperty(t)) return l.apply(this, arguments), this;
			var e = a(arguments),
				r = {
					type: (void 0 !== this.flags.binary ? this.flags.binary : u(e)) ? i.BINARY_EVENT : i.EVENT,
					data: e
				};
			return r.options = {}, r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof e[e
					.length - 1] && (this.acks[this.ids] = e.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer
				.push(r), this.flags = {}, this
		}, n.prototype.packet = function(t) {
			t.nsp = this.nsp, this.io.packet(t)
		}, n.prototype.onopen = function() {
			if ("/" !== this.nsp)
				if (this.query) {
					var t = "object" === o(this.query) ? p.encode(this.query) : this.query;
					this.packet({
						type: i.CONNECT,
						query: t
					})
				} else this.packet({
					type: i.CONNECT
				})
		}, n.prototype.onclose = function(t) {
			this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", t)
		}, n.prototype.onpacket = function(t) {
			var e = t.nsp === this.nsp,
				r = t.type === i.ERROR && "/" === t.nsp;
			if (e || r) switch (t.type) {
				case i.CONNECT:
					this.onconnect();
					break;
				case i.EVENT:
					this.onevent(t);
					break;
				case i.BINARY_EVENT:
					this.onevent(t);
					break;
				case i.ACK:
					this.onack(t);
					break;
				case i.BINARY_ACK:
					this.onack(t);
					break;
				case i.DISCONNECT:
					this.ondisconnect();
					break;
				case i.ERROR:
					this.emit("error", t.data)
			}
		}, n.prototype.onevent = function(t) {
			var e = t.data || [];
			null != t.id && e.push(this.ack(t.id)), this.connected ? l.apply(this, e) : this.receiveBuffer.push(e)
		}, n.prototype.ack = function(t) {
			var e = this,
				r = !1;
			return function() {
				if (!r) {
					r = !0;
					var n = a(arguments);
					e.packet({
						type: u(n) ? i.BINARY_ACK : i.ACK,
						id: t,
						data: n
					})
				}
			}
		}, n.prototype.onack = function(t) {
			var e = this.acks[t.id];
			"function" == typeof e && (e.apply(this, t.data), delete this.acks[t.id])
		}, n.prototype.onconnect = function() {
			this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
		}, n.prototype.emitBuffered = function() {
			var t;
			for (t = 0; t < this.receiveBuffer.length; t++) l.apply(this, this.receiveBuffer[t]);
			for (this.receiveBuffer = [], t = 0; t < this.sendBuffer.length; t++) this.packet(this.sendBuffer[t]);
			this.sendBuffer = []
		}, n.prototype.ondisconnect = function() {
			this.destroy(), this.onclose("io server disconnect")
		}, n.prototype.destroy = function() {
			if (this.subs) {
				for (var t = 0; t < this.subs.length; t++) this.subs[t].destroy();
				this.subs = null
			}
			this.io.destroy(this)
		}, n.prototype.close = n.prototype.disconnect = function() {
			return this.connected && this.packet({
				type: i.DISCONNECT
			}), this.destroy(), this.connected && this.onclose("io client disconnect"), this
		}, n.prototype.compress = function(t) {
			return this.flags.compress = t, this
		}, n.prototype.binary = function(t) {
			return this.flags.binary = t, this
		}
	}, function(t, e) {
		function r(t, e) {
			var r = [];
			e = e || 0;
			for (var n = e || 0; n < t.length; n++) r[n - e] = t[n];
			return r
		}
		t.exports = r
	}, function(t, e) {
		"use strict";

		function r(t, e, r) {
			return t.on(e, r), {
				destroy: function() {
					t.removeListener(e, r)
				}
			}
		}
		t.exports = r
	}, function(t, e) {
		var r = [].slice;
		t.exports = function(t, e) {
			if ("string" == typeof e && (e = t[e]), "function" != typeof e) throw new Error("bind() requires a function");
			var n = r.call(arguments, 2);
			return function() {
				return e.apply(t, n.concat(r.call(arguments)))
			}
		}
	}, function(t, e) {
		function r(t) {
			t = t || {}, this.ms = t.min || 100, this.max = t.max || 1e4, this.factor = t.factor || 2, this.jitter = t.jitter >
				0 && t.jitter <= 1 ? t.jitter : 0, this.attempts = 0
		}
		t.exports = r, r.prototype.duration = function() {
			var t = this.ms * Math.pow(this.factor, this.attempts++);
			if (this.jitter) {
				var e = Math.random(),
					r = Math.floor(e * this.jitter * t);
				t = 0 == (1 & Math.floor(10 * e)) ? t - r : t + r
			}
			return 0 | Math.min(t, this.max)
		}, r.prototype.reset = function() {
			this.attempts = 0
		}, r.prototype.setMin = function(t) {
			this.ms = t
		}, r.prototype.setMax = function(t) {
			this.max = t
		}, r.prototype.setJitter = function(t) {
			this.jitter = t
		}
	}])
});

function getUrlParams(a) {
	var b = document.getElementsByTagName("script");
	for (var i = 0; i < b.length; i++) {
		if (b[i].src.indexOf("/" + a) > -1) {
			var c = b[i].src.split("?").pop().split("&");
			var p = {};
			for (var j = 0; j < c.length; j++) {
				var d = c[j].split("=");
				p[d[0]] = d[1]
			}
			return p
		}
	}
	return {}
}
var genericStrings = {
	SELECT_AN_OPTION: "Select an option...",
	BROWSE_FILE_TO_UPLOAD: "Browse and select a file",
	SUBMIT: "Submit",
	CONTINUE: "Continue",
	INVALID_INPUT: "Invalid Input",
	SEND_A_MESSAGE: "Send a Message",
	OK: "Ok",
	CANCEL: "Cancel",
	DID_THIS_ANSWER_HELP: "Did this answer help?",
	DEFAULT_ERROR_MESSAGE: "Something went wrong. Please try again or get in touch with the administrator",
	YES: "Yes",
	NO: "No",
	PLACE_HOLDER_START_TYPING_TO_FILTER: "Start typing to filter..",
	PLACE_HOLDER_PICK_A_DATE: "Pick a Date",
	PLACE_HOLDER_WRITE_A_REPLY: "Write a reply..."
};
var gotUid = false;
var retry = false;
var utils = {
	getUniqueKey: function() {
		var s = [],
			itoh = "0123456789ABCDEF";
		for (var i = 0; i < 36; i++) s[i] = Math.floor(Math.random() * 16);
		s[14] = 4;
		s[19] = s[19] & 3 | 8;
		for (var x = 0; x < 36; x++) s[x] = itoh[s[x]];
		s[8] = s[13] = s[18] = s[23] = "-";
		return s.join("")
	},
	getEscapeHtml: function(html) {
		return String(html).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(
			/>/g, "&gt;")
	},
	getHashCode: function(s) {
		var hash = 0;
		if (s.length === 0) return hash;
		for (var i = 0; i < s.length; i++) {
			var char1 = s.charCodeAt(i);
			hash = (hash << 5) - hash + char1;
			hash = hash & hash
		}
		return hash
	},
	hasClass: function(el, val) {
		var pattern = new RegExp("(^|\\s)" + val + "(\\s|$)");
		return pattern.test(el.className)
	},
	addClass: function(ele, cls) {
		if (!this.hasClass(ele, cls)) ele.className += " " + cls
	},
	removeClass: function(ele, cls) {
		if (this.hasClass(ele, cls)) {
			var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
			ele.className = ele.className.replace(reg, " ")
		}
	},
	mergeConfig: function(obj1, obj2) {
		for (var p in obj2) {
			try {
				if (obj2[p].constructor == Object) {
					obj1[p] = this.mergeConfig(obj1[p], obj2[p])
				} else {
					obj1[p] = obj2[p]
				}
			} catch (e) {
				obj1[p] = obj2[p]
			}
		}
		return obj1
	},
	initXMLhttp: function() {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
		}
		return xmlhttp
	},
	minAjax: function(config) {
		if (!config.url) {
			if (config.debugLog == true) console.log("No Url!");
			return
		}
		if (!config.type) {
			if (config.debugLog == true) console.log("No Default type (GET/POST) given!");
			return
		}
		if (!config.method) {
			config.method = true
		}
		if (!config.debugLog) {
			config.debugLog = false
		}
		var xmlhttp = this.initXMLhttp();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				if (config.success) {
					config.success(xmlhttp.responseText, xmlhttp.readyState)
				}
				if (config.debugLog == true) console.log("SuccessResponse");
				if (config.debugLog == true) console.log("Response Data:" + xmlhttp.responseText)
			} else {
				if (config.debugLog == true) console.log("FailureResponse --\x3e State:" + xmlhttp.readyState + "Status:" +
					xmlhttp.status)
			}
		};
		var sendString = [],
			sendData = config.data;
		if (config.json) {
			sendString = JSON.stringify(sendData)
		} else {
			if (typeof sendData === "string") {
				var tmpArr = String.prototype.split.call(sendData, "&");
				for (var i = 0, j = tmpArr.length; i < j; i++) {
					var datum = tmpArr[i].split("=");
					sendString.push(encodeURIComponent(datum[0]) + "=" + encodeURIComponent(datum[1]))
				}
			} else if (typeof sendData === "object" && !(sendData instanceof String || FormData && sendData instanceof FormData)) {
				for (var k in sendData) {
					var datum = sendData[k];
					if (Object.prototype.toString.call(datum) == "[object Array]") {
						for (var i = 0, j = datum.length; i < j; i++) {
							sendString.push(encodeURIComponent(k) + "[]=" + encodeURIComponent(datum[i]))
						}
					} else {
						sendString.push(encodeURIComponent(k) + "=" + encodeURIComponent(datum))
					}
				}
			}
			sendString = sendString.join("&")
		}
		if (config.type == "GET") {
			xmlhttp.open("GET", config.url + "?" + sendString, config.method);
			xmlhttp.send();
			if (config.debugLog == true) console.log("GET fired at:" + config.url + "?" + sendString)
		}
		if (config.type == "POST" || config.type == "PUT") {
			xmlhttp.open(config.type, config.url, config.method);
			xmlhttp.setRequestHeader("Content-type", "application/json");
			xmlhttp.send(sendString);
			if (config.debugLog == true) console.log("POST fired at:" + config.url + " || Data:" + sendString)
		}
	},
	getCookie: function(c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y)
			}
		}
	},
	setCookie: function(c_name, value, exdays) {
		var exdate = new Date;
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value
	},
	scrollToEnd: function() {
		var element = document.getElementById("engt-sheet-content-container");
		setTimeout(function() {
			element.scrollIntoView(false)
		}, 100)
	},
	scrollToOld: function(element, to, duration) {
		var self = this;
		var start = element.scrollTop,
			change = to - start,
			increment = 20;
		var animateScroll = function(elapsedTime) {
			elapsedTime += increment;
			var position = self.easeInOut(elapsedTime, start, change, duration);
			element.scrollTop = position;
			if (elapsedTime < duration) {
				setTimeout(function() {
					animateScroll(elapsedTime)
				}, increment)
			}
		};
		animateScroll(0)
	},
	currentDateStr: function() {
		return (new Date).toISOString().substring(0, 19)
	},
	easeInOut: function(currentTime, start, change, duration) {
		currentTime /= duration / 2;
		if (currentTime < 1) {
			return change / 2 * currentTime * currentTime + start
		}
		currentTime -= 1;
		return -change / 2 * (currentTime * (currentTime - 2) - 1) + start
	},
	secondsTohhmmss: function(totalSeconds) {
		return new Date(totalSeconds).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1")
	},
	timeSince: function(date) {
		var seconds = Math.floor((new Date - date) / 1e3);
		var interval = Math.floor(seconds / 31536e3);
		if (interval > 1) {
			return interval + " years"
		}
		interval = Math.floor(seconds / 2592e3);
		if (interval > 1) {
			return interval + " months"
		}
		interval = Math.floor(seconds / 86400);
		if (interval > 1) {
			return interval + " days"
		}
		interval = Math.floor(seconds / 3600);
		if (interval > 1) {
			return interval + " hours"
		}
		interval = Math.floor(seconds / 60);
		if (interval > 1) {
			return interval + " minutes"
		}
		return Math.floor(seconds) + " seconds"
	},
	generateShortId: function() {
		return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4)
	},
	addPickadayScripts: function() {
		var pickadayScript = document.createElement("script");
		pickadayScript.src = "https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.6.1/pikaday.js";
		document.head.appendChild(pickadayScript);
		pickadayScript.onload = function() {
			EngtChat.pickerObj = new Pikaday({
				field: document.getElementById("datepicker"),
				yearRange: [1900, 2100],
				position: "top left",
				defaultDate: new Date,
				onSelect: function(d) {
					var dd = d.getDate();
					var mm = d.getMonth() + 1;
					var yyyy = d.getFullYear();
					if (dd < 10) {
						dd = "0" + dd
					}
					if (mm < 10) {
						mm = "0" + mm
					}
					EngtChat.selectedDate = dd + "/" + mm + "/" + yyyy;
					var inputText = document.getElementById("txMessage");
					inputText.value = EngtChat.selectedDate;
					inputText.setAttribute("readonly", true);
					var sendButton = document.getElementById("engt-send-btn");
					sendButton.style.backgroundImage = "";
					sendButton.style.zIndex = 2;
					setTimeout(function() {
						inputText.focus()
					}, 0)
				}
			})
		};
		var pickadayLink = document.createElement("link");
		pickadayLink.href = "https://cdnjs.cloudflare.com/ajax/libs/pikaday/1.6.1/css/pikaday.min.css";
		pickadayLink.type = "text/css";
		pickadayLink.rel = "stylesheet";
		document.head.appendChild(pickadayLink)
	},
	sendDate: function() {
		var date = EngtChat.selectedDate;
		EngtChat.toggleDatePicker(false);
		utils.sendMsg(date, false);
		if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
			utils.removeClass(document.getElementById("engt-mic-btn"), "engt-hide-element");
			utils.addClass(document.getElementById("engt-send-btn"), "engt-hide-element")
		}
	},
	sendMsg: function(msg, focusTextarea) {
		if (utils.autoPopupTimeoutMinimized) {
			var engtContainer = document.getElementById("engt-conversation");
			var engtLauncher = document.getElementById("engt-launcher");
			utils.removeClass(engtContainer, "engt-chat-minimized");
			utils.removeClass(engtLauncher, "engt-hide-element");
			if (EngtChat.config.web_menu && EngtChat.config.web_menu.call_to_actions && EngtChat.config.web_menu.call_to_actions
				.length) {
				utils.removeClass(document.getElementById("engt-composer-menu"), "engt-hide-element")
			}
		}
		if (EngtChat.uploadFileObj) {
			EngtChat.uploadFile();
			return
		}
		if (EngtChat.selectedDate) {
			utils.sendDate();
			return
		}
		if (EngtChat.visibleAutoFill) {
			document.getElementById("txMessage").value = document.querySelector(".engt-autofill-btn.engt-autofill-active").innerText;
			EngtChat.toggleAutoFill(false);
			document.getElementById("txMessage").focus();
			return
		}
		if (focusTextarea) {
			document.getElementById("txMessage").focus()
		}
		var autofillOptions = EngtChat.autofillData.getValues().allOptions;
		var autofillEventListener = EngtChat.autofillData.getValues().eventListenerFunc;
		if (EngtChat.config.show_password_input) {
			var message = msg || document.getElementById("txMessagePassword").value.toString().trim()
		} else {
			var message = msg || document.getElementById("txMessage").value.toString().trim()
		}
		if (autofillOptions && message) {
			var foundOption = false;
			for (var i = 0; i < autofillOptions.length; i++) {
				if (autofillOptions[i].text.toLowerCase() === message.toLowerCase()) {
					message = {
						postback: autofillOptions[i].payload,
						type: "postback",
						text: autofillOptions[i].text
					};
					EngtChat.addMessage(message.text || message, new Date, "guest", "undefined");
					var msgContainer = document.querySelector(".engt-sheet-content");
					utils.scrollToOld(msgContainer, msgContainer.scrollHeight, 400);
					foundOption = true;
					break
				}
			}
			if (!foundOption) {
				EngtChat.addMessage(message, new Date, "guest", undefined);
				EngtChat.addMessage("Invalid Input. Please select an option from the dropdown only.", new Date, "engt", undefined);
				var msgContainer = document.querySelector(".engt-sheet-content");
				utils.scrollToOld(msgContainer, msgContainer.scrollHeight, 400);
				message = "";
				document.getElementById("txMessage").value = "";
				EngtChat.enableAutoFill()
			} else {
				EngtChat.toggleAutoFill(false);
				if (autofillEventListener) {
					document.getElementById("txMessage").removeEventListener("input", autofillEventListener);
					document.getElementById("txMessage").removeEventListener("click", autofillEventListener)
				}
				EngtChat.autofillData.update("", "");
				EngtChat.autofillOriginalData.setOriginalSearchStr("");
				EngtChat.autofillOriginalData.setAllOptions("");
				EngtChat.updatePlaceholder(EngtChat.config.textAreaPlaceholder)
			}
		}
		if (message != "") {
			if (gotUid == true) {
				EngtChat.sendMessage(message);
				document.getElementById("txMessage").value = ""
			} else {
				document.getElementsByClassName("engt-sheet-header-with-presence")[0].style.padding = "4px";
				var initializationDiv = document.getElementById("engati-intialization");
				utils.removeClass(initializationDiv, "engt-hide-element");
				socket.disconnect();
				socket.connect()
			}
		}
		if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
			utils.removeClass(document.getElementById("engt-mic-btn"), "engt-hide-element");
			utils.addClass(document.getElementById("engt-send-btn"), "engt-hide-element")
		}
	},
	isOlderIOS: function() {
		var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
		if (iOS) {
			try {
				var agent = window.navigator.userAgent;
				var start = agent.indexOf("OS ");
				var ver = window.Number(agent.substr(start + 3, 4).replace("_", "."));
				if (ver >= 11.3) return false;
				return true
			} catch (error) {
				return true
			}
		}
		return false
	},
	getSaturation: function(hex) {
		hex = hex.replace("#", "");
		var rgb = [parseInt(hex.substring(0, 2), 16), parseInt(hex.substring(2, 4), 16), parseInt(hex.substring(4, 6), 16)];
		for (var i = 0; i < rgb.length; i++) {
			rgb[i] = rgb[i] / 255;
			if (rgb[i] <= .03928) {
				rgb[i] = rgb[i] / 12.92
			} else {
				rgb[i] = Math.pow((rgb[i] + .055) / 1.055, 2.4)
			}
		}
		if (.2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2] > .179) {
			return "#000000"
		}
		return "#ffffff"
	},
	addMediaRecorderScript: function() {
		var mediaRecorderScript = document.createElement("script");
		mediaRecorderScript.src =
			"https://s3.ap-south-1.amazonaws.com/branding-resources/bot_files/prod/1.0.0/mediaStreamRecoder/1.0.0/mediaStreamRecoder.js";
		document.head.appendChild(mediaRecorderScript)
	},
	isSafari: false,
	isMobileOrTablet: false,
	direction: "auto"
};
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector
}
if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode
		} while (el !== null && el.nodeType === 1);
		return null
	}
}
window.utils = utils;
var elements = {};
var ack = 0;
var ackForSearchSeq = 0;
var socketTimeout;
var myTimer;
var bot_ref;
var ackMessageMap = {};
var nextNodeMap = {};
var responseIdMap = [];
var socket;
var interval_method;
var file_transaction_id;
var publicUpload;
var userLocale;
window.EngtChat = {
	visibleDatePicker: false,
	visibleFileUpload: false,
	visibleAutoFill: false,
	selectedDate: "",
	status: {
		current: undefined,
		last: undefined,
		sessionKey: undefined
	},
	inputMode: "input",
	speech: {
		allowSpeechRecognition: false,
		allowAudioConversation: false,
		allowContinuousMode: false,
		allowVoiceOutput: false,
		voiceQueue: [],
		audioObj: null,
		audioPlaying: false,
		mediaRecorder: null,
		stream: null,
		transaction_id: null,
		speechRecognizing: false,
		pauseAfterCurrentAudio: false,
		playEmptyAudioForPermission: false,
		nonVoiceTimeout: null,
		MIN_AUDIO_RECORDING_FILE_SIZE: 2e7,
		SILENCE_DELAY: 2e3,
		MIN_RECORD_TIME: 4e3,
		MAX_RECORD_TIME: 1e4,
		MIN_DECIBEL_VALUE: 100
	},
	fileUploadBaseURL: "",
	mediaIndex: 1,
	open: function() {
		clearTimeout(utils.autoPopupTimeout);
		document.getElementById("engt-auto-popup-container").style.display = "none";
		utils.removeClass(document.getElementById("engt-launcher-button"), "engt-launcher-active");
		utils.addClass(document.getElementById("engt-launcher-button"), "engt-launcher-inactive");
		if (this.config.chat_close_button_position === "BOTTOM") {
			utils.addClass(document.getElementById("engt-close-button"), "engt-launcher-active");
			utils.removeClass(document.getElementById("engt-close-button"), "engt-launcher-inactive")
		}
		document.getElementById("engt-chatbox").style.display = "block";
		utils.addClass(document.getElementById("engt-launcher"), "btn-top");
		if (document.getElementById("engt-conversation") != undefined) {
			utils.removeClass(document.getElementById("engt-conversation"), "engt-inactive");
			utils.addClass(document.getElementById("engt-conversation"), "engt-active");
			if (this.config.chat_close_button_position !== "BOTTOM") {
				utils.addClass(document.getElementById("engt-conversation"), "engt-full-size");
				utils.addClass(document.getElementById("engt-launcher"), "engt-hidden")
			}
		}
		if (EngtChat.config.header_description) {
			document.getElementById("engt-sheet-header").style.height = 70 + document.getElementById(
				"engt-sheet-header-description").clientHeight + "px";
			document.getElementsByClassName("engt-sheet-content")[0].style.top = 58 + document.getElementById(
				"engt-sheet-header-description").clientHeight + "px";
			document.getElementsByClassName("engt-sheet-content-auth-node")[0].style.paddingTop = 20 + document.getElementById(
				"engt-sheet-header-description").clientHeight + "px"
		}
		if (EngtChat.config.auto_pop_up_web_chat_type === "MINIMIZED" && EngtChat.config.setType === 1) {
			EngtChat.config.setType += 1;
			var engtContainer = document.getElementById("engt-conversation");
			var containerHeight = 62 + document.getElementById("engt-sheet-header").clientHeight;
			if (!EngtChat.config.remove_branding) {
				containerHeight = containerHeight + 33
			}
			engtContainer.style.minHeight = containerHeight + "px";
			if (EngtChat.config.web_menu && EngtChat.config.web_menu.call_to_actions && EngtChat.config.web_menu.call_to_actions
				.length) {
				utils.addClass(document.getElementById("engt-composer-menu"), "engt-hide-element")
			}
		}
	},
	close: function() {
		utils.removeClass(document.getElementById("engt-launcher-button"), "engt-launcher-inactive");
		utils.addClass(document.getElementById("engt-launcher-button"), "engt-launcher-active");
		if (utils.hasClass(document.getElementById("engt-launcher"), "engt-hide-element") && EngtChat.config.auto_pop_up_web_chat_type ===
			"MINIMIZED") {
			utils.removeClass(document.getElementById("engt-launcher"), "engt-hide-element")
		}
		utils.addClass(document.getElementById("engt-close-button"), "engt-launcher-inactive");
		utils.removeClass(document.getElementById("engt-close-button"), "engt-launcher-active");
		document.getElementById("engt-chatbox").style.display = "none";
		utils.removeClass(document.getElementById("engt-launcher"), "btn-top");
		if (document.getElementById("engt-conversation") != undefined) {
			utils.removeClass(document.getElementById("engt-conversation"), "engt-active");
			utils.addClass(document.getElementById("engt-conversation"), "engt-inactive");
			if (this.config.chat_close_button_position !== "BOTTOM") {
				utils.removeClass(document.getElementById("engt-conversation"), "engt-full-size");
				utils.removeClass(document.getElementById("engt-launcher"), "engt-hidden")
			}
		}
		if (document.getElementById("authErrorMessage") != undefined) {
			utils.addClass(document.getElementById("authErrorMessage"), "engt-hide-element")
		}
	},
	addMessage: function(message, timestamp, user, type) {
		var div_message = document.getElementById("engt-message");
		message = decodeURIComponent(encodeURIComponent(message));
		this.status.current = "engt";
		if (user == this.config.user) {
			this.status.current = "user"
		}
		if (this.status.current == "engt") {
			document.getElementById("loader_message").style.display = "none";
			message.replace("\n", "</br>")
		}
		var msgClass = "engt-embed-body";
		var divClass = "";
		var carouselclass = "";
		var mediaWidthClass = "";
		if (type === "media" || type === "image" || type === "video") {
			mediaWidthClass = "engt-media-width"
		}
		message = '<p style="white-space: pre-line;" dir=' + utils.direction + ">" + message + "</p>";
		if (type === "carousel" || type === "media") {
			carouselclass = "engt-comment-carousel-body-container"
		}
		var msgHtml = '<div class="engt-comment-body-container ' + carouselclass + '"><div class="engt-comment-body ' +
			msgClass + '">';
		msgHtml = msgHtml + message + "</div></div>";
		var msgContainer = document.createElement("div");
		var engt_comment_width_class = "engt-comment-width";
		var carousel_type = "multiple_cards";
		if (this.config.bot_avatar_image_url) {
			engt_comment_width_class = "engt-avatar-comment-width"
		} else if (type === "carousel") {
			engt_comment_width_class = "engt-carousel-comment-width";
			if (EngtChat.config.carouselLayout === "continuous_scroll") engt_comment_width_class =
				"engt-carousel-comment-width";
			else if (EngtChat.config.carouselLayout === "show_one") {
				if (EngtChat.config.cardType === "list") {
					var cardWidth = EngtChat.config.carouselWidth
				} else {
					var cardWidth = EngtChat.config.carouselWidth + 10
				}
				var style = document.createElement("style");
				style.type = "text/css";
				style.innerHTML = "#engt-container .engt-carousel-single-card-width-" + EngtChat.config.carouselWidth +
					"{max-width: " + cardWidth + "px;}";
				document.getElementsByTagName("head")[0].appendChild(style);
				engt_comment_width_class = "engt-carousel-single-card-width-" + EngtChat.config.carouselWidth
			}
		}
		if (this.config.bot_avatar_image_url && type === "carousel") {
			if (EngtChat.config.carouselLayout === "continuous_scroll") engt_comment_width_class =
				"engt-avatar-carousel-width";
			else if (EngtChat.config.carouselLayout === "show_one") {
				if (EngtChat.config.cardType === "list") {
					var cardWidth = EngtChat.config.carouselWidth
				} else {
					var cardWidth = EngtChat.config.carouselWidth + 10
				}
				var style = document.createElement("style");
				style.type = "text/css";
				style.innerHTML = "#engt-container .engt-avatar-carousel-single-card-width-" + EngtChat.config.carouselWidth +
					"{max-width: " + cardWidth + "px;}";
				document.getElementsByTagName("head")[0].appendChild(style);
				engt_comment_width_class = "engt-avatar-carousel-single-card-width-" + EngtChat.config.carouselWidth
			}
		}
		if (type === "video" || type === "image" || type === "audio" || type === "media") {
			utils.addClass(msgContainer, mediaWidthClass + " engt-comment-by-" + this.status.current + " " + divClass)
		} else {
			utils.addClass(msgContainer, "engt-comment engt-comment-by-" + this.status.current + " " + divClass + " " +
				engt_comment_width_class)
		}
		msgContainer.innerHTML = msgHtml;
		msgHtml = this.addSenderIcon(msgContainer);
		var t = document.querySelector(".engt-comment-metadata-container");
		if (t) {
			if (this.status.last != this.status.current) {
				utils.removeClass(t, "engt-comment-metadata-container");
				utils.addClass(t, "engt-comment-metadata-container-static")
			} else {
				t.parentNode.removeChild(t)
			}
		}
		window.metadata = this.metadata = document.createElement("div");
		utils.addClass(this.metadata, "engt-comment-metadata-container");
		this.metadata.innerHTML = '<div class="engt-comment-metadata">' + '<span class="engt-comment-state"></span>' +
			'<span class="engt-relative-time">' + utils.secondsTohhmmss(timestamp) +
			'</span></div><div class="engt-comment-readstate"></div>' + "</div>";
		msgContainer.appendChild(this.metadata);
		msgHtml += msgContainer.outerHTML;
		var classStr = "engt-conversation-part engt-conversation-part-grouped";
		if (this.status.last != this.status.current || this.chat_refreshed) {
			classStr = classStr + "-first";
			this.chat_refreshed = false;
			if (type === "carousel") {
				classStr = classStr + " avatar-first-carousel-width"
			}
		}
		var chatDiv = document.createElement("div");
		chatDiv.className = classStr;
		chatDiv.innerHTML = msgHtml;
		window.setTimeout(function() {
			utils.addClass(chatDiv, "fromBottomToUp")
		}, 0);
		if (EngtChat.config.edit_user_input && user == this.config.user) {
			EngtChat.removeAllElem(document.getElementsByClassName("engt-conversation-part__edit-btn"));
			if (EngtChat.prevNodeData && !EngtChat.prevNodeData.used) {
				var editIcon = document.createElement("span");
				editIcon.className = "engt-conversation-part__edit-btn";
				editIcon.addEventListener("click", EngtChat.editResponse);
				editIcon.setAttribute("data-flow", EngtChat.prevNodeData.flow_key);
				editIcon.setAttribute("data-node", EngtChat.prevNodeData.node_key);
				editIcon.setAttribute("data-user", EngtChat.prevNodeData.user_id);
				editIcon.setAttribute("title", "Change Response");
				chatDiv.appendChild(editIcon);
				EngtChat.prevNodeData.used = true
			}
		}
		div_message.insertBefore(chatDiv, div_message.lastChild);
		this.status.last = this.status.current;
		if (type === "carousel" && EngtChat.config.cardType !== "list") {
			var gliderClass = ".glider" + EngtChat.carouselTimeStamp;
			var prevClass = "#glider-prev" + EngtChat.carouselTimeStamp;
			var nextClass = "#glider-next" + EngtChat.carouselTimeStamp;
			new Glider(document.querySelector(gliderClass), {
				slidesToScroll: 1,
				slidesToShow: "auto",
				draggable: true,
				itemWidth: EngtChat.config.carouselWidth + 10,
				exactWidth: true,
				arrows: {
					prev: prevClass,
					next: nextClass
				}
			})
		}
	},
	removeAllElem: function(elems) {
		if (elems.length) {
			for (var i = 0; i < elems.length; i++) {
				elems[i].parentElement.removeChild(elems[i])
			}
		}
	},
	editResponse: function(e) {
		var flowKey = e.target.getAttribute("data-flow");
		var nodeKey = e.target.getAttribute("data-node");
		var userId = e.target.getAttribute("data-user");
		var data = {
			user_id: userId,
			bot_key: EngtChat.config.bot_key,
			message: {
				flow_node_key: flowKey + "__" + nodeKey,
				type: "trigger_flow_node"
			}
		};
		EngtChat.resetEverything();
		if (EngtChat.config.is_debug) {
			console.log("emitting on edit", data)
		}
		socket.emit("trigger_flow_node", data);
		EngtChat.prevNodeData = "";
		var defaultMsg = EngtChat.config.default_edit_response || "I want to change the answer";
		EngtChat.addMessage(defaultMsg, new Date, "guest", undefined);
		var msgContainer = document.querySelector(".engt-sheet-content");
		msgContainer.scrollTop = msgContainer.scrollHeight
	},
	addCarousel: function(templates, timestamp, user, type) {
		if (templates.carousel_cards) {
			var carouselCards = templates.carousel_cards
		} else {
			var carouselCards = templates
		}
		var htmlText = "";
		var carouselDate = timestamp.getMilliseconds();
		var convTimestamp = utils.secondsTohhmmss(timestamp);
		var timeStamp = convTimestamp;
		var timeStamp = convTimestamp.replace(/:/g, "-");
		EngtChat.carouselTimeStamp = timeStamp + carouselDate;
		var cardTextAlignment = "";
		var cardType = "separate";
		var bg_color = "#F6F6F6";
		EngtChat.config.carouselLayout = "show_one";
		EngtChat.config.carouselWidth = 170;
		var cardContentClass = "";
		var carouselCardClass = "";
		var buttonClass = "";
		var imageClass = "";
		var nextButtonClass = "";
		var gradient = "";
		var backgroundColor = "";
		var imageWidth = "";
		var header = "";
		var headerImage = "";
		var subHeader = "";
		var headerTextColor = "";
		if (templates.carousel_style_config) {
			var carouselStyleConfig = templates.carousel_style_config;
			cardType = carouselStyleConfig.type;
			EngtChat.config.cardType = carouselStyleConfig.type;
			cardTextAlignment = carouselStyleConfig.alignment;
			EngtChat.config.carouselLayout = carouselStyleConfig.layout;
			EngtChat.config.carouselWidth = carouselStyleConfig.width;
			imageWidth = EngtChat.config.carouselWidth - 2;
			header = carouselStyleConfig.header;
			subHeader = carouselStyleConfig.sub_header;
			headerImage = carouselStyleConfig.header_image;
			headerTextColor = carouselStyleConfig.header_text_color
		}
		if (cardType === "separate") {
			imageClass = "carousel-img";
			buttonClass = "engt-buttoncarousel engt-separate-card-button ";
			carouselCardClass = "";
			cardContentClass = "separate-card-content"
		} else if (cardType === "seamless") {
			buttonClass = " engt-buttoncarousel engt-seamless-card-button ";
			imageClass = "seamless-carousel-img";
			carouselCardClass = "seamless-carousel-card";
			cardContentClass = "seamless-card-content";
			backgroundColor = 'style="background-color: ' + bg_color + '!important"'
		}
		if (cardType === "list") {
			if (templates.header_buttons) {
				var headerButtons = templates.header_buttons
			}
			if (templates.footer_buttons) {
				var footerButtons = templates.footer_buttons
			}
			htmlText += '<div class="seamless-carousel-card">';
			var headerColor = "";
			var headerButtonColor = "";
			if (headerTextColor) {
				headerColor = 'style="color:' + headerTextColor + '!important"';
				headerButtonColor = 'style="color:' + headerTextColor + "; border-color :" + headerTextColor + ';"';
				document.querySelector("style").innerHTML += "#engt-container .engt-list-carousel-header-button" + EngtChat.carouselTimeStamp +
					":hover{color: white !important; background-color: " + headerTextColor + "!important;}"
			}
			if (headerImage) {
				htmlText += '<div class="engt-header-section" style="background-image: url(' + headerImage +
					') !important;"><div class="engt-carousel-header-text"><p class="engt-list-carousel-text engt-header-text-heading"><b class="engt-break-word engt-text-white" ' +
					headerColor + ">" + header + "</b></p>";
				if (subHeader) {
					htmlText += '<p class="engt-list-carousel-text engt-header-text-subheading engt-text-white" ' + headerColor +
						">" + subHeader + "</p>"
				}
				if (headerButtons) {
					htmlText += '<div class="engt-list-buttons">';
					for (var j = 0; j < headerButtons.length; j++) {
						var href = "";
						if (headerButtons[j]["type"] === "web_url") {
							href = headerButtons[j]["url"]
						} else if (headerButtons[j]["type"] === "phone_number") {
							href = headerButtons[j]["payload"]
						}
						var value = headerButtons[j]["payload"] + ")(" + headerButtons[j]["title"] + ")(" + href;
						htmlText += "<button " + headerButtonColor + ' id="btn' + j + convTimestamp +
							'" class="engt-list-header-button engt-list-carousel-header-button' + EngtChat.carouselTimeStamp +
							" engt-btncarousel" + convTimestamp + '" value="' + value + '">' + headerButtons[j]["title"] + "</button>"
					}
					htmlText += "</div>"
				}
				htmlText += "</div></div>"
			} else if (!headerImage && header) {
				htmlText +=
					'<div class="engt-header-section-no-image"><div class="engt-header-text-no-image"><p class="engt-list-carousel-text engt-header-text-heading" ' +
					headerColor + '><b class="engt-break-word">' + header + "</b></p>";
				if (subHeader) {
					htmlText += '<p class="engt-list-carousel-text engt-header-text-subheading" ' + headerColor + ">" + subHeader +
						"</p>"
				}
				if (headerButtons) {
					htmlText += '<div class="engt-list-buttons">';
					for (var j = 0; j < headerButtons.length; j++) {
						var href = "";
						if (headerButtons[j]["type"] === "web_url") {
							href = headerButtons[j]["url"]
						} else if (headerButtons[j]["type"] === "phone_number") {
							href = headerButtons[j]["payload"]
						}
						var value = headerButtons[j]["payload"] + ")(" + headerButtons[j]["title"] + ")(" + href;
						htmlText += "<button " + headerButtonColor + ' id="btn' + j + convTimestamp +
							'" class="engt-list-carousel-header-button engt-list-carousel-no-image-header-btn engt-list-header-button engt-list-header-button-black engt-list-carousel-header-button' +
							EngtChat.carouselTimeStamp + " engt-btncarousel" + convTimestamp + '" value="' + value + '">' + headerButtons[
								j]["title"] + "</button>"
					}
					htmlText += "</div>"
				}
				htmlText += "</div></div>"
			}
			htmlText += '<div class="engt-carousel-list">';
			for (var i = 0; i < carouselCards.length; i++) {
				var listContentClass = "engt-list-content";
				if (!carouselCards[i]["image_url"]) {
					listContentClass = "engt-list-content-no-image"
				}
				var borderClass = "engt-list-item";
				if (i === carouselCards.length - 1) {
					borderClass = "engt-last-list-item"
				}
				htmlText += '<div class="' + borderClass + '"><div class="engt-list-inner-div">   <div class="' +
					listContentClass + '"><p class="engt-list-carousel-text"><b class="engt-break-word">' + carouselCards[i]["title"] +
					"</b></p>";
				if (carouselCards[i]["subtitle"]) {
					htmlText += '<p class="engt-list-carousel-text engt-list-carousel-subtitle">' + carouselCards[i]["subtitle"] +
						"</p>"
				}
				htmlText += "</div>";
				if (carouselCards[i]["image_url"]) {
					htmlText += ' <div class="engt-list-image"><img class="engt-carousel-list-image" src="' + carouselCards[i][
						"image_url"
					] + '"></div>'
				}
				htmlText += "</div>";
				if (carouselCards[i].buttons) {
					var buttons = carouselCards[i].buttons
				}
				if (buttons) {
					htmlText += '<div class="engt-list-buttons">';
					for (var j = 0; j < buttons.length; j++) {
						var href = "";
						if (buttons[j]["type"] === "web_url") {
							href = buttons[j]["url"]
						} else if (buttons[j]["type"] === "phone_number") {
							href = buttons[j]["payload"]
						}
						var value = buttons[j]["payload"] + ")(" + buttons[j]["title"] + ")(" + href;
						if (j === buttons.length - 1) {
							btnClass += " engt-buttoncarousel-last "
						}
						htmlText += "<button " + backgroundColor + ' id="btn' + j + convTimestamp +
							'" class="engt-list-carousel-buttons engt-btncarousel' + convTimestamp + '" value="' + value + '">' + buttons[
								j]["title"] + "</button>"
					}
					htmlText += "</div>"
				}
				htmlText += "</div>"
			}
			if (footerButtons) {
				for (var j = 0; j < footerButtons.length; j++) {
					var href = "";
					if (footerButtons[j]["type"] === "web_url") {
						href = footerButtons[j]["url"]
					} else if (footerButtons[j]["type"] === "phone_number") {
						href = footerButtons[j]["payload"]
					}
					var value = footerButtons[j]["payload"] + ")(" + footerButtons[j]["title"] + ")(" + href;
					if (j === footerButtons.length - 1) {
						btnClass += " engt-buttoncarousel-last "
					}
					htmlText += "<button " + backgroundColor + ' id="btn' + j + convTimestamp + '" class="' + btnClass +
						"engt-list-footer-button engt-buttoncarousel engt-btncarousel" + convTimestamp + '" value="' + value + '">' +
						footerButtons[j]["title"] + "</button>"
				}
			}
			htmlText += "</div></div>"
		} else if (cardType !== "list") {
			htmlText += '<div class="glider-contain"><div class="glider' + EngtChat.carouselTimeStamp + '">';
			for (var i = 0; i < carouselCards.length; i++) {
				var gradient = "";
				if (carouselCards[i].gradient_top_color !== "#FFFFFF" && carouselCards[i].gradient_bottom_color !== "#FFFFFF" &&
					cardType === "seamless") {
					backgroundColor = 'style="background-color: transparent!important"';
					gradient = 'style="background-image:linear-gradient(' + carouselCards[i].gradient_top_color + ", " +
						carouselCards[i].gradient_bottom_color + ')!important"'
				}
				var btnClass = "";
				btnClass = buttonClass;
				var cardTooltip = "";
				if (carouselCards[i]["default_action"]) {
					cardTooltip = "title=" + carouselCards[i]["default_action"] + ""
				}
				htmlText += '<div class="card-wrapper"> <div ' + cardTooltip + ' class="engt-carousel-card ' + carouselCardClass +
					'" ' + gradient + ">";
				if (carouselCards[i]["default_action"]) {
					htmlText += '<a style="text-decoration: none" href="' + carouselCards[i]["default_action"] +
						'" + target="_blank">'
				}
				if (carouselCards[i]["image_url"]) {
					htmlText += "<div " + backgroundColor + ' class="engt-img-' + carouselCards[i]["image_aspect_ratio"] +
						'"><img class="' + imageClass + '" src="' + carouselCards[i]["image_url"] + '" style = "width : ' + imageWidth +
						'px"></div>';
					if (carouselCards[i].buttons) {
						var buttons = carouselCards[i].buttons
					}
					var noBtnCardContent = "no-btn-carousel-card";
					if (buttons.length > 0) {
						noBtnCardContent = ""
					}
					htmlText += "<div " + backgroundColor + ' class="engt-card-content engt-image-card-content-padding ' +
						cardContentClass + " " + noBtnCardContent + '">';
					htmlText += '<p style="margin:0!important;white-space: pre-line;text-align:' + cardTextAlignment + '" dir=' +
						utils.direction + '><b class="engt-break-word">' + carouselCards[i]["title"] + "</b></p>";
					if (carouselCards[i]["subtitle"]) {
						htmlText += '<p style="margin: 0!important;white-space: pre-line; text-align:' + cardTextAlignment + ';" dir=' +
							utils.direction + ">" + carouselCards[i]["subtitle"] + "</p>"
					}
					htmlText += "</div>";
					if (carouselCards[i]["default_action"]) {
						htmlText += "</a>"
					}
					if (buttons) {
						for (var j = 0; j < buttons.length; j++) {
							var href = "";
							if (buttons[j]["type"] === "web_url") {
								href = buttons[j]["url"]
							} else if (buttons[j]["type"] === "phone_number") {
								href = buttons[j]["payload"]
							}
							var value = buttons[j]["payload"] + ")(" + buttons[j]["title"] + ")(" + href;
							if (j === buttons.length - 1) {
								btnClass += " engt-buttoncarousel-last"
							}
							htmlText += "<button " + backgroundColor + ' id="btn' + j + convTimestamp + '" class="' + btnClass +
								" engt-btncarousel" + convTimestamp + '" value="' + value + '">' + buttons[j]["title"] + "</button>"
						}
					}
				} else if (carouselCards[i]["title"]) {
					htmlText += "<div " + backgroundColor + ' class="engt-card-content engt-card-content-padding ' +
						cardContentClass + ' curved-carousel-content">';
					htmlText += '<p style="margin:0!important;white-space: pre-line; text-align:' + cardTextAlignment + '" dir=' +
						utils.direction + '><b class="engt-break-word">' + carouselCards[i]["title"] + "</b></p>";
					if (carouselCards[i]["subtitle"]) {
						htmlText += '<p style="margin: 0 !important;white-space: pre-line; text-align:' + cardTextAlignment + '" dir=' +
							utils.direction + ">" + carouselCards[i]["subtitle"] + "</p>"
					}
					htmlText += "</div>";
					if (carouselCards[i]["default_action"]) {
						htmlText += "</a>"
					}
					if (carouselCards[i].buttons) {
						var buttons = carouselCards[i].buttons
					}
					if (buttons) {
						for (var j = 0; j < buttons.length; j++) {
							var href = "";
							if (buttons[j]["type"] === "web_url") {
								href = buttons[j]["url"]
							} else if (buttons[j]["type"] === "phone_number") {
								href = buttons[j]["payload"]
							}
							var value = buttons[j]["payload"] + ")(" + buttons[j]["title"] + ")(" + href;
							if (j === buttons.length - 1) {
								btnClass += " engt-buttoncarousel-last "
							}
							htmlText += "<button " + backgroundColor + ' id="btn' + j + convTimestamp + '" class="' + btnClass +
								" engt-btncarousel" + convTimestamp + '" value="' + value + '">' + buttons[j]["title"] + "</button>"
						}
					}
				}
				htmlText += "</div></div>"
			}
			htmlText += '</div><button role="button" aria-label="Previous"  id="glider-prev' + EngtChat.carouselTimeStamp +
				'" class="glider-prev"><img src="https://s3.ap-south-1.amazonaws.com/branding-resources/images/card_scroller_left.svg"style="cursor: pointer;"></button>\t';
			if (EngtChat.config.carouselLayout === "show_one") {
				nextButtonClass = "single-card-next"
			} else if (EngtChat.config.carouselLayout === "continuous_scroll") {
				nextButtonClass = "glider-next-position";
				if (carouselCards.length === 1) {
					nextButtonClass = "single-card-next"
				}
			}
			var nextButtonHidden = "";
			if (carouselCards.length === 1) {
				nextButtonHidden = 'style = "display:none;"'
			}
			htmlText += '<button role="button" aria-label="Next" id="glider-next' + EngtChat.carouselTimeStamp +
				'" class="glider-next ' + nextButtonClass + '" ' + nextButtonHidden +
				'><img src="https://s3.ap-south-1.amazonaws.com/branding-resources/images/card_scroller_right.svg" style="cursor: pointer;"></button></div>'
		}
		this.addMessage(htmlText, timestamp, user, "carousel");
		var elem = document.getElementsByClassName("engt-btncarousel" + convTimestamp);
		EngtChat.addButtonEventListener(elem, timestamp)
	},
	addLocation: function(templates, timestamp, user, type) {
		var htmlText = "";
		var conv_timestamp = utils.secondsTohhmmss(timestamp);
		if (templates["image_url"]) {
			htmlText += "Your Location:<img src=" + templates["image_url"] + ' width="250"/>';
			this.addMessage(htmlText, timestamp, user, type)
		}
	},
	addVideo: function(video_url, timestamp, user, type) {
		var htmlText = "";
		var conv_timestamp = utils.secondsTohhmmss(timestamp);
		if (video_url) {
			htmlText += '<video class="engt-width-100" controls><source src="' + video_url + '" type="video/mp4"></video>';
			this.addMessage(htmlText, timestamp, user, "video")
		}
	},
	addAudio: function(audio_url, timestamp, user, type) {
		var htmlText = "";
		var conv_timestamp = utils.secondsTohhmmss(timestamp);
		if (audio_url) {
			htmlText += '<audio controls class="engt-max-width-240"><source src="' + audio_url +
				'" type="audio/mpeg"></audio>';
			this.addMessage(htmlText, timestamp, user, "audio")
		}
	},
	addImage: function(image_url, timestamp, user, type) {
		var htmlText = "";
		var conv_timestamp = utils.secondsTohhmmss(timestamp);
		if (image_url) {
			htmlText += "<img class='engt-width-100' src='" + image_url + "' alt='image'>";
			this.addMessage(htmlText, timestamp, user, "image")
		}
	},
	addButtonEventListener: function(elem, timeStamp) {
		for (var index = 0; index < elem.length; index++) {
			(function() {
				var data = elem[index].value.split(")(");
				var postback = data[0];
				var href = data[2];
				var text = data[1];
				var message = {
					postback: postback,
					type: "postback",
					text: text
				};
				if (href === "" || href === undefined) {
					elem[index].addEventListener("click", function() {
						EngtChat.changeInputMode("input");
						EngtChat.addMessage(text, timeStamp, "guest", "undefined");
						var msgContainer = document.querySelector(".engt-sheet-content");
						utils.scrollToOld(msgContainer, msgContainer.scrollHeight, 400);
						EngtChat.sendMessage(message)
					}, false)
				} else {
					elem[index].addEventListener("click", function() {
						window.open(href, "_blank")
					}, false)
				}
			})()
		}
	},
	addMediaNode: function(mediaData, timeStamp, user, type) {
		var htmlText = "";
		var convTimestamp = utils.secondsTohhmmss(timeStamp);
		var videoButtonClass = "";
		htmlText += "<div>";
		if (mediaData.media_type === "image" && mediaData.media_url) {
			htmlText += "<img class='engt-media-node-image' src='" + mediaData.media_url + "' alt='image'>"
		} else if (mediaData.media_type === "video" && mediaData.media_url) {
			htmlText += '<video class="engt-media-node-image" controls><source src="' + mediaData.media_url +
				'" type="video/mp4"></video>';
			videoButtonClass = "engt-mt-5-neg"
		}
		if (mediaData.buttons) {
			var buttons = mediaData.buttons;
			for (var j = 0; j < buttons.length; j++) {
				var href = "";
				if (buttons[j]["type"] === "web_url") {
					href = buttons[j]["url"]
				} else if (buttons[j]["type"] === "phone_number") {
					href = buttons[j]["payload"]
				}
				var value = buttons[j]["payload"] + ")(" + buttons[j]["title"] + ")(" + href;
				htmlText += '<button id="btn' + j + convTimestamp + '" class="engt-mediabtn-listener' + convTimestamp + EngtChat.mediaIndex +
					" engt-buttoncarousel engt-buttoncarousel-last engt-media-button " + videoButtonClass + '" value="' + value +
					'">' + buttons[j]["title"] + "</button>"
			}
		}
		htmlText += "</div>";
		this.addMessage(htmlText, timeStamp, user, "media");
		var elem = document.getElementsByClassName("engt-mediabtn-listener" + convTimestamp + EngtChat.mediaIndex);
		EngtChat.addButtonEventListener(elem, timeStamp);
		EngtChat.mediaIndex++
	},
	skipLogin: function() {
		var message = {
			type: "identity",
			action: {
				skip_login: true
			}
		};
		EngtChat.sendMessage(message);
		utils.removeClass(document.getElementById("engt-conversation-window"), "engt-hide-element");
		utils.addClass(document.getElementById("engt-auth-node-window"), "engt-hide-element")
	},
	showHideMenu: function() {
		var element = document.getElementById("engt-menu-dropdown-container");
		var hamburgerMenuSection = document.getElementById("engt-hamburger-menu-section");
		if (utils.hasClass(element, "engt-hide-element")) {
			utils.removeClass(element, "engt-hide-element");
			utils.addClass(hamburgerMenuSection, "is-active")
		} else {
			utils.addClass(element, "engt-hide-element");
			utils.removeClass(hamburgerMenuSection, "is-active")
		}
	},
	getDropdownMenuHtml: function() {
		var data = this.config.web_menu.call_to_actions;
		var html = "<ul class='engt-dropdown-menu'>";
		for (var i = 0; i < data.length; i++) {
			if (data[i].type === "postback") {
				html += "<li><a onclick='EngtChat.triggerMenuOption(\"" + data[i].title + '","' + data[i].type + '","' + data[i].payload +
					"\");'>" + data[i].title + "</a></li>"
			} else if (data[i].type === "web_url") {
				html += "<li><a onclick='EngtChat.triggerMenuOption(\"" + data[i].title + '","' + data[i].type + '","' + data[i].url +
					"\");'>" + data[i].title + "</a></li>"
			}
		}
		html += "</ul><div class='engt-pillar-arrow'></div>";
		return html
	},
	triggerMenuOption: function(title, type, payload) {
		var engtNonInputElement = document.getElementById("engt-non-input-mode");
		EngtChat.resetEverything();
		utils.addClass(document.getElementById("engt-menu-dropdown-container"), "engt-hide-element");
		utils.removeClass(document.getElementById("engt-hamburger-menu-section"), "is-active");
		EngtChat.changeInputMode("input");
		if (type === "postback" && payload) {
			var message = {
				postback: payload,
				type: type,
				text: title
			};
			if (EngtChat.inputMode !== "input" && EngtChat.speech.allowVoiceOutput) {
				message.type = "audio";
				message.fusToken = null;
				message.domain = "http://app.engati.com";
				EngtChat.changeInputMode("waiting_for_response")
			}
			EngtChat.addMessage(title, new Date, "guest", "undefined");
			var msgContainer = document.querySelector(".engt-sheet-content");
			utils.scrollToEnd(msgContainer);
			EngtChat.sendMessage(message)
		} else if (type === "web_url" && payload) {
			window.open(payload, "_blank")
		}
	},
	authLogin: function() {
		var empty_params = false;
		document.getElementById("authErrorMessage").innerHTML = "";
		utils.addClass(document.getElementById("authErrorMessage"), "engt-hide-element");
		var loginInputFields = document.querySelectorAll(".engt-text-sign-in-fields input");
		var loginInputData = {};
		var empty_field_array = [];
		for (var field = 0; field < loginInputFields.length; field++) {
			if (loginInputFields[field].value == "" || loginInputFields[field].value == null) {
				utils.removeClass(document.getElementById("authErrorMessage"), "engt-hide-element");
				empty_field_array.push(auth_attr_map[loginInputFields[field].name]);
				empty_params = true
			}
			loginInputData[loginInputFields[field].name] = loginInputFields[field].value
		}
		if (empty_params === true) {
			document.getElementById("authErrorMessage").innerHTML = "Input mandatory for " + empty_field_array.join(", ") +
				".";
			return
		} else {
			document.getElementById("engt-sign-in-btn").disabled = true;
			if (Object.keys(loginInputData).length) {
				var message = {
					type: "identity",
					params: loginInputData,
					action: {}
				};
				EngtChat.sendMessage(message)
			}
		}
	},
	authNodeValidation: function(auth_node_data) {
		if (utils.hasClass(document.getElementById("engt-auth-node-window"), "engt-hide-element") && !auth_node_data[
				"login_success"]) {
			var authDiv = document.getElementById("engt-sign-in-content");
			var auth_btn_text = "Sign In";
			auth_attr_map = {};
			var htmlText = '<div class="engt-auth-login-form"><div class="engt-text-heading-sign-in">' + auth_node_data[
				"title"] + '</div><div class="engt-text-sub-heading-sign-in">' + auth_node_data["subtitle"] + "</div>";
			for (var attr in auth_node_data["attributes"]) {
				var auth_type = "";
				auth_attr_map[auth_node_data["attributes"][attr]["attribute_id"]] = auth_node_data["attributes"][attr][
					"display_name"
				];
				if (auth_node_data["attributes"][attr]["attribute_type"] == "mobile") {
					auth_node_data["attributes"][attr]["attribute_type"] = "number"
				}
				if (auth_node_data["attributes"][attr]["attribute_type"] === "password") {
					auth_type = "password"
				}
				htmlText += '<div class="engt-text-sign-in-fields"><input required name="' + auth_node_data["attributes"][attr][
						"attribute_id"
					] + '" type="' + auth_type + '" value="" class="engt-login-input"><label class="engt-login-input-label">' +
					auth_node_data["attributes"][attr]["display_name"] + "*</label></div>"
			}
			if (auth_node_data["identification_type"] === "NO_AUTH") {
				auth_btn_text = "Continue"
			}
			htmlText +=
				'<div class="engt-mt-15"><div class="engt-error-message-auth-login engt-hide-element" id="authErrorMessage"></div><button type="button" class="engt-sign-in-btn" style=" background-color:' +
				EngtChat.config.themecolor + " !important;border-color: " + EngtChat.config.themecolor + " !important;  color:" +
				this.config.themetextcolor + ' !important;" id="engt-sign-in-btn" onclick="EngtChat.authLogin();">' +
				auth_btn_text +
				'</button></div><div class="engt-sign-in-skip-login engt-hide-element"><span class="engt-text-underline engt-cursor-pointer" onclick="EngtChat.skipLogin();">Skip</span></div></div>';
			authDiv.innerHTML = htmlText;
			utils.addClass(document.getElementById("engt-conversation-window"), "engt-hide-element");
			utils.removeClass(document.getElementById("engt-auth-node-window"), "engt-hide-element");
			var loginInputFields = document.querySelectorAll(".engt-text-sign-in-fields input");
			for (var field = 0; field < loginInputFields.length; field++) {
				loginInputFields[field].addEventListener("keypress", function(e) {
					if (e.keyCode === 13) {
						EngtChat.authLogin()
					}
				}, false)
			}
			if (auth_node_data["skip_login"] === true) {
				utils.removeClass(document.getElementsByClassName("engt-sign-in-skip-login")[0], "engt-hide-element")
			}
		} else {
			if (auth_node_data["login_success"] === true) {
				if (EngtChat.currentUserId !== auth_node_data["user_id"]) {
					socket.disconnect();
					if (localStorage[this.config.bot_key + "newSessionKey"]) {
						localStorage[this.config.bot_key + "newSessionKey"] = auth_node_data["user_id"]
					}
					EngtChat.socketEventHandler()
				}
				utils.removeClass(document.getElementById("engt-conversation-window"), "engt-hide-element");
				utils.addClass(document.getElementById("engt-auth-node-window"), "engt-hide-element")
			} else if (auth_node_data["login_success"] === false && (auth_node_data["login_failed_msg"] || auth_node_data[
					"invalid_param_msg"])) {
				document.getElementById("authErrorMessage").innerHTML = auth_node_data["invalid_param_msg"] || auth_node_data[
					"login_failed_msg"];
				utils.removeClass(document.getElementById("authErrorMessage"), "engt-hide-element")
			}
		}
	},
	addOptions: function(obj, timestamp, user, type) {
		var div_message = document.getElementById("engt-message");
		this.status.current = "engt";
		if (user == this.config.user) {
			this.status.current = "user"
		}
		if (this.status.current == "engt") {
			document.getElementById("loader_message").style.display = "none"
		}
		var message = "";
		var options = obj["options"];
		obj["message"].replace("\n", "</br>");
		var msgClass = "engt-embed-body";
		var divClass = "";
		message = '<p style="white-space: pre-line;" dir=' + utils.direction + ">" + obj["message"] + "</p>";
		var msgHtml = '<div class="engt-comment-body-container" style="width:max-content;"><div class="engt-comment-body ' +
			msgClass + '">';
		msgHtml = msgHtml + message + "</div></div>";
		msgHtml = msgHtml;
		var widthClass = "engt-comment-width";
		if (this.config.bot_avatar_image_url) {
			widthClass = "engt-avatar-comment-width"
		}
		var msgContainer = document.createElement("div");
		utils.addClass(msgContainer, "engt-comment " + widthClass + " engt-comment-by-" + this.status.current + " " +
			divClass);
		msgContainer.innerHTML = msgHtml;
		msgHtml = this.addSenderIcon(msgContainer);
		var metadataContainer = document.querySelector(".engt-comment-metadata-container");
		if (metadataContainer) {
			if (this.status.last !== this.status.current) {
				utils.removeClass(metadataContainer, "engt-comment-metadata-container");
				utils.addClass(metadataContainer, "engt-comment-metadata-container-static")
			} else {
				metadataContainer.parentNode.removeChild(metadataContainer)
			}
		}
		window.metadata = this.metadata = document.createElement("div");
		utils.addClass(this.metadata, "engt-comment-metadata-container");
		this.metadata.innerHTML = '<div class="engt-comment-metadata">' + '<span class="engt-comment-state"></span>' +
			'<span class="engt-relative-time">' + utils.secondsTohhmmss(timestamp) +
			'</span></div><div class="engt-comment-readstate"></div>' + "</div>";
		msgContainer.appendChild(this.metadata);
		var optionsButtonsClass = "engt-options-buttons";
		if (this.config.bot_avatar_image_url) {
			optionsButtonsClass = "engt-avatar-options-buttons"
		}
		optioncontainer = document.createElement("div");
		utils.addClass(optioncontainer, optionsButtonsClass);
		var optionColor = this.config.button_selector_color;
		for (i = 0; i < options.length; i++) {
			var option_string = "";
			var href = "";
			var button = document.createElement("button");
			button.setAttribute("dir", utils.direction);
			button.style.cssText = "border-color: " + optionColor + " !important; color: " + optionColor + " !important";
			utils.addClass(button, "engt-opt-btn" + utils.secondsTohhmmss(timestamp));
			utils.addClass(button, "engt-opt-buttons");
			if (options[i]["type"] == "web_url") {
				href = options[i]["url"]
			} else if (options[i]["type"] == "phone_number") {
				href = options[i]["payload"]
			}
			button.type = "button";
			button.id = "btn" + i + utils.secondsTohhmmss(timestamp);
			button.value = options[i]["payload"] + ")(" + options[i]["type"] + ")(" + href + ")(" + options[i]["text"];
			if (options[i].image_url) {
				option_string += '<img class="engt_opt-image" src="' + options[i]["image_url"] + '"/>'
			}
			option_string += "<label>" + options[i]["text"] + "</label>";
			button.innerHTML = option_string;
			optioncontainer.appendChild(button)
		}
		msgContainer.appendChild(optioncontainer);
		msgHtml += msgContainer.outerHTML;
		var classStr = "engt-conversation-part engt-conversation-part-grouped";
		if (this.status.last != this.status.current || this.chat_refreshed) {
			classStr = classStr + "-first";
			this.chat_refreshed = false
		}
		var chatDiv = document.createElement("div");
		chatDiv.className = classStr;
		chatDiv.innerHTML = msgHtml;
		window.setTimeout(function() {
			utils.addClass(chatDiv, "fromBottomToUp")
		}, 0);
		div_message.insertBefore(chatDiv, div_message.lastChild);
		this.status.last = this.status.current;
		var elem = document.getElementsByClassName("engt-opt-btn" + utils.secondsTohhmmss(timestamp));
		for (var i = 0; i < elem.length; i++) {
			(function() {
				var data = elem[i].value.split(")(");
				var payload = data[0];
				var type = data[1];
				var href = data[2];
				var text = data[3];
				if (href == "" || href == undefined) {
					if (type == "location") {
						elem[i].addEventListener("click", function() {
							EngtChat.changeInputMode("input")
						}, false)
					} else {
						elem[i].addEventListener("click", function() {
							var message = {
								postback: payload,
								type: "postback",
								text: text
							};
							if (EngtChat.inputMode !== "input") {
								EngtChat.changeInputMode("input");
								if (EngtChat.speech.allowVoiceOutput) {
									message.type = "audio";
									message.fusToken = null;
									message.domain = "http://app.engati.com";
									EngtChat.changeInputMode("waiting_for_response")
								}
							}
							EngtChat.addMessage(text, timestamp, "guest", "undefined");
							var msgContainer = document.querySelector(".engt-sheet-content");
							utils.scrollToEnd(msgContainer);
							EngtChat.sendMessage(message)
						}, false)
					}
				} else {
					elem[i].addEventListener("click", function() {
						window.open(href, "_blank")
					}, false)
				}
			})()
		}
	},
	addAutoFillPopupWithSearch: function(obj) {
		EngtChat.addMessage(obj.message, new Date, "Engt", false);
		var txMessage = document.getElementById("txMessage");
		var sendSearchEvent = function() {
			txMessage.removeAttribute("readonly");
			document.getElementById("engt-autofill-popup").scrollTop = 0;
			var searchStr = txMessage.value.toString().trim();
			lengthOfOriginalOptionsData = EngtChat.autofillOriginalData.getValues().allOptions.length;
			if (lengthOfOriginalOptionsData < 250 && lengthOfOriginalOptionsData !== 0) {
				EngtChat.searchOptionsInUI(txMessage.value)
			} else {
				var textAlignClass = utils.direction === "rtl" ? "engt-text-right" : "engt-text-left";
				EngtChat.autofillOriginalData.setOriginalSearchStr(txMessage.value.trim());
				var data = {
					type: "autocomplete",
					text: searchStr
				};
				EngtChat.sendMessage(data)
			}
		};
		this.autofillData.update("", sendSearchEvent);
		txMessage.addEventListener("input", sendSearchEvent);
		txMessage.addEventListener("click", sendSearchEvent)
	},
	renderAutoFillPopupSearchOptions: function(obj) {
		var self = this;
		var allOptions = obj;
		self.toggleAutoFill(true);
		var textAlignClass = utils.direction === "rtl" ? "engt-text-right" : "engt-text-left";
		document.getElementById("engt-autofill-popup").scrollTop = 0;
		var popuphtml = "";
		var i = 0;
		allOptions.forEach(function(opt) {
			if (i === 0) {
				popuphtml += '<button tabindex="' + i + '" class="engt-autofill-btn engt-autofill-active ' + textAlignClass +
					'" dir=' + utils.direction + ">" + opt.text + "</button>"
			} else {
				popuphtml += '<button tabindex="' + i + '" class="engt-autofill-btn ' + textAlignClass + '" dir=' + utils.direction +
					">" + opt.text + "</button>"
			}
			i++
		});
		if (!popuphtml) {
			self.toggleAutoFill(false)
		}
		document.getElementById("engt-autofill-popup").innerHTML = popuphtml;
		var btns = document.getElementsByClassName("engt-autofill-btn");
		var onAutofillBtnClick = function() {
			var text = this.innerHTML;
			var txMessage = document.getElementById("txMessage");
			txMessage.value = text;
			txMessage.selectionStart = txMessage.selectionEnd = text.length;
			self.toggleAutoFill(false);
			txMessage.focus()
		};
		for (var i = 0; i < btns.length; i++) {
			btns[i].addEventListener("click", onAutofillBtnClick, false)
		}
		this.autofillData.update(allOptions, this.autofillData.getValues().eventListenerFunc)
	},
	addAutofillPopup: function(obj) {
		var self = this;
		EngtChat.addMessage(obj.message, new Date, "Engt", false);
		var allOptions = obj.options;
		var replaceWithHTMLTags = function(htmlString) {
			return String(htmlString).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g,
				"<").replace(/&gt;/g, ">")
		};
		var filterOptions = function() {
			self.toggleAutoFill(true);
			var txMessage = document.getElementById("txMessage");
			if (txMessage.getAttribute("readonly")) {
				txMessage.blur()
			}
			txMessage.removeAttribute("readonly");
			document.getElementById("engt-autofill-popup").scrollTop = 0;
			var popuphtml = "";
			var searchStr = document.getElementById("txMessage").value.toString().trim();
			var textAlignClass = utils.direction === "rtl" ? "engt-text-right" : "engt-text-left";
			var i = 0;
			allOptions.forEach(function(opt) {
				if (opt.text.toLowerCase().indexOf(searchStr.toLowerCase()) > -1) {
					if (i === 0) {
						popuphtml += '<button tabindex="' + i + '" class="engt-autofill-btn engt-autofill-active ' + textAlignClass +
							'" dir=' + utils.direction + ">" + opt.text + "</button>"
					} else {
						popuphtml += '<button tabindex="' + i + '" class="engt-autofill-btn ' + textAlignClass + '" dir=' + utils.direction +
							">" + opt.text + "</button>"
					}
					i++
				}
			});
			if (!popuphtml) {
				self.toggleAutoFill(false)
			}
			document.getElementById("engt-autofill-popup").innerHTML = popuphtml;
			var btns = document.getElementsByClassName("engt-autofill-btn");
			var onAutofillBtnClick = function() {
				var text = replaceWithHTMLTags(this.innerHTML);
				document.getElementById("txMessage").value = text;
				document.getElementById("txMessage").selectionStart = document.getElementById("txMessage").selectionEnd = text.length;
				self.toggleAutoFill(false);
				document.getElementById("txMessage").focus()
			};
			for (var i = 0; i < btns.length; i++) {
				btns[i].addEventListener("click", onAutofillBtnClick, false)
			}
		};
		this.autofillData.update(allOptions, filterOptions);
		document.getElementById("txMessage").setAttribute("readonly", true);
		document.getElementById("txMessage").addEventListener("input", filterOptions);
		document.getElementById("txMessage").addEventListener("click", filterOptions)
	},
	searchOptionsInUI: function(searchText) {
		var originalText = EngtChat.autofillOriginalData.getValues().originalSearchStr;
		originalText = originalText.trim().split(" ");
		searchTextForStorage = searchText;
		searchText = searchText.trim().split(" ");
		var counter = 0;
		for (var i = 0; i < originalText.length; i++) {
			var tempString = originalText[i];
			var length = tempString.length;
			for (var j = 0; j < searchText.length; j++) {
				if (tempString === searchText[j].slice(0, length)) {
					counter++;
					break
				}
			}
			if (counter !== i + 1) {
				break
			}
		}
		var filteredOptionsData = [];
		optionsData = EngtChat.autofillOriginalData.getValues().allOptions;
		if (counter === originalText.length && searchText != "") {
			for (var i = 0; i < optionsData.length; i++) {
				var check = 0;
				for (var j = 0; j < searchText.length; j++) {
					if (optionsData[i].text.toLowerCase().indexOf(searchText[j].toLowerCase()) !== -1) {
						check++
					}
				}
				if (check === searchText.length) {
					filteredOptionsData.push(optionsData[i])
				}
			}
			EngtChat.renderAutoFillPopupSearchOptions(filteredOptionsData)
		} else {
			var textAlignClass = utils.direction === "rtl" ? "engt-text-right" : "engt-text-left";
			EngtChat.autofillOriginalData.setOriginalSearchStr(searchTextForStorage.trim());
			var data = {
				type: "autocomplete",
				text: searchText.toString().trim()
			};
			EngtChat.sendMessage(data)
		}
	},
	autofillData: {
		allOptions: "",
		eventListenerFunc: "",
		update: function(allOptions, eventListenerFunc) {
			this.allOptions = allOptions;
			this.eventListenerFunc = eventListenerFunc
		},
		getValues: function() {
			return {
				allOptions: this.allOptions,
				eventListenerFunc: this.eventListenerFunc
			}
		}
	},
	autofillOriginalData: {
		allOptions: "",
		originalSearchStr: "",
		setOriginalSearchStr: function(originalSearchStr) {
			this.originalSearchStr = originalSearchStr
		},
		setAllOptions: function(allOptions) {
			this.allOptions = allOptions
		},
		getValues: function() {
			return {
				allOptions: this.allOptions,
				originalSearchStr: this.originalSearchStr
			}
		}
	},
	sendFileUploadResp: function(msgObj) {
		this.toggleFileUpload(false);
		this.updateFileValue("");
		this.clearFile();
		utils.sendMsg(msgObj, false);
		document.getElementById("txMessage").disabled = false;
		if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
			utils.removeClass(document.getElementById("engt-mic-btn"), "engt-hide-element");
			utils.addClass(document.getElementById("engt-send-btn"), "engt-hide-element")
		}
	},
	linkify: function(inputText) {
		var replacedText, replacePattern1, replacePattern2, replacePattern3;
		replacePattern1 = /(?!([^\<]+)<\/a>)(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		replacedText = inputText.replace(replacePattern1, '<a href="$2" target="_blank">$2</a>');
		replacePattern2 = /(?!([^\<]+)<\/a>)(^|[^\/])(www\.[\S]+(\b|$))/gim;
		replacedText = replacedText.replace(replacePattern2, '$2<a href="http://$3" target="_blank">$3</a>');
		replacePattern3 = /(?!([^\<]+)<\/a>)(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
		replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$2">$2</a>');
		return replacedText
	},
	socketEventHandler: function(launch_flow) {
		var self = this;
		socket = io.connect(EngtChat.config.server, {
			path: "/socket.io/" + EngtChat.config.bot_key
		});
		document.getElementById("loader_message").style.display = "block";
		var msgContainer = document.querySelector(".engt-sheet-content");
		utils.scrollToEnd(msgContainer);
		document.getElementById("txMessage").disabled = true;
		document.getElementsByClassName("engt-icon-name-container")[0].style.padding = "20px 20px 1px 0px";
		socket.on("connect", function() {
			EngtChat.showConsoleLog("I'm connected");
			clearInterval(myTimer);
			clearTimeout(socketTimeout);
			if (!utils.isMobileOrTablet) {
				document.getElementById("txMessage").focus()
			}
		});
		socket.on("ask_userid", function() {
			EngtChat.showConsoleLog("in ask_userid");
			socket.emit("ask_userid", {
				user_id: EngtChat.status.sessionKey,
				bot_key: EngtChat.config.bot_key
			})
		});
		socket.on("welcome_msg", function(data) {
			EngtChat.showConsoleLog("in welcome_msg");
			gotUid = true;
			launch_flow = launch_flow || EngtChat.config.launch_flow;
			EngtChat.config.key = eval(data);
			for (var ack in ackMessageMap) {
				var user_msg = {
					bot_key: EngtChat.config.bot_key,
					message: ackMessageMap[ack]["message"],
					user_id: EngtChat.status.sessionKey,
					ack: ack,
					key: EngtChat.config.key
				};
				socket.emit("user_msg", user_msg);
				delete ackMessageMap[ack]
			}
			var webUrl = window.location.href;
			var webPage = document.title;
			var welcomeMsgEmit = {
				key: EngtChat.config.key,
				user_id: EngtChat.status.sessionKey,
				attributes: EngtChat.config.user_attributes,
				bot_key: EngtChat.config.bot_key,
				welcome_msg_flag: EngtChat.config.welcome_msg,
				first_time: EngtChat.firstTime,
				launch_flow: launch_flow,
				timezone: String(-(new Date).getTimezoneOffset() / 60),
				web_url: webUrl,
				web_page: webPage
			};
			if (EngtChat.config.enableIpAddress && EngtChat.config.ipAddress && localStorage) {
				var ipAddress = localStorage.getItem(EngtChat.config.bot_key + "ipAddress");
				if (ipAddress !== EngtChat.config.ipAddress) {
					welcomeMsgEmit["ip_address"] = EngtChat.config.ipAddress;
					localStorage.setItem(EngtChat.config.bot_key + "ipAddress", EngtChat.config.ipAddress)
				}
			}
			socket.emit("welcome_msg", welcomeMsgEmit);
			EngtChat.config.welcome_msg = false;
			EngtChat.config.launch_flow = false
		});
		socket.on("disconnect", function() {
			clearInterval(myTimer);
			clearTimeout(socketTimeout);
			setTimeout(function() {
				if (document.getElementById("engt-chatbox").style.display != "none") {
					clearTimeout(socketTimeout);
					socket.connect();
					myTimer = setInterval(function() {
						if (document.getElementById("engt-chatbox").style.display != "none") {
							EngtChat.showConsoleLog("I'm dis-connected");
							clearTimeout(socketTimeout);
							socket.connect()
						} else {
							clearInterval(myTimer);
							clearTimeout(socketTimeout)
						}
					}, 2500)
				}
			}, 500)
		});
		socket.on("error", function(error) {
			EngtChat.showConsoleLog(error);
			socket.disconnect()
		});
		socket.on("got_userid", function() {
			EngtChat.showConsoleLog("in got_userid");
			document.getElementsByClassName("engt-icon-name-container")[0].style.padding = "20px 20px 1px 0px";
			var initializationDiv = document.getElementById("engati-intialization");
			utils.addClass(initializationDiv, "engt-hide-element");
			document.getElementById("loader_message").style.display = "none";
			document.getElementById("txMessage").disabled = false
		});
		socket.on("user_locale_change", function(data) {
			data = JSON.parse(data);
			EngtChat.showConsoleLog("Changing user locale to " + data["locale"]);
			userLocale = data["locale"]
		});
		socket.on("bot_response", function(data) {
			data = JSON.parse(data);
			if (responseIdMap.indexOf(data["ack"]) > -1) {
				return ""
			}
			if (data["campaign_key"]) {
				socket.emit("status_packet", {
					user_id: data["user_id"],
					bot_ref: data["bot_ref"],
					bot_key: EngtChat.config.bot_key,
					campaign_key: data["campaign_key"]
				});
				if (EngtChat.config.is_debug) {
					console.log("status packet sent for campaign -> ", data["campaign_key"])
				}
			}
			var message = data["message"];
			var msg_type = message["type"];
			var msgContainer = document.querySelector(".engt-sheet-content");
			bot_ref = data["bot_ref"] || bot_ref;
			if (EngtChat.prevNodeData && msg_type !== "typing_indicator" && msg_type !== "audioUpload" && msg_type !==
				"processedAudio") {
				var prevNodeKey = EngtChat.prevNodeData.node_key;
				if (prevNodeKey.indexOf("_") === -1 || prevNodeKey.split("_")[0] !== data["node_key"]) {
					EngtChat.prevNodeData = ""
				} else {
					EngtChat.prevNodeData.used = false
				}
			}
			if (msg_type != "typing_indicator") {
				if (EngtChat.config.is_debug) {
					console.log("Server response -> ", data)
				}
				if (EngtChat.config.disableInputOnOptions) {
					document.getElementById("txMessage").disabled = false;
					utils.addClass(document.getElementsByClassName("textarea-overlay ")[0], "engt-hide-element")
				}
			}
			if (message.voice_url && EngtChat.speech.allowVoiceOutput) {
				clearTimeout(EngtChat.speech.nonVoiceTimeout);
				if (EngtChat.inputMode === "waiting_for_response" || EngtChat.inputMode === "speaking") {
					EngtChat.playAudio(message.voice_url);
					EngtChat.speech.pauseAfterCurrentAudio = false
				}
			}
			if (!message.voice_url && EngtChat.speech.allowVoiceOutput && EngtChat.inputMode === "waiting_for_response") {
				clearTimeout(EngtChat.speech.nonVoiceTimeout);
				EngtChat.speech.nonVoiceTimeout = setTimeout(function() {
					EngtChat.changeInputMode("input")
				}, 2500)
			}
			if (msg_type == "typing_indicator") {
				var clearTimeoutTypingOff;
				if (message["action"] == "typing_on") {
					document.getElementById("loader_message").style.display = "block";
					msgContainer.scrollTop = msgContainer.scrollHeight;
					clearTimeoutTypingOff = setTimeout(function() {
						document.getElementById("loader_message").style.display = "none"
					}, 2e4)
				} else {
					document.getElementById("loader_message").style.display = "none";
					clearTimeout(clearTimeoutTypingOff)
				}
				return "success"
			} else if (msg_type === "CHANGE_AGENT_IMAGE_URL") {
				EngtChat.config.agentAvatarImageUrl = message["CHANGE_AGENT_IMAGE_URL"];
				EngtChat.config.livechatEnabled = true
			} else if (msg_type === "audioUpload") {
				EngtChat.speech.transaction_id = message.transaction_id
			} else if (msg_type === "processedAudio") {
				if (EngtChat.inputMode !== "processing_input") return;
				var text = message.data.text;
				if (text) {
					EngtChat.changeInputMode("waiting_for_response");
					EngtChat.addMessage(text, new Date, "guest", "processedAudio");
					var msgContainer = document.querySelector(".engt-sheet-content");
					utils.scrollToOld(msgContainer, msgContainer.scrollHeight, 400)
				} else {
					EngtChat.changeInputMode("exiting_voice");
					EngtChat.stopRecording()
				}
			} else if (msg_type === "text") {
				var msg = EngtChat.linkify(message["text"]);
				if (message["rcv_inp_type_flag"]) {
					EngtChat.speech.pauseAfterCurrentAudio = true;
					document.getElementById("txMessage").blur();
					if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
						utils.addClass(document.getElementById("engt-mic-btn"), "engt-hide-element");
						utils.addClass(document.getElementById("engt-send-btn"), "engt-hide-element")
					}
					if (message["rcv_inp_type_flag"] === "date") {
						if (data["node_key"]) {
							EngtChat.prevNodeData = data
						}
						self.toggleDatePicker(true)
					} else if (message["rcv_inp_type_flag"] === "file") {
						if (data["node_key"]) {
							EngtChat.prevNodeData = data
						}
						self.toggleFileUpload(true);
						file_transaction_id = message["transaction_id"];
						publicUpload = message["public_upload"]
					} else if (message["rcv_inp_type_flag"] === "password") {
						if (data["node_key"]) {
							EngtChat.prevNodeData = data
						}
						self.togglePasswordInput(true)
					}
				}
				if (data["node_key"] && data["node_key"].indexOf("_") > -1) {
					EngtChat.prevNodeData = data
				}
				EngtChat.addMessage(msg, new Date, "engt", undefined)
			} else if (msg_type == "CAROUSEL") {
				var carousel_data = message["data"];
				EngtChat.addCarousel(carousel_data, new Date, "engt", undefined)
			} else if (msg_type == "options") {
				if (data["node_key"]) {
					EngtChat.prevNodeData = data
				}
				message["data"].message = EngtChat.linkify(message["data"].message);
				var options_data = message["data"];
				var oldIOS = utils.isOlderIOS();
				if (message.enable_autofill && message.enable_search) {
					EngtChat.speech.pauseAfterCurrentAudio = true;
					EngtChat.enableAutoFill();
					EngtChat.addAutoFillPopupWithSearch(options_data)
				} else if (message.enable_autofill && (!oldIOS || options_data.options.length > 10)) {
					EngtChat.speech.pauseAfterCurrentAudio = true;
					EngtChat.enableAutoFill();
					EngtChat.addAutofillPopup(options_data)
				} else {
					EngtChat.addOptions(options_data, new Date, "engt", undefined);
					if (EngtChat.config.disableInputOnOptions) {
						document.getElementById("txMessage").value = "";
						document.getElementById("txMessage").disabled = true;
						utils.removeClass(document.getElementsByClassName("textarea-overlay ")[0], "engt-hide-element")
					}
				}
			} else if (msg_type == "video") {
				var video_url = message["data"];
				EngtChat.addVideo(video_url, new Date, "engt", undefined)
			} else if (msg_type == "audio") {
				var audio_url = message["data"];
				EngtChat.addAudio(audio_url, new Date, "engt", undefined)
			} else if (msg_type == "image") {
				var image_url = message["data"];
				EngtChat.addImage(image_url, new Date, "engt", undefined)
			} else if (msg_type === "MEDIA") {
				var mediaData = message["data"];
				EngtChat.addMediaNode(mediaData, new Date, "engt", undefined)
			} else if (msg_type == "verify") {
				if (data["ack"] && data["ack"] != "null") {
					responseIdMap.push(data["ack"]);
					socket.emit("msg_received", {
						user_id: data["user_id"],
						bot_ref: data["bot_ref"],
						bot_key: EngtChat.config.bot_key,
						ack: data["ack"]
					})
				}
				EngtChat.showConsoleLog("Not from a Verified Host.");
				socket.disconnect();
				EngtChat.close();
				return "success"
			} else if (msg_type == "identity") {
				EngtChat.changeInputMode("input");
				var auth_data = message["data"];
				var sign_in_btn = document.getElementById("engt-sign-in-btn");
				if (sign_in_btn != undefined) {
					document.getElementById("engt-sign-in-btn").disabled = false
				}
				if (auth_data["user_id"]) {
					EngtChat.currentUserId = EngtChat.status.sessionKey;
					EngtChat.status.sessionKey = auth_data["user_id"];
					self.status.sessionKey = EngtChat.status.sessionKey
				}
				EngtChat.authNodeValidation(auth_data)
			} else if (msg_type === "autocomplete" && EngtChat.autofillData.eventListenerFunc) {
				var options_data = message["data"];
				var ackReceived = parseInt(message["ack"]);
				if (ackReceived >= ackForSearchSeq) {
					EngtChat.autofillOriginalData.setAllOptions(options_data.options);
					EngtChat.renderAutoFillPopupSearchOptions(options_data.options);
					ackForSearchSeq = ackReceived
				}
			} else if (msg_type === "WEB_VIEW") {
				var webViewData = message["data"];
				var urlPrefixMessage = webViewData["url_prefix_msg"];
				var url = webViewData["url"];
				var htmlLinkedText = '<a href="' + url + '" target="_blank">' + urlPrefixMessage + "</a>";
				EngtChat.addMessage(htmlLinkedText, new Date, "engt", "WEB_VIEW");
				window.open(url, "_blank")
			}
			utils.scrollToEnd(msgContainer);
			if (data["ack"] && data["ack"] != "null") {
				responseIdMap.push(data["ack"]);
				socket.emit("msg_received", {
					user_id: data["user_id"],
					bot_ref: data["bot_ref"],
					bot_key: EngtChat.config.bot_key,
					ack: data["ack"]
				});
				if (EngtChat.config.is_debug) {
					console.log("ack send -> ", data["ack"])
				}
			}
		})
	},
	initEventHandler: function() {
		document.getElementById("engt-launcher-button").onclick = function(e) {
			EngtChat.open();
			EngtChat.socketEventHandler();
			socket.emit("chat_status_change", {
				user_id: EngtChat.status.sessionKey,
				bot_key: EngtChat.config.bot_key,
				message: {
					text: "chat opened",
					type: "chat_status_change",
					isOpen: true
				}
			})
		};
		document.getElementById("engt-auto-popup-container").onclick = function(e) {
			if (e.target.className.indexOf("pop-up-close") != -1) {
				utils.addClass(document.getElementById("engt-auto-popup-container"), "engt-hide-element")
			} else {
				EngtChat.open();
				EngtChat.socketEventHandler()
			}
		};
		if (document.getElementById("engt-close-button") != undefined) {
			document.getElementById("engt-close-button").onclick = closeChat
		}
		if (document.getElementById("engt-sheet-header-close") != undefined) {
			document.getElementById("engt-sheet-header-close").onclick = closeChat
		}

		function closeChat(e) {
			socket.emit("chat_status_change", {
				user_id: EngtChat.status.sessionKey,
				bot_key: EngtChat.config.bot_key,
				message: {
					text: "chat closed",
					type: "chat_status_change",
					isOpen: false
				}
			});
			if (EngtChat.config.is_crm_update) {
				socket.emit("close_chat_widget", {
					user_id: EngtChat.status.sessionKey,
					bot_key: EngtChat.config.bot_key
				})
			}
			socket.disconnect();
			EngtChat.close();
			gotUid = false;
			EngtChat.showConsoleLog("disconnected")
		}
		window.onunload = function() {
			socket.emit("chat_status_change", {
				user_id: EngtChat.status.sessionKey,
				bot_key: EngtChat.config.bot_key,
				message: {
					text: "chat closed",
					type: "chat_status_change",
					isOpen: false
				}
			});
			if (EngtChat.config.is_crm_update) {
				socket.emit("close_chat_widget", {
					user_id: EngtChat.status.sessionKey,
					bot_key: EngtChat.config.bot_key
				});
				socket.disconnect()
			}
		};
		var fncTxMessageKeydown = function(e) {
			e = window.event || e;
			var keyCode = e.which ? e.which : e.keyCode;
			if (keyCode == 13 && !e.shiftKey) {
				if (e.preventDefault) {
					e.preventDefault()
				} else {
					e.returnValue = false
				}
				utils.sendMsg(null, true);
				return false
			} else if (keyCode == 40) {
				if (EngtChat.visibleAutoFill) {
					var activeBtn = document.querySelector(".engt-autofill-btn.engt-autofill-active");
					var inputs = document.getElementsByClassName("engt-autofill-btn");
					e.preventDefault();
					if (activeBtn.tabIndex === inputs.length - 1) {
						var nextInput = inputs[0];
						document.getElementById("engt-autofill-popup").scrollTop = 0
					} else {
						var nextInput = inputs[activeBtn.tabIndex + 1];
						document.getElementById("engt-autofill-popup").scrollTop = nextInput.offsetTop - 5
					}
					if (nextInput) {
						utils.removeClass(activeBtn, "engt-autofill-active");
						utils.addClass(nextInput, "engt-autofill-active")
					}
				}
			} else if (keyCode == 38) {
				if (EngtChat.visibleAutoFill) {
					var activeBtn = document.querySelector(".engt-autofill-btn.engt-autofill-active");
					var inputs = document.getElementsByClassName("engt-autofill-btn");
					e.preventDefault();
					if (activeBtn.tabIndex === 0) {
						var nextInput = inputs[inputs.length - 1];
						document.getElementById("engt-autofill-popup").scrollTop = document.getElementById("engt-autofill-popup").scrollHeight
					} else {
						var nextInput = inputs[activeBtn.tabIndex - 1];
						document.getElementById("engt-autofill-popup").scrollTop = nextInput.offsetTop - 5
					}
					if (nextInput) {
						utils.removeClass(activeBtn, "engt-autofill-active");
						utils.addClass(nextInput, "engt-autofill-active")
					}
				}
			}
		};
		if (document.getElementById("txMessage") != undefined) {
			document.getElementById("txMessage").onkeydown = fncTxMessageKeydown;
			document.getElementById("txMessagePassword").onkeydown = fncTxMessageKeydown;
			document.getElementById("engt-send-btn").addEventListener("click", utils.sendMsg.bind(null, null, true))
		}
		document.getElementById("engt-composer-refresh").addEventListener("click", function() {
			var msgDivs = document.querySelectorAll(".engt-conversation-part:not(#loader_message)");
			var parent = document.getElementById("engt-message");
			for (var i = 0; i < msgDivs.length; i++) {
				parent.removeChild(msgDivs[i])
			}
			EngtChat.chat_refreshed = true;
			EngtChat.resetEverything();
			socket.emit("welcome_msg", {
				key: EngtChat.config.key,
				user_id: EngtChat.status.sessionKey,
				attributes: EngtChat.config.user_attributes,
				bot_key: EngtChat.config.bot_key,
				welcome_msg_flag: true,
				first_time: true,
				launch_flow: EngtChat.config.launch_flow_copy
			})
		}, false)
	},
	resetEverything: function(params) {
		document.getElementById("txMessage").disabled = false;
		utils.addClass(document.getElementsByClassName("textarea-overlay ")[0], "engt-hide-element");
		utils.addClass(document.getElementById("engt-upload-loader"), "engt-hide-element");
		EngtChat.toggleDatePicker(false);
		EngtChat.toggleFileUpload(false);
		EngtChat.updateFileValue("");
		EngtChat.clearFile();
		EngtChat.toggleAutoFill(false);
		var autofillEventListener = EngtChat.autofillData.getValues().eventListenerFunc;
		if (autofillEventListener) {
			document.getElementById("txMessage").removeEventListener("input", autofillEventListener);
			document.getElementById("txMessage").removeEventListener("click", autofillEventListener)
		}
		EngtChat.autofillData.update("", "");
		EngtChat.autofillOriginalData.setOriginalSearchStr("");
		EngtChat.autofillOriginalData.setAllOptions("");
		document.getElementById("txMessage").value = "";
		if (utils.engt_recognition) {
			utils.engt_recognition.abort()
		}
		if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
			utils.removeClass(document.getElementById("engt-mic-btn"), "engt-hide-element");
			utils.addClass(document.getElementById("engt-send-btn"), "engt-hide-element")
		}
		EngtChat.toggleAutoFill(false);
		EngtChat.changeInputMode("input");
		if (!utils.isMobileOrTablet) {
			document.getElementById("txMessage").focus()
		}
		EngtChat.updatePlaceholder(EngtChat.config.textAreaPlaceholder)
	},
	sendMessage: function(msg, type) {
		var self = this;
		var currDate = new Date;
		var autofillOptions = EngtChat.autofillData.getValues().allOptions;
		var autofillEventListener = EngtChat.autofillData.getValues().eventListenerFunc;
		if (msg.type !== "autocomplete" && (autofillOptions || autofillEventListener)) {
			this.toggleAutoFill(false);
			if (autofillEventListener) {
				document.getElementById("txMessage").removeEventListener("input", autofillEventListener);
				document.getElementById("txMessage").removeEventListener("click", autofillEventListener)
			}
			EngtChat.autofillData.update("", "");
			EngtChat.autofillOriginalData.setOriginalSearchStr("");
			EngtChat.autofillOriginalData.setAllOptions("");
			EngtChat.updatePlaceholder(EngtChat.config.textAreaPlaceholder)
		}
		if (this.visibleDatePicker) {
			this.toggleDatePicker(false)
		}
		if (this.visibleFileUpload) {
			this.toggleFileUpload(false);
			this.updateFileValue("")
		}
		if (this.config.disableInputOnOptions) {
			document.getElementById("txMessage").disabled = false;
			utils.addClass(document.getElementsByClassName("textarea-overlay ")[0], "engt-hide-element")
		}
		if (typeof msg == "object") {
			var message = msg;
			if (message["type"] == "location") {
				EngtChat.addLocation(message, new Date, "guest", undefined);
				var msgContainer = document.querySelector(".engt-sheet-content");
				utils.scrollToOld(msgContainer, msgContainer.scrollHeight, 400)
			}
		} else {
			var escapedMsg = utils.getEscapeHtml(msg);
			if (EngtChat.config.show_password_input) {
				this.addMessage(escapedMsg.replace(/./gi, "."), currDate, "guest", type);
				EngtChat.togglePasswordInput(false)
			} else {
				this.addMessage(escapedMsg, currDate, "guest", type)
			}
			var msgContainer = document.querySelector(".engt-sheet-content");
			utils.scrollToEnd(msgContainer);
			var message = {
				type: "text",
				text: msg
			}
		}
		ack = parseInt(ack) + 1;
		var ackCopy = ack;
		if (EngtChat.config.is_debug) {
			console.log("Client msg -> ", {
				bot_key: self.config.bot_key,
				message: message,
				user_id: self.status.sessionKey,
				ack: ack
			})
		}
		socket.emit("user_msg", {
			bot_key: self.config.bot_key,
			message: message,
			user_id: self.status.sessionKey,
			ack: ack,
			key: self.config.key
		}, function(ackCopy) {
			EngtChat.showConsoleLog("Got server ack: " + ackCopy);
			delete ackMessageMap[ackCopy]
		});
		ackMessageMap[ack] = {
			message: message,
			timestamp: Date.now(),
			retryCount: 0
		};
		clearTimeout(socketTimeout);
		socketTimeout = setTimeout(function() {
			if (ackMessageMap[ackCopy]) {
				socket.disconnect();
				EngtChat.showConsoleLog("disconnected and connecting again.")
			}
		}, 5e3)
	},
	getFontFamily: function(fontFamily, fontWeight) {
		var themeFontOptions = {
			arial: "Arial",
			calibri: "Calibri",
			helvetica: "Helvetica",
			roboto: "Roboto",
			verdana: "Verdana",
			garamond: "'Garamond', serif",
			indieFlower: "Indie Flower"
		};
		var fontFamilyCls = "";
		if ((fontFamily === "helvetica" || fontFamily === "garamond" || fontFamily === "roboto") && fontWeight === "LIGHT") {
			fontFamilyCls = "#engt-container .engt-chatbox, .engt-opt-buttons, .engt-popup-text{font-family: " +
				themeFontOptions[fontFamily] + "!important; font-weight: 300!important}"
		} else if (fontFamily === "indieFlower") {
			fontFamilyCls =
				'#engt-container .engt-chatbox, .engt-opt-buttons, .engt-popup-text{font-family: "Indie Flower script=all rev=2", "Adobe Blank"!important;}'
		} else {
			fontFamilyCls = "#engt-container .engt-chatbox, .engt-opt-buttons, .engt-popup-text{font-family: " +
				themeFontOptions[fontFamily] + "!important}"
		}
		return fontFamilyCls
	},
	showConsoleLog: function(log) {
		if (EngtChat.config.is_debug) {
			console.log(log)
		}
	},
	init: function(config) {
		var self = this;
		this.config = utils.mergeConfig({
			user: "guest",
			e: "p",
			server: "https://app.engati.com",
			bot_name: "Engati",
			themecolor: "#19BE6E",
			bot_key: undefined,
			icon_url: undefined,
			chat_widget_position: "bottomright",
			user_attributes: null,
			retryInterval: 5e3,
			maxRetry: 3,
			remove_branding: false,
			use_icon_dimensions: false,
			launch_flow: undefined,
			launch_flow_copy: undefined,
			refresh_chat: false,
			brand_name: "Engati",
			key: "",
			set_default_brand: false,
			show_password_input: false,
			textAreaPlaceholder: "Write a reply...",
			header_description: null,
			auto_pop_up_web_chat_type: "NONE",
			is_debug: false,
			setType: 1,
			livechatEnabled: false,
			agentAvatarImageUrl: null,
			livechatMessageCount: 1,
			fontSize: "13px",
			enableIpAddress: false,
			ipAddress: null
		}, config);
		if (this.config.e === "d") {
			this.config.server = "https://dev.engati.com";
			EngtChat.fileUploadBaseURL = "https://dev.engati.com"
		} else if (this.config.e === "p") {
			this.config.server = "https://app.engati.com";
			EngtChat.fileUploadBaseURL = "https://upload.engati.com"
		} else if (this.config.e === "l") {
			this.config.server = "http://localhost:5010";
			EngtChat.fileUploadBaseURL = "http://localhost:5010"
		} else if (this.config.e === "qa") {
			this.config.server = "https://qa.engati.com";
			EngtChat.fileUploadBaseURL = "https://qa.engati.com"
		} else if (this.config.e === "staging") {
			this.config.server = "https://staging.engati.com";
			EngtChat.fileUploadBaseURL = "https://staging.engati.com"
		} else if (this.config.e === "op") {
			this.config.server = config.server;
			EngtChat.fileUploadBaseURL = config.server
		}
		this.getBotConfig = function() {
			var xhttp = new XMLHttpRequest;
			var resp;
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {
						resp = JSON.parse(xhttp.responseText);
						self.successCBBotConfig(resp)
					} else {
						EngtChat.showConsoleLog("Error in getting Bot Configs. Response: " + JSON.stringify(xhttp.responseText))
					}
				}
			};
			xhttp.open("GET", this.config.server + "/web/webchat_config/" + this.config.bot_key + "?branding_key=" + this.config
				.branding_key, true);
			xhttp.send()
		};
		this.getBotConfig();
		var xhttp2 = new XMLHttpRequest;
		var genericStringResponse;
		var params = ["SETTINGS.SELECT_AN_OPTION", "SETTINGS.BROWSE_FILE_TO_UPLOAD", "SETTINGS.SUBMIT", "SETTINGS.CONTINUE",
			"SETTINGS.INVALID_INPUT", "SETTINGS.PICK_A_DATE", "SETTINGS.START_TYPING_TO_FILTER", "SETTINGS.WRITE_A_REPLY",
			"SETTINGS.SEND_A_MESSAGE", "SETTINGS.OK", "SETTINGS.CANCEL", "SETTINGS.DID_THIS_ANSWER_HELP",
			"SETTINGS.DEFAULT_ERROR_MESSAGE", "SETTINGS.YES", "SETTINGS.NO"
		];
		xhttp2.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				genericStringResponse = JSON.parse(xhttp2.responseText)
			}
		};
		xhttp2.open("POST", this.config.server + "/web/generic-strings/" + this.config.bot_key + "/", false);
		xhttp2.send(JSON.stringify(params));
		if (genericStringResponse && genericStringResponse.status) {
			genericStringMap = genericStringResponse.resp;
			genericStrings.SELECT_AN_OPTION = genericStringMap["SETTINGS.SELECT_AN_OPTION"];
			genericStrings.BROWSE_FILE_TO_UPLOAD = genericStringMap["SETTINGS.BROWSE_FILE_TO_UPLOAD"];
			genericStrings.CANCEL = genericStringMap["SETTINGS.CANCEL"];
			genericStrings.PLACE_HOLDER_PICK_A_DATE = genericStringMap["SETTINGS.PICK_A_DATE"];
			genericStrings.PLACE_HOLDER_START_TYPING_TO_FILTER = genericStringMap["SETTINGS.START_TYPING_TO_FILTER"];
			genericStrings.PLACE_HOLDER_WRITE_A_REPLY = genericStringMap["SETTINGS.WRITE_A_REPLY"];
			genericStrings.SEND_A_MESSAGE = genericStringMap["SETTINGS.SEND_A_MESSAGE"];
			genericStrings.SUBMIT = genericStringMap["SETTINGS.SUBMIT"];
			genericStrings.YES = genericStringMap["SETTINGS.YES"];
			genericStrings.NO = genericStringMap["SETTINGS.NO"]
		}
		this.successCBBotConfig = function(resp) {
			if (!resp) {
				EngtChat.showConsoleLog("No response came from Bot Config API");
				return
			}
			var brandingValues = {};
			Object.keys(resp.branding).forEach(function(element) {
				brandingValues[element] = resp.branding[element]["value"]
			});
			this.config.brand_name = brandingValues["ENGATI_PLATFORM_NAME"];
			this.config.icon_url = brandingValues["ENGATI_ICON_URL"];
			this.config.themecolor = brandingValues["ENGATI_WEBCHAT_THEME_COLOR"];
			if (resp.theme_color) {
				this.config.themecolor = resp.theme_color
			}
			if (this.config.debug === true) {
				this.config.is_debug = true
			}
			this.config.chat_close_button_position = resp.chat_close_button_position;
			this.closeButtonClass = resp.chat_close_button_position === "BOTTOM" ? "" : "engt-visible";
			this.config.chat_bubble_color = resp.chat_bubble_color || resp.theme_color;
			this.config.button_selector_color = resp.button_selector_color || "#1AABED";
			this.config.chat_bubble_colortextcolor = resp.chat_bubble_text_color || utils.getSaturation(this.config.chat_bubble_color);
			this.config.button_selector_colortextcolor = utils.getSaturation(this.config.button_selector_color);
			this.config.text_area_color = resp.text_area_color || "#ffffff";
			this.config.is_crm_update = resp.is_crm_update;
			if (resp.chat_widget_position) {
				this.config.chat_widget_position = resp.chat_widget_position
			}
			this.config.edit_user_input = resp.edit_user_input;
			this.config.default_edit_response = resp.default_edit_response;
			if (resp.icon_url && resp.icon_url.trim() !== "") {
				this.config.icon_url = resp.icon_url
			} else {
				this.config.icon_url = "https://s3.ap-south-1.amazonaws.com/branding-resources/images/engt.gif"
			}
			this.config.bot_avatar_image_class = "engt-invisible";
			var botAvatarImageTag = "";
			if (resp.bot_avatar_image_url && resp.bot_avatar_image_url.trim() !== "") {
				this.config.bot_avatar_image_url = resp.bot_avatar_image_url;
				this.config.bot_avatar_image_class = "";
				botAvatarImageTag = '<img src="' + this.config.bot_avatar_image_url + '">'
			}
			this.config.chat_header_icon_class = "engt-invisible";
			var chatHeaderIconImageTag = "";
			if (resp.chat_header_icon_url && resp.chat_header_icon_url.trim() !== "") {
				this.config.chat_header_icon_url = resp.chat_header_icon_url;
				this.config.chat_header_icon_class = "";
				chatHeaderIconImageTag = '<img src="' + this.config.chat_header_icon_url + '">'
			}
			if (this.config.bot_name_image) {
				this.config.bot_name = '<img src="' + this.config.bot_name_image + '">'
			} else if (resp.bot_name) {
				this.config.bot_name = resp.bot_name
			}
			if (resp.enable_ip_address) {
				EngtChat.config.enableIpAddress = resp.enable_ip_address;
				EngtChat.fetchIpAddress()
			}
			this.config.launch_flow_copy = this.config.launch_flow;
			var engt_composer_padding = "";
			var engt_refresh_display = "engt-hide-element";
			var engt_menu_display = "engt-hide-element";
			var dropDownMenuHtml = "";
			var engt_refresh_date_picker = "";
			var alignCenter = "center-without-refresh-btn";
			var autofillLeft = "16px";
			try {
				this.config.web_menu = JSON.parse(resp.web_menu)
			} catch (error) {
				this.config.web_menu = null
			}
			if (this.config.web_menu && this.config.web_menu.call_to_actions && this.config.web_menu.call_to_actions.length) {
				alignCenter = "center-with-refresh-btn";
				dropDownMenuHtml = this.getDropdownMenuHtml();
				engt_composer_padding = "engt-composer-padding";
				engt_menu_display = "";
				engt_refresh_date_picker = "engt-date-picker-refresh";
				autofillLeft = "60px"
			} else if (resp.refresh_chat) {
				alignCenter = "center-with-refresh-btn";
				this.config.refresh_chat = resp.refresh_chat;
				engt_composer_padding = "engt-composer-padding";
				engt_refresh_display = "";
				engt_refresh_date_picker = "engt-date-picker-refresh";
				autofillLeft = "60px"
			}
			if (resp.remove_branding) {
				this.config.remove_branding = resp.remove_branding
			}
			this.config.disableInputOnOptions = resp.block_send_message_with_options ? true : false;
			var EngtSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
			var getUserMediaSupported = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
				navigator.msGetUserMedia || navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
			EngtChat.speech.allowSpeechRecognition = EngtSpeechRecognition && (resp.voice_input_enabled || resp.audio_conversation_enabled);
			EngtChat.speech.allowAudioConversation = !EngtChat.speech.allowSpeechRecognition && resp.audio_conversation_enabled &&
				getUserMediaSupported;
			EngtChat.speech.allowContinuousMode = (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) &&
				resp.enable_continuous_voice;
			EngtChat.speech.allowVoiceOutput = resp.audio_conversation_enabled && !!Audio;
			if (EngtChat.speech.allowAudioConversation) {
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
					navigator.msGetUserMedia;
				utils.addMediaRecorderScript()
			}
			if (EngtChat.speech.allowVoiceOutput) {
				EngtChat.speech.audioObj = new Audio;
				EngtChat.speech.audioObj.addEventListener("ended", function() {
					EngtChat.showConsoleLog("audio ended");
					EngtChat.speech.audioPlaying = false;
					if (EngtChat.speech.voiceQueue.length) {
						EngtChat.playAudio(EngtChat.speech.voiceQueue[0]);
						EngtChat.speech.voiceQueue.shift()
					} else if (EngtChat.speech.allowContinuousMode && EngtChat.inputMode !== "input" && !EngtChat.speech.pauseAfterCurrentAudio) {
						EngtChat.changeInputMode("listening")
					} else {
						EngtChat.changeInputMode("input")
					}
				})
			}
			if (EngtChat.speech.allowSpeechRecognition) {
				var engt_recognition = new EngtSpeechRecognition;
				utils.engt_recognition = engt_recognition;
				var final_transcript = "";
				engt_recognition.onresult = function(event) {
					for (var i = event.resultIndex; i < event.results.length; ++i) {
						if (event.results[i].isFinal) {
							final_transcript += event.results[i][0].transcript
						}
					}
				};
				engt_recognition.onerror = function(event) {
					console.error(event);
					EngtChat.speech.speechRecognizing = false;
					final_transcript = ""
				};
				engt_recognition.onstart = function() {
					EngtChat.showConsoleLog("Speech recognition service has started");
					EngtChat.speech.speechRecognizing = true;
					final_transcript = ""
				};
				engt_recognition.onend = function() {
					EngtChat.showConsoleLog("Speech recognition service disconnected");
					document.getElementById("txMessage").disabled = false;
					if (EngtChat.speech.speechRecognizing && final_transcript) {
						if (EngtChat.speech.allowVoiceOutput) {
							EngtChat.addMessage(final_transcript, new Date, "guest", "processedAudio");
							var msgContainer = document.querySelector(".engt-sheet-content");
							utils.scrollToOld(msgContainer, msgContainer.scrollHeight, 400);
							var message = {
								type: "audio",
								text: final_transcript,
								fusToken: null,
								domain: "http://app.engati.com"
							};
							utils.sendMsg(message, false);
							EngtChat.changeInputMode("waiting_for_response")
						} else {
							utils.sendMsg(final_transcript, false);
							document.getElementById("txMessage").disabled = false;
							if (EngtChat.inputMode === "listening") {
								EngtChat.changeInputMode("input")
							}
						}
					} else if (EngtChat.inputMode === "listening") {
						EngtChat.changeInputMode("exiting_voice")
					}
					EngtChat.speech.speechRecognizing = false;
					final_transcript = ""
				};
				utils.startSpeechRecognition = function(event) {
					if (!EngtChat.speech.speechRecognizing) {
						engt_recognition.continuous = false;
						engt_recognition.interimResults = true;
						if (userLocale) {
							engt_recognition.lang = userLocale
						} else {
							engt_recognition.lang = "en-US"
						}
						engt_recognition.start();
						document.getElementById("txMessage").disabled = true
					} else {
						engt_recognition.stop()
					}
				}
			}
			if (this.config.set_default_brand) {
				this.config.remove_branding = false
			}
			var engtSheetContentClassStr = "bottom-74";
			var hideEngtPowered = "";
			if (this.config.remove_branding == true) {
				var engt_powered = "";
				engtSheetContentClassStr = "bottom-47";
				hideEngtPowered = "engt-hide-element"
			} else if (this.config.brand_name === "Engati") {
				var engt_powered =
					'<a href="http://www.engati.com/#bot" target="_blank"><span class="engt-text-red"> Powered by Engati</a>'
			} else {
				var engt_powered = "Powered by " + this.config.brand_name
			}
			var engtBackgroundStyle = "";
			if (resp.background_option === "IMAGE" && resp.wallpaper_image_url) {
				engtBackgroundStyle = "style='background-image: url(\"" + resp.wallpaper_image_url + "\") !important;)'"
			} else if (resp.background_option === "GRADIENT") {
				var topColor = resp.top_stop_color || "#FFFFFF";
				var bottomColor = resp.bottom_stop_color || "#F1F1F1";
				var midColor = resp.mid_stop_color || "#FFFFFF";
				engtBackgroundStyle = "style= 'background-image: linear-gradient(to top, " + bottomColor + "," + midColor + "," +
					topColor + ") !important;}'"
			}
			var auto_pop_up_type = "closed_callout";
			var pop_up_message = "";
			var enable_launcher = "engt-launcher-enabled";
			var chatbox_display = 'style="display: none;"';
			if (auto_pop_up_type === "closed_callout") {
				var engt_auto_container_position = "engt-auto-popup-container-right";
				var engt_popup_text_position = "engt-popup-text-right";
				if ((resp.auto_enable_pop_up_delay === 0 || resp.auto_enable_pop_up_delay > 0) && resp.pop_up_message) {
					pop_up_message = resp.pop_up_message;
					if (this.config.chat_widget_position === "bottomleft") {
						engt_auto_container_position = "engt-auto-popup-container-left";
						engt_popup_text_position = "engt-popup-text-left"
					}
				}
			}
			if (resp.header_text_color) {
				this.config.themetextcolor = resp.header_text_color
			} else if (this.config.title_color) {
				this.config.themetextcolor = this.config.title_color
			} else {
				this.config.themetextcolor = utils.getSaturation(this.config.themecolor)
			}
			if (resp.theme_font && resp.theme_font !== "helvetica") {
				var fontParams = EngtChat.getFontFamily(resp.theme_font, resp.font_weight)
			}
			if (resp.input_area_suggestion_text) {
				this.config.textAreaPlaceholder = resp.input_area_suggestion_text
			}
			var style = document.createElement("style");
			style.type = "text/css";
			style.innerHTML = "#engt-container .engt-comment-by-user .engt-comment-body-container{background:" + this.config.chat_bubble_color +
				"!important;color:" + this.config.chat_bubble_colortextcolor +
				"!important;}#engt-container .engt-auto-popup-container:before{border-color: transparent " + this.config.themecolor +
				"!important;}#engt-container .engt-popup-caret:after {border-top-color:" + this.config.themecolor +
				"!important;}.engt-popup-text{border: solid 2px " + this.config.themecolor +
				"!important;} .pop-up-close{color: " + this.config.themecolor +
				"!important;} #engt-container .engt-comment-by-user .engt-comment-caret:after{border-left-color:" + this.config.chat_bubble_color +
				"!important;} .engt-separate-card-button:hover,.engt-media-button:hover, .engt-list-carousel-buttons:hover,.engt-list-footer-button:hover, .engt-opt-buttons:hover, .engt-dropdown-menu a:hover{background-color: " +
				this.config.button_selector_color + " !important; color: " + this.config.button_selector_colortextcolor +
				" !important;} #engt-container .engt-seamless-card-button:hover{color:" + this.config.button_selector_color +
				"}.engt-separate-card-button, .engt-media-button, .engt-list-footer-button, .engt-list-carousel-buttons{color: " +
				this.config.button_selector_color + " !important;} .engt-list-carousel-buttons{border-color: " + this.config.button_selector_color +
				" !important;} .engt-separate-card-button:hover,.engt-media-button:hover, .engt-list-footer-button:hover, .engt-list-carousel-buttons:hover, .engt-opt-buttons:hover label{color: #fff !important; cursor: pointer;} .engt-dropdown-menu a{color: " +
				this.config.button_selector_color +
				" !important;} .engt-opt-buttons, #engt-container .engt-list-carousel-buttons, #engt-container .engt-card-content, #engt-container .engt-comment-body-container, #engt-container .engt-comment-body-container p, .engt-buttoncarousel {font-size: " +
				this.config.fontSize + " !important;}";
			if (fontParams) {
				style.innerHTML += fontParams
			}
			document.getElementsByTagName("head")[0].appendChild(style);
			var engt_chat_btns = '<button id="engt-send-btn"></button>';
			if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
				engt_chat_btns =
					'<button id="engt-mic-btn" class="mic-static-icon" onclick="EngtChat.changeInputMode(\'listening\');"></button><button id="engt-send-btn" class="engt-hide-element"></button>'
			}
			var div_root = document.createElement("div");
			div_root.id = "engt";
			var img_icon_open = "";
			var img_icon_close = "";
			if (this.config.use_icon_dimensions && this.config.chat_widget_position == "bottomleft") {
				img_icon_open = '><img src="' + this.config.icon_url + '" style="position:fixed; bottom:0"></div>';
				img_icon_close = 'style="position:fixed; bottom:0"'
			} else if (this.config.use_icon_dimensions && this.config.chat_widget_position == "bottomright") {
				img_icon_open = '><img src="' + this.config.icon_url + '" style="position:fixed; bottom:0;right:0"></div>';
				img_icon_close = 'style="position:fixed; bottom:0"'
			} else {
				img_icon_open = 'style="background-image:url(' + this.config.icon_url + ')"></div>';
				img_icon_close = ""
			}
			div_root.innerHTML =
				'<div id="engt-container" class="engt-container engt-reset engt-acquire"><div id="engt-launcher" class="engt-launcher ' +
				enable_launcher + ' "><div id="engt-auto-popup-container" class="engt-auto-popup-container ' +
				engt_auto_container_position + '" style="display:none;"><div class="engt-popup-text ' + engt_popup_text_position +
				'"><span class="pop-up-close">&times;</span><span class="pointer-cursor">' + pop_up_message +
				'</span></div></div><div id="engt-launcher-button" class="engt-launcher-button engt-launcher-active" ' +
				img_icon_open + '<div id="engt-close-button" class="engt-launcher-inactive" ' + img_icon_close +
				'><a class="engt-boxclose engt-themecolor" id="engt-boxclose"></a></div></div><div id="engt-chatbox" class="engt-chatbox" ' +
				chatbox_display +
				'><div id="engt-conversation" class="engt-conversation engt-sheet engt-sheet-active" style="visibility:visible"><div id="engt-sheet-header" class="engt-sheet-header engt-themecolor"><div class="engt-sheet-header-title-container"><div class="engt-icon-name-container"><div class="engt-sheet-header-title-icon  ' +
				this.config.chat_header_icon_class + '">' + chatHeaderIconImageTag +
				'</div><div class="engt-sheet-header-title-text"><div class="engt-header-text"><b class="engt-sheet-header-title engt-sheet-header-with-presence" style="color:' +
				this.config.themetextcolor + '!important" dir=' + utils.direction +
				'></b></div></div></div><div id="engt-sheet-header-description" class="engt-sheet-header-description"><b style="color:' +
				this.config.themetextcolor + '!important;font-size:18px;" dir=' + utils.direction +
				'></b></div><b class="engati-intialization" id="engati-intialization" style="color:' + this.config.themetextcolor +
				'!important">Initializing..</b></div><i class="engt-sheet-header-close ' + this.closeButtonClass +
				'" id="engt-sheet-header-close"></i></div><div class="engt-sheet-body"></div><div class="engt-conversation-window" id="engt-conversation-window"><div class="engt-sheet-content ' +
				engtSheetContentClassStr + '" ' + engtBackgroundStyle +
				'><div id="engt-sheet-content-container" class="engt-sheet-content-container"><div class="engt-conversation-parts-container"><div id="engt-message" class="engt-conversation-parts"><div id="loader_message" class="engt-conversation-part loader_message engt-conversation-part-grouped -first" style="display:none;"><div class="engt-conversation-sender-icon ' +
				this.config.bot_avatar_image_class + '">' + botAvatarImageTag +
				'</div><div class=" engt-comment engt-comment-by-engt " style="padding-left:0px;"><div class="engt-comment-body-container" style="border:none;box-shadow:none;background:none;padding-bottom: 5px;"><div class="engt-comment-body engt-embed-body" ><div class="typing-indicator"><span></span><span></span><span></span></div></div><div class="engt-comment-caret"></div></div></div></div></div></div></div></div><div class="engt-composer-container"><div id="engt-composer" class="engt-composer" style="transform: translate(0px, 0px);background: ' +
				this.config.text_area_color + ';"><div class="engati-composer-content ' + engt_composer_padding +
				'"><div id="engt-autofill-popup" class="engt-hide-element" style="left:' + autofillLeft +
				' !important;"></div><button id="datepicker" class="hide-datepicker engt-datepicker ' + engt_refresh_date_picker +
				'">Select Date</button><label for="engt-input-upload" class="engt-label-upload engt-hide-element ">Browse File</label><input type="file" id="engt-input-upload" name="pic" accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/zip,.doc, .docx, .pdf, .zip, image/*;capture=camera" class="engt-hide-element"><div id="engt-composer-refresh" class="' +
				engt_refresh_display +
				'" title="Start over"></div><div id="engt-menu-dropdown-container" class="engt-hide-element">' +
				dropDownMenuHtml + '</div><div id="engt-composer-menu" class="' + engt_menu_display +
				'" onclick="EngtChat.showHideMenu();"><button class="hamburger hamburger--squeeze" id="engt-hamburger-menu-section" type="button"><span class="hamburger-box"><span class="hamburger-inner"></span></span></button></div><div class="engt-composer-textarea-container"><div class="engt-composer-textarea"><pre><span></span><br></pre><div class="textarea-overlay engt-hide-element"></div><input id="txMessagePassword" placeholder="' +
				this.config.textAreaPlaceholder + '" dir=' + utils.direction +
				' type="password" autocomplete="new-password" class="engt-hide-element engt-txt-password"/><textarea id="txMessage" placeholder="' +
				this.config.textAreaPlaceholder + '" dir=' + utils.direction + ' style=" top: 5px;"></textarea>' +
				engt_chat_btns + '<div id="engt-upload-loader" class="engt-upload-loader engt-hide-element" style="background: ' +
				this.config.text_area_color + ";border-top-color: " + EngtChat.config.themecolor +
				' !important"></div></div></div><div id="engt-non-input-mode" class="engt-listening-mode engt-hide-element" style="left:' +
				autofillLeft + " !important; background-color: " + this.config.text_area_color +
				';"><button class="engt-keyboard-btn" onclick="EngtChat.changeInputMode(\'input\');"></button></div></div><div id="branding-powered"><p id="engt-powered" class="engt-powered ' +
				alignCenter + " " + hideEngtPowered + '">' + engt_powered +
				'</p></div></div></div></div><div class="engt-auth-node-window engt-hide-element" id="engt-auth-node-window"><div class="engt-sheet-content-auth-node engt-bottom-20"><div class="engt-sheet-content-container"><div class="engt-p-16"><div id="engt-sign-in-content" class="engt-sign-in-content"></div></div></div></div></div></div></div></div>';
			var csslink = document.createElement("link");
			var gliderLink = document.createElement("link");
			var gliderScript = document.createElement("script");
			var gliderCompat = document.createElement("script");
			var hamburgerLink = document.createElement("link");
			if (this.config.e === "d") {
				csslink.href = "https://dev.engati.com/static/css/chat_widget.css";
				gliderLink.href = "https://dev.engati.com/static/css/glider.min.css";
				gliderScript.src = "https://dev.engati.com/static/js/glider.js";
				gliderCompat.src = "https://dev.engati.com/static/js/glider-compat.min.js";
				hamburgerLink.href = "https://dev.engati.com/static/css/hamburger.css"
			} else if (this.config.e === "p") {
				csslink.href = "https://app.engati.com/static/css/chat_widget.css";
				gliderLink.href = "https://app.engati.com/static/css/glider.min.css";
				gliderScript.src = "https://app.engati.com/static/js/glider.js";
				gliderCompat.src = "https://app.engati.com/static/js/glider-compat.min.js";
				hamburgerLink.href = "https://app.engati.com/static/css/hamburger.css"
			} else if (this.config.e === "l") {
				csslink.href = "http://localhost:5010/static/css/chat_widget.css";
				gliderLink.href = "http://localhost:5010/static/css/glider.min.css";
				gliderScript.src = "http://localhost:5010/static/js/glider.js";
				gliderCompat.src = "http://localhost:5010/static/js/glider-compat.min.js";
				hamburgerLink.href = "http://localhost:5010/static/css/hamburger.css"
			} else if (this.config.e === "qa") {
				csslink.href = "https://qa.engati.com/static/css/chat_widget.css";
				gliderLink.href = "https://qa.engati.com/static/css/glider.min.css";
				gliderScript.src = "https://qa.engati.com/static/js/glider.js";
				gliderCompat.src = "https://qa.engati.com/static/js/glider-compat.min.js";
				hamburgerLink.href = "https://qa.engati.com/static/css/hamburger.css"
			} else if (this.config.e === "staging") {
				csslink.href = "https://staging.engati.com/static/css/chat_widget.css";
				gliderLink.href = "https://staging.engati.com/static/css/glider.min.css";
				gliderScript.src = "https://staging.engati.com/static/js/glider.js";
				gliderCompat.src = "https://staging.engati.com/static/js/glider-compat.min.js";
				hamburgerLink.href = "https://staging.engati.com/static/css/hamburger.css"
			} else if (this.config.e === "op") {
				csslink.href = this.config.server + "/static/css/chat_widget.css";
				gliderLink.href = this.config.server + "/static/css/glider.min.css";
				gliderScript.src = this.config.server + "/static/js/glider.js";
				gliderCompat.src = this.config.server + "/static/js/glider-compat.min.js";
				hamburgerLink.href = this.config.server + "/static/css/hamburger.css"
			}
			csslink.type = "text/css";
			gliderLink.type = "text/css";
			hamburgerLink.type = "text/css";
			csslink.rel = "stylesheet";
			gliderLink.rel = "stylesheet";
			hamburgerLink.rel = "stylesheet";
			document.getElementsByTagName("head")[0].appendChild(csslink);
			document.getElementsByTagName("head")[0].appendChild(gliderLink);
			document.getElementsByTagName("head")[0].appendChild(gliderScript);
			document.getElementsByTagName("head")[0].appendChild(gliderCompat);
			document.getElementsByTagName("head")[0].appendChild(hamburgerLink);
			var _root = document.getElementsByTagName("body")[0];
			_root.appendChild(div_root);
			utils.addPickadayScripts();
			var iOS = utils.isOlderIOS();
			if (iOS) {
				document.getElementById("engt-send-btn").style.setProperty("display", "none", "important")
			}
			utils.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
			if (utils.isSafari) {
				EngtChat.speech.MIN_DECIBEL_VALUE = 150;
				EngtChat.speech.MIN_RECORD_TIME = 5e3
			}
			if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
				document.getElementById("engt-mic-btn").addEventListener("click", function() {
					if (!EngtChat.speech.playEmptyAudioForPermission) {
						EngtChat.speech.playEmptyAudioForPermission = true;
						try {
							EngtChat.speech.audioObj.play()
						} catch (error) {
							EngtChat.showConsoleLog(error)
						}
					}
				})
			}
			if (resp.header_alignment === "LEFT") {
				var headerImageNameContainer = document.getElementsByClassName("engt-icon-name-container")[0];
				var headerDescription = document.getElementById("engt-sheet-header-description");
				utils.addClass(headerImageNameContainer, "engt-align-text-left");
				if (resp.header_icon) {
					utils.addClass(headerDescription, "engt-align-text-left-description")
				} else {
					utils.addClass(headerDescription, "engt-align-text-left")
				}
			}
			var scrollElement = document.getElementsByClassName("engt-sheet-content")[0];
			var _clientY = null;

			function disableRubberBand(event, clientY) {
				if (scrollElement.scrollTop === 0 && clientY > 0) {
					event.preventDefault()
				}
				if (isOverlayTotallyScrolled() && clientY < 0) {
					event.preventDefault()
				}
			}

			function isOverlayTotallyScrolled() {
				return scrollElement.scrollHeight - scrollElement.scrollTop <= scrollElement.clientHeight
			}
			var cols = document.getElementsByClassName("engt-themecolor");
			for (i = 0; i < cols.length; i++) {
				cols[i].style.backgroundColor = this.config.themecolor;
				cols[i].style.color = this.config.themetextcolor
			}
			if (this.config.use_icon_dimensions && resp.icon_url) {
				document.getElementById("engt-launcher-button").style.background = "none"
			}
			if (this.config.chat_widget_position == "bottomleft") {
				document.getElementById("engt-launcher").style.left = "40px";
				document.getElementById("engt-conversation").setAttribute("style",
					"left:18px;animation:moveFromLeftFade .6s ease both;")
			}
			if (resp.auto_pop_up_web_chat_type) {
				this.config.auto_pop_up_web_chat_type = resp.auto_pop_up_web_chat_type
			}
			if (resp.auto_pop_up_web_chat_type === "CLOSED") {
				utils.autoPopupTimeout = setTimeout(function() {
					document.getElementById("engt-auto-popup-container").style.display = "block"
				}, resp.auto_enable_pop_up_delay * 1e3)
			} else if (resp.auto_pop_up_web_chat_type === "MINIMIZED") {
				var delay = resp.auto_enable_pop_up_delay;
				if (!resp.auto_enable_pop_up_delay) {
					delay = .5
				}
				utils.autoPopupTimeoutMinimized = setTimeout(function() {
					var engtContainer = document.getElementById("engt-conversation");
					var engtLauncher = document.getElementById("engt-launcher");
					utils.addClass(engtContainer, "engt-chat-minimized");
					utils.addClass(engtLauncher, "engt-hide-element");
					document.getElementById("engt-launcher-button").click()
				}, delay * 1e3)
			} else if (resp.auto_pop_up_web_chat_type === "NORMAL") {
				var delay = resp.auto_enable_pop_up_delay;
				setTimeout(function() {
					document.getElementById("engt-launcher-button").click()
				}, delay * 1e3)
			}
			elements.divChatbox = document.getElementById("engt-chatbox");
			elements.txMessage = document.getElementById("txMessage");
			elements.engtLauncher = document.getElementById("engt-launcher-button");
			elements.engtClose = document.getElementById("engt-close-button");
			document.querySelector(".engt-sheet-header-title").innerHTML = this.config.bot_name;
			if (resp.header_description) {
				this.config.header_description = resp.header_description;
				document.querySelector(".engt-sheet-header-description").innerHTML = resp.header_description
			}
			if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
				document.getElementById("txMessage").addEventListener("input", function() {
					if (!this.value.toString().trim()) {
						utils.removeClass(document.getElementById("engt-mic-btn"), "engt-hide-element");
						utils.addClass(document.getElementById("engt-send-btn"), "engt-hide-element")
					} else {
						utils.addClass(document.getElementById("engt-mic-btn"), "engt-hide-element");
						utils.removeClass(document.getElementById("engt-send-btn"), "engt-hide-element")
					}
				})
			}
			document.getElementById("engt-input-upload").onchange = function() {
				var file = this.files[0];
				var value = this.value;
				if (value === "" || !file) {
					return
				}
				var msgObj = {
					type: "file",
					url: null,
					name: "error",
					transaction_id: file_transaction_id,
					mime_type: null
				};
				if (file.size <= 5242880) {
					self.uploadFileObj = {
						file: file,
						msgObj: msgObj,
						fileUploadBaseURL: EngtChat.fileUploadBaseURL,
						file_transaction_id: file_transaction_id,
						bot_ref: bot_ref,
						publicUpload: publicUpload
					};
					self.createFileTile(file)
				} else {
					EngtChat.sendFileUploadResp(msgObj)
				}
			};
			if (localStorage && localStorage[this.config.bot_key + "newSessionKey"]) {
				this.status.sessionKey = localStorage[this.config.bot_key + "newSessionKey"];
				this.firstTime = false
			} else {
				this.status.sessionKey = generateUUID();
				if (localStorage) {
					localStorage[this.config.bot_key + "newSessionKey"] = this.status.sessionKey;
					this.firstTime = true
				}
			}(function(a) {
				if (
					/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i
					.test(a) ||
					/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i
					.test(a.substr(0, 4))) utils.isMobileOrTablet = true
			})(navigator.userAgent || navigator.vendor || window.opera);
			window.addEventListener("resize", EngtChat.onOpenKeyboard);
			this.initEventHandler()
		}
	},
	fetchIpAddress: function() {
		var xhttp = new XMLHttpRequest;
		var resp;
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resp = JSON.parse(xhttp.responseText)
			}
		};
		xhttp.open("GET", "https://api.ipify.org/?format=json", false);
		xhttp.send();
		if (resp && resp.ip) {
			EngtChat.config.ipAddress = resp.ip
		}
	},
	onOpenKeyboard: function() {
		var msgContainer = document.querySelector(".engt-sheet-content");
		msgContainer.scrollTop = msgContainer.scrollHeight
	},
	addSenderIcon: function(msgContainer) {
		var url;
		if (this.config.livechatEnabled && this.config.agentAvatarImageUrl) {
			url = this.config.agentAvatarImageUrl
		} else {
			url = this.config.bot_avatar_image_url
		}
		var msgHtml = "";
		if (url && this.status.current === "engt") {
			var senderIcon = '<div class="engt-conversation-sender-icon"><img src="' + url + '"></div>';
			if (this.status.last !== "engt" || this.chat_refreshed || this.config.agentAvatarImageUrl && this.config.livechatMessageCount ==
				1) {
				msgHtml += senderIcon;
				this.config.livechatMessageCount++
			} else {
				utils.addClass(msgContainer, "engt-comment-padding")
			}
		}
		return msgHtml
	},
	createFileTile: function(file) {
		this.toggleFileUpload(false);
		utils.removeClass(document.getElementById("engt-send-btn"), "engt-hide-element");
		var self = this;
		var container = document.getElementById("engt-composer");
		var div = document.createElement("div");
		div.id = "file-tile";
		div.innerHTML = '<span onclick="window.EngtChat.clearFile(true)">' + file.name + "<i></i></span>";
		container.appendChild(div);
		var engtcomposermenu = document.getElementById("engt-composer-menu");
		var engtComposerRefresh = document.getElementById("engt-composer-refresh");
		if (utils.hasClass(engtcomposermenu, "engt-hide-element") && utils.hasClass(engtComposerRefresh,
				"engt-hide-element")) {
			var fileTile = document.getElementById("file-tile");
			fileTile.style.paddingLeft = "20px";
			fileTile.style.width = "calc(100% - 130px)"
		}
		setTimeout(function() {
			document.getElementById("txMessage").focus()
		}, 0)
	},
	clearFile: function(resetUpload) {
		this.uploadFileObj = "";
		var tile = document.getElementById("file-tile");
		document.getElementById("engt-input-upload").value = "";
		if (tile) {
			tile.parentElement.removeChild(tile)
		}
		if (resetUpload) {
			this.toggleFileUpload(true)
		}
	},
	uploadFile: function() {
		if (!this.uploadFileObj) {
			return
		}
		var file = this.uploadFileObj.file;
		var msgObj = this.uploadFileObj.msgObj;
		var fileUploadBaseURL = this.uploadFileObj.fileUploadBaseURL;
		var file_transaction_id = this.uploadFileObj.file_transaction_id;
		var publicUpload = this.uploadFileObj.publicUpload;
		var bot_ref = this.uploadFileObj.bot_ref;
		var workflowValue = "ENGATI_ATTACHMENT";
		if (publicUpload == true) {
			workflowValue = "PUBLIC_ATTACHMENT"
		}
		var xhttp = new XMLHttpRequest;
		var resp;
		var data = new FormData;
		data.append("file", file);
		data.append("workflow", workflowValue);
		data.append("application", "engati-bot");
		xhttp.open("POST", fileUploadBaseURL + "/v1.0/customer/attachment", false);
		xhttp.setRequestHeader("transactionId", file_transaction_id);
		xhttp.setRequestHeader("customInfo", JSON.stringify({
			user_id: EngtChat.status.sessionKey,
			bot_ref: bot_ref
		}));
		xhttp.setRequestHeader("timeStamp", (new Date).getTime());
		xhttp.onreadystatechange = function() {
			resp = JSON.parse(xhttp.responseText);
			if (this.readyState == 4 && this.status == 200 && resp.status.code === 1e3) {
				msgObj.url = resp.responseObject.token;
				if (publicUpload == true) {
					msgObj.url = resp.responseObject.url
				}
				msgObj.name = resp.responseObject.name;
				msgObj.transaction_id = null;
				msgObj.mime_type = resp.responseObject.mimeType;
				var userMsg = '<span class="engt-file-icon"></span>' + file.name;
				EngtChat.addMessage(userMsg, new Date, "guest")
			}
			EngtChat.sendFileUploadResp(msgObj)
		};
		utils.removeClass(document.getElementById("engt-upload-loader"), "engt-hide-element");
		setTimeout(function() {
			try {
				xhttp.send(data)
			} catch (error) {
				EngtChat.sendFileUploadResp(msgObj)
			} finally {
				utils.addClass(document.getElementById("engt-upload-loader"), "engt-hide-element")
			}
		}, 100)
	},
	toggleFileUpload: function(toShow) {
		this.visibleFileUpload = toShow;
		var uploadLabel = document.querySelector(".engt-label-upload");
		var sendButton = document.getElementById("engt-send-btn");
		if (toShow) {
			this.updatePlaceholder(genericStrings.BROWSE_FILE_TO_UPLOAD);
			utils.removeClass(uploadLabel, "engt-hide-element");
			sendButton.style.backgroundImage =
				"url(https://s3.ap-south-1.amazonaws.com/branding-resources/images/engati_bot_upload.svg)";
			utils.removeClass(sendButton, "engt-hide-element")
		} else {
			this.updatePlaceholder(EngtChat.config.textAreaPlaceholder);
			utils.addClass(uploadLabel, "engt-hide-element");
			sendButton.style.backgroundImage = "";
			document.getElementById("txMessage").disabled = false;
			if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
				utils.addClass(sendButton, "engt-hide-element");
				var micButton = document.getElementById("engt-mic-btn");
				if (!micButton.classList.contains("engt-hide-element")) {
					utils.addClass(micButton, "engt-hide-element")
				}
			}
		}
	},
	enableAutoFill: function() {
		var sendButton = document.getElementById("engt-send-btn");
		var textInput = document.getElementById("txMessage");
		textInput.style.zIndex = 1;
		textInput.style.cursor = "pointer";
		sendButton.style.backgroundImage =
			"url(https://s3.ap-south-1.amazonaws.com/branding-resources/images/engati_bot_down.svg)";
		sendButton.style.cursor = "pointer";
		this.updatePlaceholder(genericStrings.SELECT_AN_OPTION);
		if (EngtChat.speech.allowSpeechRecognition || EngtChat.speech.allowAudioConversation) {
			utils.removeClass(sendButton, "engt-hide-element");
			utils.addClass(document.getElementById("engt-mic-btn"), "engt-hide-element")
		}
	},
	toggleAutoFill: function(toShow) {
		this.visibleAutoFill = toShow;
		var textInput = document.getElementById("txMessage");
		textInput.style.zIndex = 0;
		var autoFillWrapper = document.getElementById("engt-autofill-popup");
		var sendButton = document.getElementById("engt-send-btn");
		if (toShow) {
			utils.removeClass(autoFillWrapper, "engt-hide-element");
			sendButton.style.backgroundImage =
				"url(https://s3.ap-south-1.amazonaws.com/branding-resources/images/engati_bot_up.svg)"
		} else {
			this.updatePlaceholder(EngtChat.config.textAreaPlaceholder);
			utils.addClass(autoFillWrapper, "engt-hide-element");
			sendButton.style.backgroundImage = "";
			document.getElementById("txMessage").disabled = false;
			textInput.style.cursor = "text"
		}
		this.updatePlaceholder(genericStrings.PLACE_HOLDER_START_TYPING_TO_FILTER)
	},
	updateFileValue: function(value) {
		document.getElementById("engt-input-upload").value = value
	},
	toggleDatePicker: function(toShow) {
		this.visibleDatePicker = toShow;
		var datePicker = document.getElementById("datepicker");
		var sendButton = document.getElementById("engt-send-btn");
		var inputText = document.getElementById("txMessage");
		if (toShow) {
			this.updatePlaceholder(genericStrings.PLACE_HOLDER_PICK_A_DATE);
			utils.removeClass(datePicker, "hide-datepicker");
			sendButton.style.backgroundImage =
				"url(https://s3.ap-south-1.amazonaws.com/branding-resources/images/engati_bot_calendar.svg)";
			utils.removeClass(sendButton, "engt-hide-element")
		} else {
			this.updatePlaceholder(EngtChat.config.textAreaPlaceholder);
			utils.addClass(datePicker, "hide-datepicker");
			sendButton.style.backgroundImage = "";
			inputText.disabled = false;
			sendButton.style.zIndex = 0;
			EngtChat.selectedDate = "";
			EngtChat.pickerObj.calendars[0] = {
				month: (new Date).getMonth(),
				year: (new Date).getFullYear()
			};
			inputText.removeAttribute("readonly");
			if (utils.isSpeechRecognitionSupported) {
				utils.addClass(sendButton, "engt-hide-element")
			}
		}
	},
	togglePasswordInput: function(toShow) {
		var inputText = document.getElementById("txMessage");
		var inputTextpassword = document.getElementById("txMessagePassword");
		if (toShow) {
			utils.addClass(inputText, "engt-hide-element");
			utils.removeClass(inputTextpassword, "engt-hide-element");
			inputTextpassword.focus();
			inputText.value = "";
			EngtChat.config.show_password_input = true
		} else {
			utils.removeClass(inputText, "engt-hide-element");
			utils.addClass(inputTextpassword, "engt-hide-element");
			EngtChat.config.show_password_input = false;
			inputTextpassword.value = "";
			inputText.focus()
		}
	},
	updatePlaceholder: function(placeholder) {
		document.getElementById("txMessage").placeholder = placeholder
	},
	playAudio: function(audio) {
		EngtChat.changeInputMode("speaking");
		var speechObj = EngtChat.speech;
		var audioObj = speechObj.audioObj;
		if (!speechObj.audioPlaying) {
			speechObj.audioPlaying = true;
			audioObj.src = audio;
			var playPromise = EngtChat.speech.audioObj.play();
			EngtChat.showConsoleLog("in playing");
			if (playPromise !== null) {
				playPromise.catch(function(err) {
					EngtChat.showConsoleLog(err);
					EngtChat.changeInputMode("input")
				})
			}
		} else {
			speechObj.voiceQueue.push(audio)
		}
	},
	changeInputMode: function(mode) {
		if (this.inputMode === mode) {
			return
		}
		EngtChat.showConsoleLog("state changed from " + this.inputMode + " to " + mode);
		var engtNonInputMode = document.getElementById("engt-non-input-mode");
		if (this.inputMode === "speaking" && mode !== "speaking") {
			this.speech.audioObj.pause();
			this.speech.audioPlaying = false;
			this.speech.voiceQueue = []
		}
		if (this.inputMode === "listening" && mode !== "listening") {
			if (EngtChat.speech.allowSpeechRecognition) {
				EngtChat.speech.speechRecognizing = false;
				utils.engt_recognition.stop()
			} else if (EngtChat.speech.allowAudioConversation) {
				EngtChat.speech.transaction_id = null;
				EngtChat.stopRecording()
			}
		}
		this.inputMode = mode;
		switch (mode) {
			case "input":
				utils.addClass(engtNonInputMode, "engt-hide-element");
				if (!utils.isMobileOrTablet) {
					document.getElementById("txMessage").focus()
				}
				break;
			case "listening":
				engtNonInputMode.removeAttribute("class");
				utils.addClass(engtNonInputMode, "engt-listening-mode");
				if (EngtChat.speech.allowSpeechRecognition) {
					utils.startSpeechRecognition()
				} else if (EngtChat.speech.allowAudioConversation) {
					EngtChat.startRecording();
					if (utils.isSafari) {
						utils.addClass(engtNonInputMode, "engt-init-mode");
						setTimeout(function() {
							utils.removeClass(engtNonInputMode, "engt-init-mode")
						}, 1500)
					}
				}
				break;
			case "processing_input":
				engtNonInputMode.removeAttribute("class");
				utils.addClass(engtNonInputMode, "engt-processing-mode");
				break;
			case "waiting_for_response":
				engtNonInputMode.removeAttribute("class");
				utils.addClass(engtNonInputMode, "engt-waiting-mode");
				break;
			case "speaking":
				engtNonInputMode.removeAttribute("class");
				utils.addClass(engtNonInputMode, "engt-speaking-mode");
				break;
			case "exiting_voice":
				engtNonInputMode.removeAttribute("class");
				utils.addClass(engtNonInputMode, "engt-exiting-input-mode");
				setTimeout(function() {
					EngtChat.changeInputMode("input")
				}, 1500);
				break;
			default:
				utils.addClass(engtNonInputMode, "engt-hide-element");
				if (!utils.isMobileOrTablet) {
					document.getElementById("txMessage").focus()
				}
		}
	},
	startRecording: function() {
		var mediaConstraints = {
			audio: true
		};

		function onMediaSuccess(stream) {
			EngtChat.speech.mediaRecorder = new MediaStreamRecorder(stream);
			EngtChat.speech.stream = stream;
			EngtChat.speech.mediaRecorder.mimeType = "audio/wav";
			EngtChat.speech.mediaRecorder.audioChannels = 1;
			EngtChat.speech.mediaRecorder.ondataavailable = function(file) {
				if (EngtChat.speech.transaction_id && file.size <= EngtChat.speech.MIN_AUDIO_RECORDING_FILE_SIZE) {
					var uploadAudioObj = {
						file: file,
						fileUploadBaseURL: EngtChat.fileUploadBaseURL,
						file_transaction_id: EngtChat.speech.transaction_id,
						bot_ref: bot_ref
					};
					EngtChat.changeInputMode("processing_input");
					EngtChat.uploadAudio(uploadAudioObj)
				} else {
					EngtChat.changeInputMode("input")
				}
				EngtChat.stopRecording();
				EngtChat.speech.transaction_id = null
			};
			EngtChat.speech.mediaRecorder.start(EngtChat.speech.MAX_RECORD_TIME)
		}

		function onMediaError(e) {
			console.error("media error", e)
		}
		if (navigator.getUserMedia) {
			navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError)
		} else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices.getUserMedia(mediaConstraints).then(onMediaSuccess).catch(onMediaError)
		}
		var message = {
			type: "audio",
			text: null,
			fusToken: null,
			domain: "http://app.engati.com"
		};
		EngtChat.speech.transaction_id = null;
		EngtChat.sendMessage(message)
	},
	stopRecording: function() {
		EngtChat.speech.mediaRecorder.stop();
		EngtChat.speech.stream.getTracks().forEach(function(track) {
			track.stop()
		})
	},
	uploadAudio: function(uploadAudioObj) {
		var file = uploadAudioObj.file;
		var fileUploadBaseURL = uploadAudioObj.fileUploadBaseURL;
		var file_transaction_id = uploadAudioObj.file_transaction_id;
		var bot_ref = uploadAudioObj.bot_ref;
		var xhttp = new XMLHttpRequest;
		var resp;
		var data = new FormData;
		data.append("file", file);
		data.append("workflow", "VOICE_UPLOAD_WITH_EXPIRE");
		data.append("application", "engati-voice-service");
		xhttp.open("POST", fileUploadBaseURL + "/v1.0/customer/attachment", false);
		xhttp.setRequestHeader("transactionId", file_transaction_id);
		xhttp.setRequestHeader("customInfo", JSON.stringify({
			user_id: EngtChat.status.sessionKey,
			bot_ref: bot_ref
		}));
		xhttp.setRequestHeader("timeStamp", (new Date).getTime());
		xhttp.onreadystatechange = function() {
			resp = JSON.parse(xhttp.responseText);
			if (this.readyState == 4 && this.status == 200 && resp.status.code === 1e3) {
				var message = {
					type: "audio",
					text: null,
					fusToken: resp.responseObject.token,
					domain: "http://app.engati.com"
				};
				EngtChat.sendMessage(message)
			} else {
				EngtChat.changeInputMode("input");
				EngtChat.showConsoleLog("Error occured in upload audio")
			}
		};
		try {
			xhttp.send(data)
		} catch (error) {
			EngtChat.changeInputMode("input");
			EngtChat.showConsoleLog("error occured in upload audio")
		}
	}
};

function generateUUID() {
	var d = (new Date).getTime();
	var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == "x" ? r : r & 3 | 8).toString(16)
	});
	return uuid
}

function showError(error) {
	var status;
	switch (error.code) {
		case error.PERMISSION_DENIED:
			status = 400;
			break;
		case error.POSITION_UNAVAILABLE:
			status = 503;
			break;
		case error.TIMEOUT:
			status = 408;
			break;
		case error.UNKNOWN_ERROR:
			status = 403;
			break
	}
	var data = {
		type: "location",
		message: {
			status: status,
			location: {
				lat: "",
				long: ""
			}
		}
	};
	EngtChat.sendMessage(data)
}
var urlParams = getUrlParams("chat_widget");
if (urlParams.config) {
	var config = JSON.parse(decodeURIComponent(urlParams.config));
	EngtChat.init(config)
}
window.chatWidget = {
	launchBot: function(flow_key) {
		if (!utils.hasClass(document.getElementById("engt-conversation"), "engt-active")) {
			EngtChat.open();
			EngtChat.socketEventHandler(flow_key);
			socket.emit("chat_status_change", {
				user_id: EngtChat.status.sessionKey,
				bot_key: EngtChat.config.bot_key,
				message: {
					text: "chat opened",
					type: "chat_status_change",
					isOpen: true
				}
			})
		}
	}
};
window.onclick = function(event) {
	if (event.target && event.target.parentNode.matches && !event.target.parentNode.matches(".engt-composer-textarea")) {
		if (EngtChat && EngtChat.visibleAutoFill) {
			EngtChat.toggleAutoFill(false);
			var sendButton = document.getElementById("engt-send-btn");
			sendButton.style.backgroundImage =
				"url(https://s3.ap-south-1.amazonaws.com/branding-resources/images/engati_bot_down.svg)";
			EngtChat.updatePlaceholder("Select an option...");
			var textInput = document.getElementById("txMessage");
			textInput.style.zIndex = 1;
			textInput.style.cursor = "pointer"
		}
	}
	if (event.target && event.target.closest && !event.target.closest("#engt-hamburger-menu-section")) {
		var element = document.getElementById("engt-menu-dropdown-container");
		var hamburgerMenuSection = document.getElementById("engt-hamburger-menu-section");
		if (element && hamburgerMenuSection && !utils.hasClass(element, "engt-hide-element")) {
			utils.addClass(element, "engt-hide-element");
			utils.removeClass(hamburgerMenuSection, "is-active")
		}
	}
};
