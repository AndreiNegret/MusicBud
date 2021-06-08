Vue.component('modal', {
    template: `
       <div v-show="isVisible" :transition="transition">
            <div class="modal" @click.self="clickMask">
                <div class="modal-dialog" :class="modalClass" v-el:dialog>
                    <div class="modal-content">
                        <!--Header-->
                        <div class="modal-header">
                            <slot name="header" v-if="title">
                                <a type="button" class="close" @click="hide">x</a>
                                <h4 class="modal-title">
                                    <slot name="title">
                                        {{ title }}
                                    </slot>
                                </h4>
                            </slot>
                        </div>
                        <!--Container-->
                        <div class="modal-body">
                            <slot name="body" :bodyText="bodyText" :setBodyText="setBodyText" :emitAction="emitAction" :hide="hide"><slot>
                        </div>
                        <!--Footer-->
                        <div class="modal-footer">
                            <slot name="footer">
                                <button type="button" :class="cancelClass" v-if="!hideCancelBtn" @click="hide">{{ cancelText }}</button>
                                <button type="button" :class="okClass" @click="ok">{{ okText }}</button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop in"></div>
        </div>
     `,
    props: {
        title: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            validator: (value) => ['sm', 'md', 'lg', 'full'].includes(value),
            default: 'md'
        },
        force: {
            type: Boolean,
            default: false
        },
        transition: {
            type: String,
            default: 'modal'
        },
        okText: {
            type: String,
            default: 'OK'
        },
        cancelText: {
            type: String,
            default: 'Cancel'
        },
        okClass: {
            type: String,
            default: 'btn blue'
        },
        cancelClass: {
            type: String,
            default: 'btn red btn-outline'
        },
        closeWhenOK: {
            type: Boolean,
            default: true
        },
        hideCancelBtn: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isVisible: false,
            duration: null,
            bodyText: null
        }
    },
    computed: {
        modalClass() {
            return `modal-${this.size}`;
        }
    },
    created() {
        if (this.show) {
            document.body.className += ' modal-open';
        }
    },
    beforeDestroy() {
        document.body.className = document.body.className.replace(/\s?modal-open/, '');
    },
    watch: {
        show(value) {
            if (value) {
                document.body.className += ' modal-open';
            }
            else {
                if (!this.duration) {
                    this.duration = window.getComputedStyle(this.$el)['transition-duration'].replace('s', '') * 1000;
                }
                window.setTimeout(() => {
                    document.body.className = document.body.className.replace(/\s?modal-open/, '');
                }, this.duration || 0);
            }
        }
    },
    methods: {
        ok() {
            Bus.$emit('modal:ok');
            if (this.closeWhenOK) {
                this.isVisible = false;
            }
        },
        show() {
            this.isVisible = true;
        },
        hide() {
            Bus.$emit('modal:hide');
            this.isVisible = false;
        },
        clickMask() {
            if (!this.force) {
                this.hide();
            }
        },
        setBodyText(text) {
            this.bodyText = text;
        },
        emitAction(action, data) {
            Bus.$emit(action, data);
        }
    }
});