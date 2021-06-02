const mainApp = new Vue({
    el: '#main',
    store,
    methods: {
        showModal(id) {
            const ref = this.$refs[id];
            ref.show();
        },
        hideModal(id) {
            const ref = this.$refs[id];
            ref.hide();
        }
    }
});