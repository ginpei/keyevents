(function() {
	var g_tmUpdated = { keydown:null, keypress:null, keyup:null };
	var g_counts = { keydown:0, keypress:0, keyup:0 };
	var g_keycodeMap = {
		8: 'backspace',
		9: 'tab',
		13: 'return',
		16: 'shift',
		17: 'control',
		18: 'alt',
		27: 'escape',
		32: 'space',
		33: 'pageup',
		34: 'pagedown',
		35: 'end',
		36: 'home',
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		46: 'del',
		112: 'f1',
		113: 'f2',
		114: 'f3',
		115: 'f4',
		116: 'f5',
		117: 'f6',
		118: 'f7',
		119: 'f8',
		120: 'f9',
		121: 'f10',
		122: 'f11',
		123: 'f12',
	};
	function onkey(event) {
		var type = event.type;
		var repeat = event.repeat;
		var ctrl = event.ctrlKey;
		var alt = event.altKey;
		var meta = event.metaKey;
		var shift = event.shiftKey;
		var code = event.keyCode;
		var which = event.which;
		var key = getKey(event);
		var count = ++g_counts[type];

		var row = document.querySelector('.js-display[data-type=' + type + ']');

		toggleClass(row.querySelector('.js-repeat'), 'is-active', repeat);
		toggleClass(row.querySelector('.js-ctrl'), 'is-active', ctrl);
		toggleClass(row.querySelector('.js-alt'), 'is-active', alt);
		toggleClass(row.querySelector('.js-meta'), 'is-active', meta);
		toggleClass(row.querySelector('.js-shift'), 'is-active', shift);
		row.querySelector('.js-code').innerHTML = code;
		row.querySelector('.js-which').innerHTML = which;
		row.querySelector('.js-key').innerHTML = key;
		row.querySelector('.js-count').innerHTML = count;

		row.classList.add('is-updated');
		clearTimeout(g_tmUpdated[type]);
		g_tmUpdated[type] = setTimeout(function() {
			row.classList.remove('is-updated');
		}, 100);

		// console.log(event.type, event);
	}
	function getKey(event) {
		var key;
		var code = event.keyCode || event.which;
		var shift = event.shiftKey;

		if (97 <= code && code <= 122) {
			code -= 32;
		}
		else if (code === 48 && shift) { key = ')'; }  // 0
		else if (code === 49 && shift) { key = '!'; }  // 1
		else if (code === 50 && shift) { key = '@'; }  // 2
		else if (code === 51 && shift) { key = '#'; }  // 3
		else if (code === 52 && shift) { key = '$'; }  // 4
		else if (code === 53 && shift) { key = '%'; }  // 5
		else if (code === 54 && shift) { key = '^'; }  // 6
		else if (code === 55 && shift) { key = '&'; }  // 7
		else if (code === 56 && shift) { key = '*'; }  // 8
		else if (code === 57 && shift) { key = '('; }  // 9
		else if (code === 186) { key = (shift ? ':' : ';'); }
		else if (code === 187) { key = (shift ? '+' : '='); }
		else if (code === 188) { key = (shift ? '<' : ','); }
		else if (code === 189) { key = (shift ? '_' : '-'); }
		else if (code === 190) { key = (shift ? '>' : '.'); }
		else if (code === 191) { key = (shift ? '?' : '/'); }
		else if (code === 192) { key = (shift ? '~' : '`'); }
		else if (code === 219) { key = (shift ? '{' : '['); }
		else if (code === 220) { key = (shift ? '|' : '\\'); }
		else if (code === 221) { key = (shift ? '}' : ']'); }
		else if (code === 222) { key = (shift ? '"' : '\''); }

		// if (event.type === 'keypress') {
		// 	key = String.fromCharCode(code);
		// }

		if (!key) {
			if (event.type === 'keypress') {
				key = String.fromCharCode(code);
				if (!key || /\s/.test(key)) {
					key = g_keycodeMap[code];
				}
			}
			else {
				key = g_keycodeMap[code] || String.fromCharCode(code);
			}
		}

		// key = '(unknown:' + code + ')';

		return key;
	}
	function toggleClass(el, className, flag) {
		if (flag) {
			el.classList.add(className);
		}
		else {
			el.classList.remove(className);
		}
	}
	document.addEventListener('keydown', onkey);
	document.addEventListener('keypress', onkey);
	document.addEventListener('keyup', onkey);
})();
