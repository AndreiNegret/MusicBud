var map = new Vivus('denmark', {
    type: 'async',
    duration: 250,
    start: 'autostart',
    forceRender: false
}, function doDone(obj) {
    obj.el.classList.add('finished');
});