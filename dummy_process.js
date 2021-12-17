var cachedSetTimeout;
var cachedClearTimeout;
let uaParser = require("useragent.js")

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
};

function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
};

(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
};

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
};

function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
};

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
};

function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}

Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};

module.exports = {
  versions: {
    node: '16.13.0',
    v8: '9.4.146.19-node.13',
    uv: '1.42.0',
    zlib: '1.2.11',
    brotli: '1.0.9',
    ares: '1.17.2',
    modules: '93',
    nghttp2: '1.45.1',
    napi: '8',
    llhttp: '6.0.4',
    openssl: '1.1.1l+quic',
    cldr: '39.0',
    icu: '69.1',
    tz: '2021a',
    unicode: '13.0',
    ngtcp2: '0.1.0-DEV',
    nghttp3: '0.1.0-DEV',
    browser: {
        name: uaParser(navigator?.userAgent)? uaParser(navigator?.userAgent)?.browser?.name : "Unknown",
        version: uaParser(navigator?.userAgent)? uaParser(navigator?.userAgent)?.browser?.version : "0",
    },
    os: {
        name: uaParser(navigator?.userAgent)? uaParser(navigator?.userAgent)?.os?.name : "Unknown",
        version: uaParser(navigator?.userAgent)? uaParser(navigator?.userAgent)?.os?.version : "0",
    }
  },
  release: {
    name: 'node',
    lts: 'Gallium',
    sourceUrl: 'https://nodejs.org/download/release/v16.13.0/node-v16.13.0.tar.gz',
    headersUrl: 'https://nodejs.org/download/release/v16.13.0/node-v16.13.0-headers.tar.gz'
  },
  domain: document? document.domain? document.domain : null : null,
  features: {
    inspector: true,
    debug: false,
    uv: true,
    ipv6: true,
    tls_alpn: true,
    tls_sni: true,
    tls_ocsp: true,
    tls: true
  },
  env: {
    kill_retry_time: '100',
    windowsHide: 'true',
    username: 'root',
    treekill: 'true',
    automation: 'true',
    pmx: 'true',
    instance_var: 'NODE_APP_INSTANCE',
    watch: 'false',
    autorestart: 'true',
    vizion: 'true',
    merge_logs: 'true',
    namespace: 'default',
    filter_env: '',
    name: '.',
    node_args: '',
    pm_exec_path: '/home/ubuntu',
    pm_cwd: '/home/ubuntu',
    exec_interpreter: 'node',
    exec_mode: 'fork_mode',
    instances: '1',
    km_link: 'true',
    vizion_running: 'false',
    NODE_APP_INSTANCE: '0',
    PM2_USAGE: 'CLI',
    SUDO_GID: '0',
    SUDO_UID: '0',
    SUDO_USER: 'root',
    SUDO_COMMAND: '/usr/bin/pm2 start .',
    SHELL: '/bin/bash',
    USERNAME: 'root',
    USER: 'root',
    LOGNAME: 'root',
    MAIL: '/var/mail/root',
    PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin',
    TERM: 'xterm-256color',
    HOME: '/home/ubuntu',
    LANG: 'en_US.UTF-8',
    LS_COLORS: 'rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.Z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:',
    PM2_HOME: '/home/ubuntu/.pm2',
    unique_id: '9f79b8f2-a95e-488e-a8b7-edcf632aff68',
    status: 'launching',
    pm_uptime: '1639092691375',
    axm_actions: '',
    created_at: '1638974597962',
    pm_id: '0',
    restart_time: '81',
    unstable_restarts: '0',
    version: '2.0.0',
    versioning: 'null',
    node_version: '16.13.0',
    exit_code: '1',
    prev_restart_delay: '0'
  },
  argv: [
    '/usr/bin/node',
    '/home/ubuntu/index.js'
  ],
  execArgv: [],
  channel: {},
  on: () => {},
  addListener: () => {},
  once: () => {},
  off: () => {},
  removeListener: () => {},
  removeAllListeners: () => {},
  emit: () => {},
  prependListener: () => {},
  prependOnceListener: () => {},
  listeners: function (name) { return [] },
  binding: function (name) {
    throw new Error('process.binding is not supported');
  },
  cwd: function () { return '/' },
  chdir: function (dir) {
      throw new Error('process.chdir is not supported');
  },
  umask: function() { return 0; },
  nextTick: function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
  }
}
