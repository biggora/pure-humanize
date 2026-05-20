(function () {
    'use strict';

    const {timeAgo, bytes, number, currency, list, plural, ordinal, truncate} = pureHumanize;

    // ---------------------------------------------------------------------------
    // Helpers
    // ---------------------------------------------------------------------------

    function getRadio(name) {
        const checked = document.querySelector(`input[name="${name}"]:checked`);
        return checked ? checked.value : null;
    }

    function getLocale() {
        const el = document.getElementById('global-locale');
        return el ? el.value.trim() || undefined : undefined;
    }

    /**
     * Write a result string into the output element.
     * On error pass isError=true and the output gets styled with the error class.
     */
    function setOutput(moduleId, value, isError) {
        const outputEl = document.getElementById(`output-${moduleId}`);
        if (!outputEl) return;

        const boxEl = outputEl.closest('.output-box');

        outputEl.textContent = value;

        if (isError) {
            outputEl.classList.add('error');
            if (boxEl) boxEl.classList.add('output-box--error');
        } else {
            outputEl.classList.remove('error');
            if (boxEl) boxEl.classList.remove('output-box--error');
        }
    }

    function setCode(moduleId, code) {
        const codeEl = document.getElementById(`code-${moduleId}`);
        if (codeEl) codeEl.textContent = code;
    }

    // ---------------------------------------------------------------------------
    // Code-snippet helpers
    // ---------------------------------------------------------------------------

    /**
     * Serialise a plain options object into a compact inline JS literal.
     * String values are single-quoted; booleans and numbers are unquoted.
     */
    function optsToString(opts) {
        const pairs = Object.entries(opts).map(function ([k, v]) {
            if (typeof v === 'string') return `${k}: '${v}'`;
            return `${k}: ${v}`;
        });
        return `{ ${pairs.join(', ')} }`;
    }

    // ---------------------------------------------------------------------------
    // TAB NAVIGATION
    // ---------------------------------------------------------------------------

    const PANEL_IDS = ['timeAgo', 'bytes', 'number', 'currency', 'list', 'plural', 'ordinal', 'truncate'];

    function activateTab(panelId) {
        if (!PANEL_IDS.includes(panelId)) panelId = 'timeAgo';

        document.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.panel === panelId);
        });

        document.querySelectorAll('.playground-panel').forEach(function (panel) {
            panel.classList.toggle('active', panel.id === `panel-${panelId}`);
        });
    }

    function initTabs() {
        document.querySelectorAll('.tab-btn').forEach(function (btn) {
            btn.addEventListener('click', function () {
                const panelId = btn.dataset.panel;
                activateTab(panelId);
                history.replaceState(null, '', `#${panelId}`);
            });
        });

        // Activate from URL hash on load
        const hash = location.hash.replace('#', '');
        activateTab(hash || 'timeAgo');
    }

    // ---------------------------------------------------------------------------
    // UPDATERS
    // ---------------------------------------------------------------------------

    function updateTimeAgo() {
        const offsetEl = document.getElementById('timeago-offset');
        const labelEl = document.getElementById('timeago-offset-label');

        const offset = parseInt(offsetEl ? offsetEl.value : '0', 10); // minutes
        const style = getRadio('timeago-style') || 'long';
        const numeric = getRadio('timeago-numeric') || 'auto';
        const locale = getLocale();

        // Human-readable label for the offset slider
        if (labelEl) {
            const absMinutes = Math.abs(offset);
            let label;
            if (absMinutes === 0) {
                label = 'now';
            } else {
                let amount;
                let unit;
                if (absMinutes < 60) {
                    amount = absMinutes;
                    unit = amount === 1 ? 'minute' : 'minutes';
                } else if (absMinutes < 1440) {
                    amount = Math.round(absMinutes / 60);
                    unit = amount === 1 ? 'hour' : 'hours';
                } else {
                    amount = Math.round(absMinutes / 1440);
                    unit = amount === 1 ? 'day' : 'days';
                }
                label = offset < 0 ? `${amount} ${unit} ago` : `in ${amount} ${unit}`;
            }
            labelEl.textContent = label;
        }

        const date = Date.now() + offset * 60 * 1000;

        const opts = {};
        if (locale) opts.locale = locale;
        // style defaults to 'long'
        if (style !== 'long') opts.style = style;
        // numeric defaults to 'auto'
        if (numeric !== 'auto') opts.numeric = numeric;

        try {
            const result = timeAgo(date, opts);
            setOutput('timeAgo', result);
        } catch (e) {
            setOutput('timeAgo', e.message, true);
        }

        // Code snippet
        let dateArg;
        if (offset === 0) {
            dateArg = 'Date.now()';
        } else if (offset < 0) {
            dateArg = `Date.now() - ${Math.abs(offset) * 60_000}`;
        } else {
            dateArg = `Date.now() + ${offset * 60_000}`;
        }
        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('timeAgo', `timeAgo(${dateArg}${optsStr})`);
    }

    function updateBytes() {
        const valueEl = document.getElementById('bytes-value');
        const binaryEl = document.getElementById('bytes-binary');
        const fractionEl = document.getElementById('bytes-fraction');

        const value = parseFloat(valueEl ? valueEl.value : '1536') || 0;
        const binary = binaryEl ? binaryEl.checked : true;
        const fraction = parseInt(fractionEl ? fractionEl.value : '1', 10);
        const locale = getLocale();

        const opts = {};
        if (locale) opts.locale = locale;
        // binary defaults to true — only include if explicitly false
        if (!binary) opts.binary = false;
        // maximumFractionDigits defaults to 1 — only include if different
        if (fraction !== 1) opts.maximumFractionDigits = fraction;

        try {
            const result = bytes(value, opts);
            setOutput('bytes', result);
        } catch (e) {
            setOutput('bytes', e.message, true);
        }

        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('bytes', `bytes(${value}${optsStr})`);
    }

    function updateNumber() {
        const valueEl = document.getElementById('number-value');

        const value = parseFloat(valueEl ? valueEl.value : '1234567') || 0;
        const display = getRadio('number-compact') || 'short';
        const locale = getLocale();

        const opts = {};
        if (locale) opts.locale = locale;
        // compactDisplay defaults to 'short' — only include if long
        if (display !== 'short') opts.compactDisplay = display;

        try {
            const result = number(value, opts);
            setOutput('number', result);
        } catch (e) {
            setOutput('number', e.message, true);
        }

        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('number', `number(${value}${optsStr})`);
    }

    function updateCurrency() {
        const valueEl = document.getElementById('currency-value');
        const codeEl = document.getElementById('currency-code');
        const compactEl = document.getElementById('currency-compact');

        const value = parseFloat(valueEl ? valueEl.value : '1234.50') || 0;
        const currencyCode = codeEl ? codeEl.value : 'USD';
        const display = getRadio('currency-display') || 'symbol';
        const compact = compactEl ? compactEl.checked : false;
        const locale = getLocale();

        const opts = {};
        if (locale) opts.locale = locale;
        // currencyDisplay defaults to 'symbol' — only include if different
        if (display !== 'symbol') opts.currencyDisplay = display;
        // compact defaults to false — only include if true
        if (compact) opts.compact = true;

        try {
            const result = currency(value, currencyCode, opts);
            setOutput('currency', result);
        } catch (e) {
            setOutput('currency', e.message, true);
        }

        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('currency', `currency(${value}, '${currencyCode}'${optsStr})`);
    }

    function updateList() {
        const itemsEl = document.getElementById('list-items');

        const raw = itemsEl ? itemsEl.value : '';
        const items = raw
            .split('\n')
            .map(function (s) {
                return s.trim();
            })
            .filter(function (s) {
                return s.length > 0;
            });

        const type = getRadio('list-type') || 'conjunction';
        const style = getRadio('list-style') || 'long';
        const locale = getLocale();

        const opts = {};
        if (locale) opts.locale = locale;
        // type defaults to 'conjunction'
        if (type !== 'conjunction') opts.type = type;
        // style defaults to 'long'
        if (style !== 'long') opts.style = style;

        try {
            const result = list(items, opts);
            setOutput('list', result === '' ? '(empty)' : result);
        } catch (e) {
            setOutput('list', e.message, true);
        }

        const arrayStr = JSON.stringify(items);
        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('list', `list(${arrayStr}${optsStr})`);
    }

    function updatePlural() {
        const countEl = document.getElementById('plural-count');
        const oneEl = document.getElementById('plural-one');
        const otherEl = document.getElementById('plural-other');

        const count = parseFloat(countEl ? countEl.value : '5') || 0;
        const oneForm = oneEl ? oneEl.value : '# item';
        const otherForm = otherEl ? otherEl.value : '# items';
        const locale = getLocale();

        const forms = {other: otherForm};
        if (oneForm) forms.one = oneForm;

        const opts = {};
        if (locale) opts.locale = locale;

        try {
            const result = plural(count, forms, Object.keys(opts).length > 0 ? opts : undefined);
            setOutput('plural', result);
        } catch (e) {
            setOutput('plural', e.message, true);
        }

        const formsStr = optsToString(forms);
        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('plural', `plural(${count}, ${formsStr}${optsStr})`);
    }

    function updateOrdinal() {
        const valueEl = document.getElementById('ordinal-value');

        const value = parseInt(valueEl ? valueEl.value : '1', 10) || 1;
        const locale = getLocale();

        const opts = {};
        if (locale) opts.locale = locale;

        try {
            const result = ordinal(value, Object.keys(opts).length > 0 ? opts : undefined);
            setOutput('ordinal', result);
        } catch (e) {
            setOutput('ordinal', e.message, true);
        }

        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('ordinal', `ordinal(${value}${optsStr})`);
    }

    function updateTruncate() {
        const textEl = document.getElementById('truncate-text');
        const lengthEl = document.getElementById('truncate-length');
        const lengthLabelEl = document.getElementById('truncate-length-label');
        const wordBoundaryEl = document.getElementById('truncate-wordboundary');
        const ellipsisEl = document.getElementById('truncate-ellipsis');

        const text = textEl ? textEl.value : '';
        const length = parseInt(lengthEl ? lengthEl.value : '20', 10);
        const position = getRadio('truncate-position') || 'end';
        const wordBoundary = wordBoundaryEl ? wordBoundaryEl.checked : false;
        const ellipsis = ellipsisEl ? ellipsisEl.value : '...';

        // Update the length label
        if (lengthLabelEl) lengthLabelEl.textContent = String(length);

        const opts = {};
        // ellipsis defaults to '...' — only include if different
        if (ellipsis !== '...') opts.ellipsis = ellipsis;
        // position defaults to 'end' — only include if different
        if (position !== 'end') opts.position = position;
        // wordBoundary defaults to false — only include if true
        if (wordBoundary) opts.wordBoundary = true;

        try {
            const result = truncate(text, length, Object.keys(opts).length > 0 ? opts : undefined);
            setOutput('truncate', result);
        } catch (e) {
            setOutput('truncate', e.message, true);
        }

        // Escape backslashes and single quotes in user text for the code snippet
        const escapedText = text.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
        const optsStr = Object.keys(opts).length > 0 ? `, ${optsToString(opts)}` : '';
        setCode('truncate', `truncate('${escapedText}', ${length}${optsStr})`);
    }

    // Convenience list so we can re-run all updaters at once (e.g. locale change)
    const allUpdaters = [
        updateTimeAgo,
        updateBytes,
        updateNumber,
        updateCurrency,
        updateList,
        updatePlural,
        updateOrdinal,
        updateTruncate,
    ];

    function runAllUpdaters() {
        allUpdaters.forEach(function (fn) {
            fn();
        });
    }

    // ---------------------------------------------------------------------------
    // EVENT BINDING
    // ---------------------------------------------------------------------------

    function bindEvents() {
        // Global locale
        const localeEl = document.getElementById('global-locale');
        if (localeEl) localeEl.addEventListener('change', runAllUpdaters);

        // --- timeAgo ---
        bindInput('timeago-offset', updateTimeAgo);
        bindRadioGroup('timeago-style', updateTimeAgo);
        bindRadioGroup('timeago-numeric', updateTimeAgo);

        // --- bytes ---
        bindInput('bytes-value', updateBytes);
        bindInput('bytes-binary', updateBytes);
        bindInput('bytes-fraction', updateBytes);

        // --- number ---
        bindInput('number-value', updateNumber);
        bindRadioGroup('number-compact', updateNumber);

        // --- currency ---
        bindInput('currency-value', updateCurrency);
        bindInput('currency-code', updateCurrency);
        bindInput('currency-compact', updateCurrency);
        bindRadioGroup('currency-display', updateCurrency);

        // --- list ---
        bindInput('list-items', updateList);
        bindRadioGroup('list-type', updateList);
        bindRadioGroup('list-style', updateList);

        // --- plural ---
        bindInput('plural-count', updatePlural);
        bindInput('plural-one', updatePlural);
        bindInput('plural-other', updatePlural);

        // --- ordinal ---
        bindInput('ordinal-value', updateOrdinal);

        // --- truncate ---
        bindInput('truncate-text', updateTruncate);
        bindInput('truncate-length', updateTruncate);
        bindInput('truncate-wordboundary', updateTruncate);
        bindInput('truncate-ellipsis', updateTruncate);
        bindRadioGroup('truncate-position', updateTruncate);
    }

    /**
     * Attach an 'input' event listener to the element with the given id.
     * Silently ignores missing elements so the demo survives partial HTML.
     */
    function bindInput(id, handler) {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', handler);
    }

    /**
     * Attach 'change' listeners to every radio in a named group.
     */
    function bindRadioGroup(name, handler) {
        document.querySelectorAll(`input[name="${name}"]`).forEach(function (el) {
            el.addEventListener('change', handler);
        });
    }

    // ---------------------------------------------------------------------------
    // COPY TO CLIPBOARD
    // ---------------------------------------------------------------------------

    function initCopyButtons() {
        // Install copy button
        const copyInstallBtn = document.getElementById('copy-install');
        if (copyInstallBtn) {
            copyInstallBtn.addEventListener('click', function () {
                copyText('npm install pure-humanize', copyInstallBtn);
            });
        }

        // Per-module code copy buttons
        document.querySelectorAll('.copy-code').forEach(function (btn) {
            btn.addEventListener('click', function () {
                // Resolve the target code element via data-target attribute or the
                // nearest <code> element within the enclosing block.
                const targetId = btn.dataset.target;
                let codeEl;
                if (targetId) {
                    codeEl = document.getElementById(targetId);
                } else {
                    const block = btn.closest('.code-block, .output-section, section');
                    codeEl = block ? block.querySelector('code') : null;
                }
                if (codeEl) copyText(codeEl.textContent, btn);
            });
        });
    }

    /**
     * Copy plain text to the clipboard and briefly animate the trigger button.
     */
    function copyText(text, btnEl) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                triggerCopiedFeedback(btnEl);
            }).catch(function () {
                fallbackCopy(text, btnEl);
            });
        } else {
            fallbackCopy(text, btnEl);
        }
    }

    /**
     * textarea-based clipboard fallback for environments without the Clipboard API.
     */
    function fallbackCopy(text, btnEl) {
        try {
            const ta = document.createElement('textarea');
            ta.value = text;
            ta.setAttribute('readonly', '');
            ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0';
            document.body.appendChild(ta);
            ta.focus();
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            triggerCopiedFeedback(btnEl);
        } catch (_) {
            // Clipboard unavailable — fail silently
        }
    }

    /**
     * Add `.copied` class to the button, swap its content to a checkmark SVG
     * built entirely with DOM methods (no innerHTML), then revert after 2 s.
     */
    function triggerCopiedFeedback(btnEl) {
        if (!btnEl || btnEl.dataset.copying) return;

        btnEl.dataset.copying = '1';
        btnEl.classList.add('copied');

        // Snapshot all current child nodes so we can restore them later
        const savedNodes = Array.from(btnEl.childNodes).map(function (n) {
            return n.cloneNode(true);
        });

        // Build the checkmark SVG using DOM methods only
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('xmlns', svgNS);
        svg.setAttribute('width', '16');
        svg.setAttribute('height', '16');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '2.5');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');

        const polyline = document.createElementNS(svgNS, 'polyline');
        polyline.setAttribute('points', '20 6 9 17 4 12');
        svg.appendChild(polyline);

        // Replace button contents with the checkmark
        while (btnEl.firstChild) btnEl.removeChild(btnEl.firstChild);
        btnEl.appendChild(svg);

        setTimeout(function () {
            // Restore original children
            while (btnEl.firstChild) btnEl.removeChild(btnEl.firstChild);
            savedNodes.forEach(function (node) {
                btnEl.appendChild(node);
            });
            btnEl.classList.remove('copied');
            delete btnEl.dataset.copying;
        }, 2000);
    }

    // ---------------------------------------------------------------------------
    // timeAgo LIVE REFRESH
    // ---------------------------------------------------------------------------
    // Re-run the timeAgo updater every 10 seconds so the relative timestamp stays
    // accurate as real time advances without any user interaction.
    setInterval(updateTimeAgo, 10_000);

    // ---------------------------------------------------------------------------
    // INIT
    // ---------------------------------------------------------------------------

    document.addEventListener('DOMContentLoaded', function () {
        initTabs();
        bindEvents();
        initCopyButtons();
        runAllUpdaters();
    });

})();
